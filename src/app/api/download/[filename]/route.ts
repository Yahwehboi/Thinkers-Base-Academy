import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import sql, { initializeDatabase } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

type ResourceRow = {
  file_url: string;
  file_public_id: string;
  original_name: string;
  file_type: string;
  approved: boolean;
  uploaded_by_id: string;
};

export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();

    const { searchParams } = new URL(req.url);
    const id        = searchParams.get("id");
    const isPreview = searchParams.get("preview") === "true";
    if (!id) return NextResponse.json({ error: "Resource ID required" }, { status: 400 });

    // Auth — accept token from Authorization header OR ?token= query param (direct browser open)
    const auth       = req.headers.get("authorization");
    const queryToken = searchParams.get("token");
    const rawToken   = auth?.startsWith("Bearer ") ? auth.slice(7) : (queryToken || "");
    const tokenData  = rawToken ? verifyToken(rawToken) : null;
    if (!tokenData) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch resource
    const rows = await sql`SELECT * FROM resources WHERE id = ${id}`;
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const resource = rows[0] as ResourceRow;

    // Access control
    if (tokenData.role === "parent" && !resource.approved) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (tokenData.role === "teacher" && !resource.approved && resource.uploaded_by_id !== tokenData.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!resource.file_public_id) {
      return NextResponse.json({ error: "No file attached" }, { status: 404 });
    }

    // Detect actual resource_type from the stored Cloudinary URL
    // Some older uploads were mis-stored as "image" even for PDFs
    // Reading from the URL is the most reliable approach
    let resourceType = "raw";
    if (resource.file_url) {
      if (resource.file_url.includes("/image/upload/")) resourceType = "image";
      else if (resource.file_url.includes("/video/upload/")) resourceType = "video";
      else resourceType = "raw";
    } else {
      // Fallback: use file_type
      resourceType = resource.file_type === "image" ? "image" : "raw";
    }

    // Generate a signed URL — inline for preview, attachment for download
    const disposition = isPreview ? "inline" : "attachment";

    const signedUrl = cloudinary.url(resource.file_public_id, {
      resource_type: resourceType,
      type: "upload",
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 120,
    });

    // Fetch from Cloudinary using signed URL
    const fileRes = await fetch(signedUrl);
    if (!fileRes.ok) {
      console.error("Cloudinary fetch failed:", fileRes.status, await fileRes.text());
      return NextResponse.json({ error: "Failed to fetch file" }, { status: 502 });
    }

    // MIME type map
    const mimeMap: Record<string, string> = {
      pdf:   "application/pdf",
      docx:  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      doc:   "application/msword",
      pptx:  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ppt:   "application/vnd.ms-powerpoint",
      image: "image/jpeg",
      other: "application/octet-stream",
    };

    const contentType = mimeMap[resource.file_type] || "application/octet-stream";
    const fileName    = resource.original_name || `file.${resource.file_type}`;

    return new NextResponse(fileRes.body, {
      status: 200,
      headers: {
        "Content-Type":        contentType,
        "Content-Disposition": `${disposition}; filename="${encodeURIComponent(fileName)}"`,
        "Cache-Control":       "private, no-store",
      },
    });

  } catch (err) {
    console.error("GET /api/download:", err);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}