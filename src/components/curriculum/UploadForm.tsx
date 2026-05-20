"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Upload, FileText, CheckCircle2,
  AlertCircle, Loader2,
} from "lucide-react";
import {
  SUBJECTS, TERMS, SESSIONS,
  MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB,
  ALLOWED_EXTENSIONS, STAGE_GROUPS,
} from "@/data/curriculumConstants";
import type { AuthUser } from "./CurriculumLogin";

type Props = {
  user: AuthUser;
  onClose: () => void;
  onSuccess: () => void;
};

type FormState = {
  title: string;
  description: string;
  class: string;
  subject: string;
  term: string;
  session: string;
};

const INITIAL_FORM: FormState = {
  title: "", description: "", class: "",
  subject: "", term: "", session: "",
};

export default function UploadForm({ user, onClose, onSuccess }: Props) {
  const [form, setForm]           = useState<FormState>(INITIAL_FORM);
  const [file, setFile]           = useState<File | null>(null);
  const [dragOver, setDragOver]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState(false);
  const fileRef                   = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function validateFile(f: File): string | null {
    if (f.size > MAX_FILE_SIZE_BYTES) {
      return `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
    }
    const ext = "." + f.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return `File type not allowed. Accepted: PDF, Word, PowerPoint, Images.`;
    }
    return null;
  }

  function handleFileSelect(f: File) {
    const err = validateFile(f);
    if (err) { setError(err); return; }
    setFile(f);
    setError("");
    // Auto-fill title from filename if empty
    if (!form.title) {
      const name = f.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setForm((prev) => ({ ...prev, title: name }));
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.class || !form.subject || !form.term || !form.session) {
      setError("Please fill in all required fields.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title",       form.title);
      formData.append("description", form.description);
      formData.append("class",       form.class);
      formData.append("subject",     form.subject);
      formData.append("term",        form.term);
      formData.append("session",     form.session);
      formData.append("uploadedBy",  user.name);
      formData.append("role",        user.role);
      if (file) formData.append("file", file);

      const res = await fetch("/api/curriculum", {
        method: "POST",
        headers: {
          // JWT token sent in Authorization header
          // Do NOT set Content-Type — browser sets it automatically with boundary for FormData
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Upload failed. Please try again.");
        setUploading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1800);

    } catch {
      setError("Network error. Please check your connection.");
      setUploading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-[24px] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-nunito font-extrabold text-forest text-lg">
                  Upload Resource
                </h2>
                <p className="font-poppins text-charcoal/50 text-xs">
                  {user.role === "admin"
                    ? "Auto-approved on upload"
                    : "Will be sent for admin approval"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-charcoal/60" />
            </button>
          </div>

          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <CheckCircle2 className="w-16 h-16 text-leaf mx-auto mb-4" />
              </motion.div>
              <h3 className="font-nunito font-extrabold text-forest text-xl mb-2">
                Uploaded Successfully!
              </h3>
              <p className="font-poppins text-charcoal/60 text-sm">
                {user.role === "admin"
                  ? "Your resource is now live in the hub."
                  : "Sent for admin approval. It will appear once approved."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              {/* File drop zone */}
              <div>
                <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-2">
                  File{" "}
                  <span className="text-charcoal/40 font-normal">
                    (optional — you can add resource info without a file)
                  </span>
                </label>

                {file ? (
                  <div className="flex items-center gap-3 bg-leaf/10 border-2 border-leaf/30 rounded-xl p-4">
                    <FileText className="w-8 h-8 text-leaf flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-nunito font-bold text-forest text-sm truncate">
                        {file.name}
                      </p>
                      <p className="font-poppins text-charcoal/50 text-xs">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                      dragOver
                        ? "border-leaf bg-leaf/10 scale-[1.01]"
                        : "border-gray-200 hover:border-leaf/50 hover:bg-gray-50"
                    }`}
                  >
                    <Upload className={`w-8 h-8 mx-auto mb-3 ${dragOver ? "text-leaf" : "text-charcoal/30"}`} />
                    <p className="font-nunito font-bold text-forest text-sm mb-1">
                      Drop file here or{" "}
                      <span className="text-leaf">browse</span>
                    </p>
                    <p className="font-poppins text-charcoal/40 text-xs">
                      PDF, Word, PowerPoint, Images — max {MAX_FILE_SIZE_MB}MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileRef}
                  type="file"
                  accept={ALLOWED_EXTENSIONS.join(",")}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
                  }}
                />
              </div>

              {/* Title */}
              <div>
                <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                  Resource Title *
                </label>
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Grade 3 Mathematics First Term Notes"
                  className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                  Description{" "}
                  <span className="text-charcoal/40 font-normal">(optional)</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Brief description of this resource..."
                  className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Class */}
              <div>
                <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                  Class *
                </label>
                <select
                  required
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select a class...</option>
                  {STAGE_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.classes.map((cls) => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                  Subject *
                </label>
                <select
                  required
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select a subject...</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Term + Session */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                    Term *
                  </label>
                  <select
                    required
                    name="term"
                    value={form.term}
                    onChange={handleChange}
                    className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select...</option>
                    {TERMS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                    Session *
                  </label>
                  <select
                    required
                    name="session"
                    value={form.session}
                    onChange={handleChange}
                    className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select...</option>
                    {SESSIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="font-poppins text-red-600 text-xs">{error}</p>
                </motion.div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 font-nunito font-bold text-sm px-6 py-3 rounded-button border-2 border-gray-200 text-charcoal/60 hover:border-gray-300 hover:text-charcoal transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-forest text-white font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:bg-forest/90 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload className="w-4 h-4" /> Upload Resource</>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}