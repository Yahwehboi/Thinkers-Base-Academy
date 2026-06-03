"use client";

import { motion } from "framer-motion";
import {
  Download, Eye, Trash2, CheckCircle2,
  Clock, FileText, FileImage, Presentation,
  File, BookOpen,
} from "lucide-react";
import { FILE_TYPES } from "@/data/curriculumConstants";
import type { AuthUser } from "./CurriculumLogin";

export type Resource = {
  id: string;
  title: string;
  description: string;
  class: string;
  subject: string;
  term: string;
  session: string;
  fileType: string;
  fileName: string;       // full Cloudinary URL
  filePublicId: string;
  originalName: string;
  fileSize: number;
  uploadedBy: string;
  uploadedById: string;
  uploadedByRole: string;
  approved: boolean;
  uploadedAt: string;
  approvedAt?: string;
  approvedBy?: string;
};

type Props = {
  resource: Resource;
  user: AuthUser;
  index: number;
  onApprove?: (id: string) => void;
  onDelete?: (id: string) => void;
};

function formatFileSize(bytes: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function FileIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    pdf:   <FileText     className="w-6 h-6" />,
    docx:  <BookOpen     className="w-6 h-6" />,
    pptx:  <Presentation className="w-6 h-6" />,
    image: <FileImage    className="w-6 h-6" />,
    other: <File         className="w-6 h-6" />,
  };
  return <>{icons[type] || icons.other}</>;
}


