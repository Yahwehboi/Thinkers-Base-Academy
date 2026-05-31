import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql, { initializeDatabase, generateId } from "@/lib/db";
import { signToken, verifyToken } from "@/lib/auth";

const SALT_ROUNDS     = 10;
const MAX_ATTEMPTS    = 5;
const LOCKOUT_MINUTES = 15;

type User = {
  id: string;
  username: string;
  password: string;
  role: "admin" | "teacher" | "parent";
  name: string;
  active: boolean;
  created_at: string;
  created_by?: string;
  login_attempts: number;
  locked_until?: string;
  classes?: string[];
};

type ClassRow = { class_name: string };

function sanitizeUser(user: User) {
  const { password, login_attempts, locked_until, ...safe } = user;
  return safe;
}

function isLocked(user: User): boolean {
  if (!user.locked_until) return false;
  return new Date(user.locked_until) > new Date();
}

function generateToken(user: User): string {
  return signToken({ id: user.id, role: user.role, name: user.name });
}

function verifyAdminRequest(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const decoded = verifyToken(auth.slice(7));
  return decoded?.role === "admin";
}

async function getParentClasses(parentId: string): Promise<string[]> {
  const rows = await sql`SELECT class_name FROM parent_classes WHERE parent_id = ${parentId}`;
  return (rows as ClassRow[]).map((r) => r.class_name);
}

