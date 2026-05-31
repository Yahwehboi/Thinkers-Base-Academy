import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import sql, { initializeDatabase, generateId, getFileType } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

// ─── Cloudinary config ────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ─── Types ────────────────────────────────────────────────────────────────────
type Resource = {
  id: string;
  title: string;
  description: string;
  class_name: string;
  subject: string;
  term: string;
  session: string;
  file_type: string;
  file_url: string;
  file_public_id: string;
  original_name: string;
  file_size: number;
  uploaded_by: string;
  uploaded_by_id: string;
  uploaded_by_role: string;
  approved: boolean;
  uploaded_at: string;
  approved_at?: string;
  approved_by?: string;
};

// ─── Auth helpers ─────────────────────────────────────────────────────────────
function getTokenData(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.slice(7));
}

function isAdmin(req: NextRequest): boolean {
  const data = getTokenData(req);
  return data?.role === "admin";
}

// ─── Upload file to Cloudinary ────────────────────────────────────────────────
async function uploadToCloudinary(
  file: File,
  folder: string = "tba-curriculum"
): Promise<{ url: string; publicId: string; size: number }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: "auto",
    public_id: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
  });

  return {
    url:      result.secure_url,
    publicId: result.public_id,
    size:     result.bytes,
  };
}

// ─── GET — list/search resources ──────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();

    const { searchParams } = new URL(req.url);
    const tokenData     = getTokenData(req);
    const classFilter   = searchParams.get("class");
    const subjectFilter = searchParams.get("subject");
    const termFilter    = searchParams.get("term");
    const sessionFilter = searchParams.get("session");
    const search        = searchParams.get("search");
    const approvedOnly  = searchParams.get("approvedOnly") !== "false";

    // Build dynamic query conditions
    let resources: Resource[];

    // Parent — only sees approved resources for their assigned classes
    if (tokenData?.role === "parent") {
      const classRows = await sql`
        SELECT class_name FROM parent_classes WHERE parent_id = ${tokenData.id}
      `;
      const parentClasses = (classRows as { class_name: string }[]).map((r) => r.class_name);

      if (parentClasses.length === 0) {
        return NextResponse.json({ success: true, resources: [] });
      }

      resources = await sql`
        SELECT * FROM resources
        WHERE approved = TRUE
        AND class_name = ANY(${parentClasses})
        ORDER BY uploaded_at DESC
      ` as Resource[];
    }

    // Teacher — sees their own uploads + all approved resources
    else if (tokenData?.role === "teacher") {
      resources = await sql`
        SELECT * FROM resources
        WHERE (approved = TRUE OR uploaded_by_id = ${tokenData.id})
        ORDER BY uploaded_at DESC
      ` as Resource[];
    }

    // Admin — sees everything
    else if (tokenData?.role === "admin") {
      if (approvedOnly) {
        resources = await sql`SELECT * FROM resources WHERE approved = TRUE ORDER BY uploaded_at DESC` as Resource[];
      } else {
        resources = await sql`SELECT * FROM resources ORDER BY uploaded_at DESC` as Resource[];
      }
    }

    // No token — public view, approved only
    else {
      resources = await sql`SELECT * FROM resources WHERE approved = TRUE ORDER BY uploaded_at DESC` as Resource[];
    }

    // Apply filters in JS (simpler than dynamic SQL)
    if (classFilter)   resources = resources.filter((r) => r.class_name === classFilter);
    if (subjectFilter) resources = resources.filter((r) => r.subject === subjectFilter);
    if (termFilter)    resources = resources.filter((r) => r.term === termFilter);
    if (sessionFilter) resources = resources.filter((r) => r.session === sessionFilter);
    if (search) {
      const q = search.toLowerCase();
      resources = resources.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subject.toLowerCase().includes(q) ||
          r.class_name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      );
    }

    // Map to camelCase for frontend compatibility
    const mapped = resources.map((r) => ({
      id:             r.id,
      title:          r.title,
      description:    r.description,
      class:          r.class_name,
      subject:        r.subject,
      term:           r.term,
      session:        r.session,
      fileType:       r.file_type,
      fileName:       r.file_url,
      filePublicId:   r.file_public_id,
      originalName:   r.original_name,
      fileSize:       r.file_size,
      uploadedBy:     r.uploaded_by,
      uploadedById:   r.uploaded_by_id,
      uploadedByRole: r.uploaded_by_role,
      approved:       r.approved,
      uploadedAt:     r.uploaded_at,
      approvedAt:     r.approved_at,
      approvedBy:     r.approved_by,
    }));

    return NextResponse.json({ success: true, resources: mapped });
  } catch (err) {
    console.error("GET /api/curriculum:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch resources" }, { status: 500 });
  }
}