export default function ResourceCard({
  resource, user, index, onApprove, onDelete,
}: Props) {
  const meta    = FILE_TYPES[resource.fileType as keyof typeof FILE_TYPES] || FILE_TYPES.other;
  const hasFile = Boolean(resource.fileName);

  // Admin manages all, teacher manages only own uploads
  const canManage =
    user.role === "admin" ||
    (user.role === "teacher" && resource.uploadedById === user.id);

  // Admin and teacher can see pending resources (they have a token)
  const canAccessFile =
    resource.approved ||
    user.role === "admin" ||
    (user.role === "teacher" && resource.uploadedById === user.id);

  // Shared fetch helper — streams file from proxy into a blob, then triggers action
  function fetchFile(preview: boolean, onBlob: (blob: Blob) => void) {
    const url = `/api/download?id=${resource.id}${preview ? "&preview=true" : ""}&token=${encodeURIComponent(user.token)}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.blob();
      })
      .then(onBlob)
      .catch(() => {
        // Fallback: open Cloudinary URL directly
        window.open(resource.fileName, "_blank");
      });
  }

  function handleDownload() {
    fetchFile(false, (blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a       = document.createElement("a");
      a.href         = blobUrl;
      a.download     = resource.originalName || `resource.${resource.fileType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    });
  }

  function handlePreview() {
    if (resource.fileType === "pdf" || resource.fileType === "image") {
      // Desktop: open via proxy with inline Content-Disposition — renders in browser tab
      const fname = encodeURIComponent(resource.originalName || `file.${resource.fileType}`);
      const url   = `/api/download/${fname}?id=${resource.id}&preview=true&token=${encodeURIComponent(user.token)}`;
      window.open(url, "_blank");
    } else {
      // Desktop: Google Docs Viewer renders DOCX/PPTX in browser
      const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resource.fileName)}&embedded=false`;
      window.open(viewerUrl, "_blank");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group ${
        !resource.approved
          ? "border-2 border-dashed border-orange-200"
          : "border border-gray-100"
      }`}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: meta.color }} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: meta.color + "22", color: meta.color }}
          >
            <FileIcon type={resource.fileType} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-nunito font-bold text-forest text-base leading-snug mb-1 line-clamp-2">
              {resource.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <span className="font-poppins text-[10px] font-semibold px-2 py-0.5 rounded-full bg-forest/10 text-forest">
                {resource.class}
              </span>
              <span className="font-poppins text-[10px] font-semibold px-2 py-0.5 rounded-full bg-leaf/15 text-forest">
                {resource.subject}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {resource.description && (
          <p className="font-poppins text-charcoal/60 text-xs leading-relaxed mb-3 line-clamp-2">
            {resource.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
          <span className="font-poppins text-charcoal/45 text-xs">{resource.term}</span>
          <span className="font-poppins text-charcoal/45 text-xs">·</span>
          <span className="font-poppins text-charcoal/45 text-xs">{resource.session}</span>
          {resource.fileSize > 0 && (
            <>
              <span className="font-poppins text-charcoal/45 text-xs">·</span>
              <span className="font-poppins text-charcoal/45 text-xs">
                {formatFileSize(resource.fileSize)}
              </span>
            </>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between mb-4">
          {resource.approved ? (
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-leaf" />
              <span className="font-poppins text-xs text-leaf font-semibold">Approved</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-poppins text-xs text-orange-500 font-semibold">
                Pending Approval
              </span>
            </div>
          )}
          <span className="font-poppins text-charcoal/35 text-xs">
            {formatDate(resource.uploadedAt)}
          </span>
        </div>

        {/* Uploader */}
        <p className="font-poppins text-charcoal/40 text-xs mb-4">
          Uploaded by{" "}
          <span className="font-semibold text-charcoal/60">{resource.uploadedBy}</span>
        </p>

        {/* Actions */}
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2">

            {/* Download — approved OR admin/teacher on their own files */}
            {hasFile && canAccessFile && (
              <button
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-forest text-white font-nunito font-bold text-xs px-3 py-2.5 rounded-button hover:bg-forest/90 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            )}

            {/* Preview — desktop only; mobile browsers cannot render files inline */}
            {hasFile && canAccessFile && (
              <button
                onClick={handlePreview}
                className="w-9 h-9 hidden sm:flex items-center justify-center bg-gray-100 rounded-button hover:bg-gray-200 transition-colors flex-shrink-0"
                title={
                  resource.fileType === "pdf" || resource.fileType === "image"
                    ? "Preview"
                    : "Preview in Google Docs"
                }
              >
                <Eye className="w-4 h-4 text-charcoal/60" />
              </button>
            )}

            {/* Delete — approved resources (admin + teacher own) */}
            {canManage && onDelete && resource.approved && (
              <button
                onClick={() => onDelete(resource.id)}
                className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-button hover:bg-red-100 hover:text-red-500 transition-colors flex-shrink-0"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {/* Delete — teacher deleting their own pending upload */}
            {user.role === "teacher" && !resource.approved && resource.uploadedById === user.id && onDelete && (
              <button
                onClick={() => onDelete(resource.id)}
                className="w-9 h-9 flex items-center justify-center bg-red-50 rounded-button hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                title="Delete my upload"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Approve + Delete row — admin only, pending resources */}
          {user.role === "admin" && !resource.approved && (
            <div className="flex gap-2 mt-2">
              {onApprove && (
                <button
                  onClick={() => onApprove(resource.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-leaf text-white font-nunito font-bold text-xs px-3 py-2.5 rounded-button hover:bg-leaf/90 transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(resource.id)}
                  className="w-9 h-9 flex items-center justify-center bg-red-50 rounded-button hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                  title="Reject and Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Pending notice for non-admin teacher (own upload) */}
          {hasFile && !resource.approved && user.role === "teacher" && resource.uploadedById === user.id && (
            <p className="font-poppins text-orange-400 text-xs text-center py-1">
              ⏳ Your upload is awaiting admin approval
            </p>
          )}

          {/* Pending notice for parent */}
          {hasFile && !resource.approved && user.role === "parent" && (
            <p className="font-poppins text-orange-400 text-xs text-center py-1">
              ⏳ Awaiting admin approval
            </p>
          )}

          {/* No file */}
          {!hasFile && (
            <p className="font-poppins text-charcoal/40 text-xs text-center py-2">
              📋 No file attached — resource info only
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}