// ─── GET ──────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    // ── Staff login ──
    if (action === "login") {
      const username = searchParams.get("username");
      const password = searchParams.get("password");

      if (!username || !password) {
        return NextResponse.json({ success: false, error: "Username and password required" }, { status: 400 });
      }

      const rows = await sql`SELECT * FROM users WHERE LOWER(username) = LOWER(${username})`;

      if (rows.length === 0) {
        return NextResponse.json({ success: false, error: "Invalid username or password" }, { status: 401 });
      }

      const user = rows[0] as User;

      if (!user.active) {
        return NextResponse.json({ success: false, error: "Account deactivated. Contact admin." }, { status: 403 });
      }

      if (isLocked(user)) {
        const t = new Date(user.locked_until!).toLocaleTimeString();
        return NextResponse.json({ success: false, error: `Account locked. Try again after ${t}.` }, { status: 429 });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        const attempts = (user.login_attempts || 0) + 1;
        if (attempts >= MAX_ATTEMPTS) {
          const lockUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60000);
          await sql`UPDATE users SET login_attempts = 0, locked_until = ${lockUntil.toISOString()} WHERE id = ${user.id}`;
          return NextResponse.json({ success: false, error: `Too many attempts. Locked for ${LOCKOUT_MINUTES} minutes.` }, { status: 429 });
        }
        await sql`UPDATE users SET login_attempts = ${attempts} WHERE id = ${user.id}`;
        const left = MAX_ATTEMPTS - attempts;
        return NextResponse.json({ success: false, error: `Invalid credentials. ${left} attempt(s) left.` }, { status: 401 });
      }

      // Reset on success
      await sql`UPDATE users SET login_attempts = 0, locked_until = NULL WHERE id = ${user.id}`;

      const classes = user.role === "parent" ? await getParentClasses(user.id) : [];

      return NextResponse.json({
        success: true,
        user: { ...sanitizeUser(user), classes },
        token: generateToken(user),
      });
    }

    // ── Parent access code login ──
    if (action === "parentLogin") {
      const code = searchParams.get("code");
      if (!code) {
        return NextResponse.json({ success: false, error: "Access code required" }, { status: 400 });
      }

      const rows = await sql`
        SELECT * FROM users WHERE role = 'parent' AND username = ${code} AND active = TRUE
      `;

      if (rows.length === 0) {
        return NextResponse.json({ success: false, error: "Invalid access code" }, { status: 401 });
      }

      const user = rows[0] as User;
      const classes = await getParentClasses(user.id);

      return NextResponse.json({
        success: true,
        user: { ...sanitizeUser(user), classes },
        token: generateToken(user),
      });
    }

    // ── List users — admin only ──
    if (action === "list") {
      if (!verifyAdminRequest(req)) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }

      const roleFilter = searchParams.get("roleFilter");
      const rows = roleFilter
        ? await sql`SELECT * FROM users WHERE role = ${roleFilter} ORDER BY created_at DESC`
        : await sql`SELECT * FROM users ORDER BY created_at DESC`;

      const users = await Promise.all(
        (rows as User[]).map(async (user) => {
          const classes = user.role === "parent" ? await getParentClasses(user.id) : [];
          return { ...sanitizeUser(user), classes };
        })
      );

      return NextResponse.json({ success: true, users });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("GET /api/users:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// ─── POST — create user ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();

    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { username, password, role, name, createdBy, classes } = await req.json();

    if (!username || !password || !role || !name) {
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
    }
    if (!["admin", "teacher", "parent"].includes(role)) {
      return NextResponse.json({ success: false, error: "Invalid role" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existing = await sql`SELECT id FROM users WHERE LOWER(username) = LOWER(${username})`;
    if (existing.length > 0) {
      return NextResponse.json({ success: false, error: "Username already exists" }, { status: 409 });
    }

    const hashedPassword = role === "parent"
      ? password
      : await bcrypt.hash(password, SALT_ROUNDS);

    const id = generateId("usr");

    await sql`
      INSERT INTO users (id, username, password, role, name, active, created_at, created_by, login_attempts)
      VALUES (${id}, ${username}, ${hashedPassword}, ${role}, ${name}, TRUE, NOW(), ${createdBy || "admin"}, 0)
    `;

    if (role === "parent" && classes && classes.length > 0) {
      for (const className of classes) {
        await sql`
          INSERT INTO parent_classes (parent_id, class_name)
          VALUES (${id}, ${className})
          ON CONFLICT DO NOTHING
        `;
      }
    }

    const newUser = await sql`SELECT * FROM users WHERE id = ${id}`;
    const assignedClasses = role === "parent" ? await getParentClasses(id) : [];

    return NextResponse.json({
      success: true,
      user: { ...sanitizeUser(newUser[0] as User), classes: assignedClasses },
    });
  } catch (err) {
    console.error("POST /api/users:", err);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}

// ─── PUT — update user ────────────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  try {
    await initializeDatabase();

    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, password, name, active, username, classes } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
    }

    const rows = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const user = rows[0] as User;

    if (user.username === "admin" && active === false) {
      return NextResponse.json({ success: false, error: "Cannot deactivate main admin" }, { status: 403 });
    }

    if (name !== undefined)     await sql`UPDATE users SET name = ${name} WHERE id = ${id}`;
    if (active !== undefined)   await sql`UPDATE users SET active = ${active} WHERE id = ${id}`;
    if (username !== undefined) await sql`UPDATE users SET username = ${username} WHERE id = ${id}`;

    if (password && password.length >= 6) {
      const hashed = user.role === "parent"
        ? password
        : await bcrypt.hash(password, SALT_ROUNDS);
      await sql`UPDATE users SET password = ${hashed} WHERE id = ${id}`;
    }

    await sql`UPDATE users SET login_attempts = 0, locked_until = NULL WHERE id = ${id}`;

    if (user.role === "parent" && classes !== undefined) {
      await sql`DELETE FROM parent_classes WHERE parent_id = ${id}`;
      for (const className of classes) {
        await sql`
          INSERT INTO parent_classes (parent_id, class_name)
          VALUES (${id}, ${className})
          ON CONFLICT DO NOTHING
        `;
      }
    }

    const updated = await sql`SELECT * FROM users WHERE id = ${id}`;
    const updatedClasses = user.role === "parent" ? await getParentClasses(id) : [];

    return NextResponse.json({
      success: true,
      user: { ...sanitizeUser(updated[0] as User), classes: updatedClasses },
    });
  } catch (err) {
    console.error("PUT /api/users:", err);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

// ─── DELETE — remove user ─────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    await initializeDatabase();

    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
    }

    const rows = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const user = rows[0] as User;
    if (user.username === "admin") {
      return NextResponse.json({ success: false, error: "Cannot delete main admin" }, { status: 403 });
    }

    // parent_classes deleted automatically via CASCADE
    await sql`DELETE FROM users WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/users:", err);
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}