// ─── POST — upload new resource ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();

    const tokenData = getTokenData(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData    = await req.formData();
    const title       = formData.get("title") as string;
    const description = formData.get("description") as string || "";
    const className   = formData.get("class") as string;
    const subject     = formData.get("subject") as string;
    const term        = formData.get("term") as string;
    const session     = formData.get("session") as string;
    const uploadedBy  = formData.get("uploadedBy") as string;
    const file        = formData.get("file") as File | null;

    if (!title || !className || !subject || !term || !session || !uploadedBy) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let fileUrl      = "";
    let filePublicId = "";
    let originalName = "";
    let fileSize     = 0;
    let fileType     = "other";

    // Upload file to Cloudinary if provided
    if (file && file.size > 0) {
      const uploaded = await uploadToCloudinary(file);
      fileUrl      = uploaded.url;
      filePublicId = uploaded.publicId;
      fileSize     = uploaded.size;
      originalName = file.name;
      fileType     = getFileType(file.name);
    }

    const id       = generateId("res");
    const approved = tokenData.role === "admin"; // auto-approve admin uploads

    await sql`
      INSERT INTO resources (
        id, title, description, class_name, subject, term, session,
        file_type, file_url, file_public_id, original_name, file_size,
        uploaded_by, uploaded_by_id, uploaded_by_role,
        approved, uploaded_at
      ) VALUES (
        ${id}, ${title}, ${description}, ${className}, ${subject}, ${term}, ${session},
        ${fileType}, ${fileUrl}, ${filePublicId}, ${originalName}, ${fileSize},
        ${uploadedBy}, ${tokenData.id}, ${tokenData.role},
        ${approved}, NOW()
      )
    `;

    const newResource = await sql`SELECT * FROM resources WHERE id = ${id}`;

    return NextResponse.json({ success: true, resource: newResource[0] });
  } catch (err) {
    console.error("POST /api/curriculum:", err);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}

// ─── PUT — approve or edit resource ──────────────────────────────────────────
export async function PUT(req: NextRequest) {
  try {
    await initializeDatabase();

    const tokenData = getTokenData(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body   = await req.json();
    const { id, action, approvedBy, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Resource ID required" }, { status: 400 });
    }

    const rows = await sql`SELECT * FROM resources WHERE id = ${id}`;
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Resource not found" }, { status: 404 });
    }

    if (action === "approve") {
      if (tokenData.role !== "admin") {
        return NextResponse.json({ success: false, error: "Only admins can approve resources" }, { status: 403 });
      }
      await sql`
        UPDATE resources
        SET approved = TRUE, approved_at = NOW(), approved_by = ${approvedBy || "Admin"}
        WHERE id = ${id}
      `;
    } else if (action === "unapprove") {
      if (tokenData.role !== "admin") {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
      }
      await sql`UPDATE resources SET approved = FALSE WHERE id = ${id}`;
    } else {
      // General edit — only admin or uploader
      const resource = rows[0] as Resource;
      if (tokenData.role !== "admin" && resource.uploaded_by_id !== tokenData.id) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
      }
      if (updates.title)       await sql`UPDATE resources SET title = ${updates.title} WHERE id = ${id}`;
      if (updates.description) await sql`UPDATE resources SET description = ${updates.description} WHERE id = ${id}`;
    }

    const updated = await sql`SELECT * FROM resources WHERE id = ${id}`;
    return NextResponse.json({ success: true, resource: updated[0] });
  } catch (err) {
    console.error("PUT /api/curriculum:", err);
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}

// ─── DELETE — remove resource + Cloudinary file ───────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    await initializeDatabase();

    const tokenData = getTokenData(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Resource ID required" }, { status: 400 });
    }

    const rows = await sql`SELECT * FROM resources WHERE id = ${id}`;
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Resource not found" }, { status: 404 });
    }

    const resource = rows[0] as Resource;

    // Only admin or uploader can delete
    if (tokenData.role !== "admin" && resource.uploaded_by_id !== tokenData.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    // Delete file from Cloudinary
    if (resource.file_public_id) {
      try {
        await cloudinary.uploader.destroy(resource.file_public_id, { resource_type: "raw" });
      } catch {
        // File may not exist on Cloudinary, continue anyway
        console.warn("Cloudinary delete failed for:", resource.file_public_id);
      }
    }

    await sql`DELETE FROM resources WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/curriculum:", err);
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}