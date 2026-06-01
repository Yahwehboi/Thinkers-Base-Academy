// src/lib/db.ts
// Database connection and schema setup for Neon PostgreSQL

import { neon, neonConfig } from "@neondatabase/serverless";

// ─── Configure for better local dev performance ───────────────────────────────
// fetchConnectionCache reduces cold start latency
neonConfig.fetchConnectionCache = true;

// ─── Connection ───────────────────────────────────────────────────────────────
const sql = neon(process.env.DATABASE_URL!);

export default sql;

// ─── Initialization guard — only runs once per server instance ────────────────
let initialized = false;

export async function initializeDatabase() {
  if (initialized) return;

  try {
    // ── Users table ──
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'parent')),
        name TEXT NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        created_by TEXT,
        login_attempts INTEGER DEFAULT 0,
        locked_until TIMESTAMPTZ
      )
    `;

    // ── Parent class assignments ──
    await sql`
      CREATE TABLE IF NOT EXISTS parent_classes (
        parent_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        class_name TEXT NOT NULL,
        PRIMARY KEY (parent_id, class_name)
      )
    `;

    // ── Resources table ──
    await sql`
      CREATE TABLE IF NOT EXISTS resources (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        class_name TEXT NOT NULL,
        subject TEXT NOT NULL,
        term TEXT NOT NULL,
        session TEXT NOT NULL,
        file_type TEXT DEFAULT 'other',
        file_url TEXT DEFAULT '',
        file_public_id TEXT DEFAULT '',
        original_name TEXT DEFAULT '',
        file_size INTEGER DEFAULT 0,
        uploaded_by TEXT NOT NULL,
        uploaded_by_id TEXT,
        uploaded_by_role TEXT NOT NULL,
        approved BOOLEAN DEFAULT FALSE,
        uploaded_at TIMESTAMPTZ DEFAULT NOW(),
        approved_at TIMESTAMPTZ,
        approved_by TEXT
      )
    `;

    // ── Curriculum settings table ──
    await sql`
      CREATE TABLE IF NOT EXISTS curriculum_settings (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        value TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // ── Seed default settings if empty ──
    const settingsCount = await sql`SELECT COUNT(*) as count FROM curriculum_settings`;
    if (Number((settingsCount[0] as { count: string }).count) === 0) {
      const defaults = [
        // Classes
        { category: "class", value: "Play Group" },
        { category: "class", value: "Preschool 1" },
        { category: "class", value: "Preschool 2" },
        { category: "class", value: "Reception" },
        { category: "class", value: "Grade 1" },
        { category: "class", value: "Grade 2" },
        { category: "class", value: "Grade 3" },
        { category: "class", value: "Grade 4" },
        { category: "class", value: "Grade 5" },
        { category: "class", value: "Grade 5/6" },
        // Subjects
        { category: "subject", value: "English Language" },
        { category: "subject", value: "Mathematics" },
        { category: "subject", value: "Basic Science & Technology" },
        { category: "subject", value: "Social Studies" },
        { category: "subject", value: "History" },
        { category: "subject", value: "Igbo Language" },
        { category: "subject", value: "Computer Studies" },
        { category: "subject", value: "Creative Arts" },
        { category: "subject", value: "Music" },
        { category: "subject", value: "Public Speaking" },
        { category: "subject", value: "Religious & Moral Education" },
        { category: "subject", value: "Literature & Reading" },
        { category: "subject", value: "Language & Literacy" },
        { category: "subject", value: "Expressive Arts" },
        { category: "subject", value: "Personal & Social Development" },
        { category: "subject", value: "Understanding the World" },
        { category: "subject", value: "Physical Development" },
        { category: "subject", value: "General" },
        // Terms
        { category: "term", value: "First Term" },
        { category: "term", value: "Second Term" },
        { category: "term", value: "Third Term" },
        // Sessions
        { category: "session", value: "2024/2025" },
        { category: "session", value: "2025/2026" },
        { category: "session", value: "2026/2027" },
      ];

      for (let i = 0; i < defaults.length; i++) {
        const { category, value } = defaults[i];
        const id = `set_${Date.now()}_${i}`;
        await sql`
          INSERT INTO curriculum_settings (id, category, value, sort_order)
          VALUES (${id}, ${category}, ${value}, ${i})
        `;
      }
      console.log("✅ Default curriculum settings seeded");
    }

    // ── Seed default admin if not exists ──
    const existing = await sql`SELECT id FROM users WHERE username = 'admin'`;

    if (existing.length === 0) {
      const bcrypt      = await import("bcryptjs");
      const hashedPassword = await bcrypt.hash("TBA@Admin2025", 10);

      await sql`
        INSERT INTO users (id, username, password, role, name, active, created_at)
        VALUES (
          'usr_admin_001',
          'admin',
          ${hashedPassword},
          'admin',
          'Mrs. Joysam Ngene',
          TRUE,
          NOW()
        )
      `;
      console.log("✅ Default admin account created");
    }

    initialized = true;
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
    // Don't throw — let API handle gracefully
    // initialized stays false so it retries next request
  }
}

// ─── Helper — generate unique ID ─────────────────────────────────────────────
export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Helper — get file type from filename ────────────────────────────────────
export function getFileType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf")                                       return "pdf";
  if (["doc", "docx"].includes(ext))                      return "docx";
  if (["ppt", "pptx"].includes(ext))                      return "pptx";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  return "other";
}