"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Settings, BookOpen, Users, Calendar, Clock } from "lucide-react";
import type { AuthUser } from "./CurriculumLogin";

type Settings = {
  class:   string[];
  subject: string[];
  term:    string[];
  session: string[];
};

type FullSettings = Settings & Record<string, string[]>;

type Props = {
  user: AuthUser;
  onClose: () => void;
};

const CATEGORIES = [
  { key: "session", label: "Sessions",  icon: Clock,     color: "#52B788", placeholder: "e.g. 2027/2028" },
  { key: "term",    label: "Terms",     icon: Calendar,   color: "#3B82F6", placeholder: "e.g. Fourth Term" },
  { key: "class",   label: "Classes",   icon: Users,      color: "#F59E0B", placeholder: "e.g. Grade 6" },
  { key: "subject", label: "Subjects",  icon: BookOpen,   color: "#EF4444", placeholder: "e.g. French Language" },
];

export default function SettingsPanel({ user, onClose }: Props) {
  const [settings, setSettings]   = useState<FullSettings>({ class: [], subject: [], term: [], session: [] });
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("session");
  const [newValue, setNewValue]   = useState("");
  const [adding, setAdding]       = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [fullRows, setFullRows]   = useState<Record<string, { id: string; value: string }[]>>({});

  const fetchSettings = useCallback(async () => {
    try {
      const res  = await fetch("/api/curriculum-settings");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        // Also fetch full rows with IDs for deletion
        const rowRes  = await fetch("/api/curriculum-settings?withIds=true", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const rowData = await rowRes.json();
        if (rowData.rows) setFullRows(rowData.rows);
      }
    } catch {
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  async function handleAdd() {
    if (!newValue.trim()) return;
    setAdding(true);
    setError("");
    try {
      const res  = await fetch("/api/curriculum-settings", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body:    JSON.stringify({ category: activeTab, value: newValue.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setNewValue("");
        setSuccess(`"${newValue.trim()}" added successfully`);
        setTimeout(() => setSuccess(""), 3000);
        await fetchSettings();
      } else {
        setError(data.error || "Failed to add");
      }
    } catch {
      setError("Network error");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string, value: string) {
    if (!confirm(`Remove "${value}"? This won't affect existing uploads.`)) return;
    setError("");
    try {
      const res  = await fetch("/api/curriculum-settings", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body:    JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(`"${value}" removed`);
        setTimeout(() => setSuccess(""), 3000);
        await fetchSettings();
      } else {
        setError(data.error || "Failed to delete");
      }
    } catch {
      setError("Network error");
    }
  }

  const activeCat = CATEGORIES.find((c) => c.key === activeTab)!;
  const items     = fullRows[activeTab] || (settings[activeTab] || []).map((v) => ({ id: "", value: v }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-forest px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-nunito font-bold text-white text-lg">Curriculum Settings</h2>
              <p className="font-poppins text-white/70 text-xs">Manage dropdown options</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 flex-shrink-0 px-2 pt-2">
          {CATEGORIES.map((cat) => {
            const Icon    = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => { setActiveTab(cat.key); setNewValue(""); setError(""); }}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-poppins font-semibold rounded-t-lg transition-all ${
                  isActive
                    ? "bg-white border-b-2 text-forest"
                    : "text-charcoal/50 hover:text-charcoal/70"
                }`}
                style={{ borderBottomColor: isActive ? cat.color : "transparent" }}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? "bg-forest/10 text-forest" : "bg-gray-100 text-charcoal/40"}`}>
                  {(settings[cat.key] || []).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Feedback messages */}
          <AnimatePresence>
            {success && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-4 bg-green-50 border border-green-200 text-green-700 font-poppins text-sm px-4 py-2.5 rounded-xl">
                ✓ {success}
              </motion.div>
            )}
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-4 bg-red-50 border border-red-200 text-red-600 font-poppins text-sm px-4 py-2.5 rounded-xl">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add new */}
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              value={newValue}
              onChange={(e) => { setNewValue(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder={activeCat.placeholder}
              className="flex-1 font-poppins text-sm px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
            />
            <button
              onClick={handleAdd}
              disabled={adding || !newValue.trim()}
              className="inline-flex items-center gap-1.5 bg-forest text-white font-nunito font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-forest/90 disabled:opacity-50 transition-all"
            >
              <Plus className="w-4 h-4" />
              {adding ? "Adding..." : "Add"}
            </button>
          </div>

          {/* List */}
          {loading ? (
            <div className="text-center py-8 text-charcoal/40 font-poppins text-sm">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-charcoal/40 font-poppins text-sm">No {activeCat.label.toLowerCase()} yet</div>
          ) : (
            <div className="space-y-2">
              {items.map((item, i) => (
                <motion.div
                  key={item.id || item.value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 group hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeCat.color }} />
                    <span className="font-poppins text-sm text-charcoal font-medium">{item.value}</span>
                  </div>
                  {item.id && (
                    <button
                      onClick={() => handleDelete(item.id, item.value)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-charcoal/30 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 flex-shrink-0">
          <p className="font-poppins text-charcoal/40 text-xs text-center">
            Removing an option won&apos;t affect resources already uploaded with that value.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}