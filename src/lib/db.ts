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