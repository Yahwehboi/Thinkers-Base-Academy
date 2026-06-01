import { NextRequest, NextResponse } from "next/server";
import sql, { initializeDatabase, generateId } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

type SettingRow = { id: string; category: string; value: string; sort_order: number };

function getTokenData(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.slice(7));
}

// GET — return all settings grouped by category
// ?withIds=true returns full rows with IDs (admin only, for settings panel)
export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();
    const { searchParams } = new URL(req.url);
    const withIds = searchParams.get("withIds") === "true";

    const rows = await sql`
      SELECT * FROM curriculum_settings ORDER BY category, sort_order, value
    ` as SettingRow[];

    const grouped: Record<string, string[]> = {};
    for (const row of rows) {
      if (!grouped[row.category]) grouped[row.category] = [];
      grouped[row.category].push(row.value);
    }

    if (withIds) {
      // Return full rows grouped by category for admin settings panel
      const withIdsGrouped: Record<string, { id: string; value: string }[]> = {};
      for (const row of rows) {
        if (!withIdsGrouped[row.category]) withIdsGrouped[row.category] = [];
        withIdsGrouped[row.category].push({ id: row.id, value: row.value });
      }
      return NextResponse.json({ success: true, settings: grouped, rows: withIdsGrouped });
    }

    return NextResponse.json({ success: true, settings: grouped });
  } catch (err) {
    console.error("GET /api/curriculum-settings:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

// POST — add a new value to a category (admin only)
export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const tokenData = getTokenData(req);
    if (tokenData?.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { category, value } = await req.json();
    if (!category || !value?.trim()) {
      return NextResponse.json({ success: false, error: "Category and value required" }, { status: 400 });
    }

    // Check duplicate
    const existing = await sql`
      SELECT id FROM curriculum_settings WHERE category = ${category} AND LOWER(value) = LOWER(${value.trim()})
    `;
    if (existing.length > 0) {
      return NextResponse.json({ success: false, error: "Already exists" }, { status: 409 });
    }

    const id = generateId("set");
    const maxOrder = await sql`
      SELECT COALESCE(MAX(sort_order), 0) as max FROM curriculum_settings WHERE category = ${category}
    `;
    const sortOrder = Number((maxOrder[0] as { max: string }).max) + 1;

    await sql`
      INSERT INTO curriculum_settings (id, category, value, sort_order)
      VALUES (${id}, ${category}, ${value.trim()}, ${sortOrder})
    `;

    return NextResponse.json({ success: true, id, category, value: value.trim() });
  } catch (err) {
    console.error("POST /api/curriculum-settings:", err);
    return NextResponse.json({ success: false, error: "Failed to add setting" }, { status: 500 });
  }
}

// DELETE — remove a value (admin only)
export async function DELETE(req: NextRequest) {
  try {
    await initializeDatabase();
    const tokenData = getTokenData(req);
    if (tokenData?.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    await sql`DELETE FROM curriculum_settings WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/curriculum-settings:", err);
    return NextResponse.json({ success: false, error: "Failed to delete setting" }, { status: 500 });
  }
}