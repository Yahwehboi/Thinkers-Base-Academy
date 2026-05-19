"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Plus, Trash2, Edit2, Check, X,
  Eye, EyeOff, RefreshCw, Shield, BookOpen,
  UserCheck, KeyRound, BookMarked,
} from "lucide-react";
import { STAGE_GROUPS } from "@/data/curriculumConstants";
import type { AuthUser } from "./CurriculumLogin";

type ManagedUser = {
  id: string;
  username: string;
  role: "admin" | "teacher" | "parent";
  name: string;
  active: boolean;
  created_at: string;
  createdBy?: string;
  classes?: string[];
};

type Props = { user: AuthUser };

const ROLE_META = {
  admin:   { icon: Shield,    color: "#E8845C", label: "Admin" },
  teacher: { icon: BookOpen,  color: "#5BA4CF", label: "Teacher" },
  parent:  { icon: UserCheck, color: "#52B788", label: "Parent/Student" },
};

export default function UserManagement({ user }: Props) {
  const [users, setUsers]                   = useState<ManagedUser[]>([]);
  const [loading, setLoading]               = useState(true);
  const [showForm, setShowForm]             = useState(false);
  const [editUser, setEditUser]             = useState<ManagedUser | null>(null);
  const [editClassUser, setEditClassUser]   = useState<ManagedUser | null>(null);
  const [showPassChange, setShowPassChange] = useState(false);
  const [roleFilter, setRoleFilter]         = useState<string>("all");
  const [error, setError]                   = useState("");
  const [success, setSuccess]               = useState("");

  const [form, setForm] = useState({
    name: "", username: "", password: "",
    role: "teacher" as "teacher" | "parent",
    classes: [] as string[],
  });
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving]     = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const roleQ = roleFilter !== "all" ? `&roleFilter=${roleFilter}` : "";
      const res   = await fetch(`/api/users?action=list${roleQ}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
      else setError(data.error || "Failed to load users");
    } catch {
      setError("Failed to load users.");
    }
    setLoading(false);
  }, [roleFilter, user.token]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  function showSuccessMsg(msg: string) {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  }

  function toggleClass(className: string) {
    setForm((prev) => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter((c) => c !== className)
        : [...prev.classes, className],
    }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    if (form.role === "parent" && form.classes.length === 0) {
      setError("Please assign at least one class to this parent.");
      setSaving(false);
      return;
    }

    try {
      const res  = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({
          name: form.name, username: form.username,
          password: form.password, role: form.role,
          classes: form.classes, createdBy: user.name,
        }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); setSaving(false); return; }
      showSuccessMsg(`${form.role === "parent" ? "Parent/Student" : "Teacher"} account created!`);
      setForm({ name: "", username: "", password: "", role: "teacher", classes: [] });
      setShowForm(false);
      fetchUsers();
    } catch {
      setError("Failed to create user.");
    }
    setSaving(false);
  }

  async function handleToggleActive(u: ManagedUser) {
    try {
      const res  = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ id: u.id, active: !u.active }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }
      showSuccessMsg(`Account ${!u.active ? "activated" : "deactivated"}.`);
      fetchUsers();
    } catch { setError("Failed to update user."); }
  }

  async function handleDelete(u: ManagedUser) {
    if (!confirm(`Delete account for ${u.name}? This cannot be undone.`)) return;
    try {
      const res  = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ id: u.id }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }
      showSuccessMsg("User deleted.");
      fetchUsers();
    } catch { setError("Failed to delete user."); }
  }

  async function handleResetPassword(targetUser: ManagedUser, newPassword: string) {
    try {
      const res  = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ id: targetUser.id, password: newPassword }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }
      showSuccessMsg("Password reset successfully.");
      setEditUser(null);
    } catch { setError("Failed to reset password."); }
  }

  async function handleOwnPasswordChange(newPassword: string) {
    try {
      const res  = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ id: user.id, password: newPassword }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }
      showSuccessMsg("Your password has been changed successfully.");
      setShowPassChange(false);
    } catch { setError("Failed to change password."); }
  }

  async function handleUpdateClasses(targetUser: ManagedUser, classes: string[]) {
    if (classes.length === 0) {
      setError("Please assign at least one class.");
      return;
    }
    try {
      const res  = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ id: targetUser.id, classes }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }
      showSuccessMsg("Classes updated successfully.");
      setEditClassUser(null);
      fetchUsers();
    } catch { setError("Failed to update classes."); }
  }

  const filtered = roleFilter === "all"
    ? users
    : users.filter((u) => u.role === roleFilter);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-nunito font-extrabold text-forest text-xl">User Management</h2>
            <p className="font-poppins text-charcoal/50 text-xs">{users.length} total accounts</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setShowPassChange(true)} className="inline-flex items-center gap-2 bg-gray-100 text-charcoal/70 font-nunito font-bold text-sm px-4 py-2.5 rounded-button hover:bg-gray-200 transition-all">
            <KeyRound className="w-4 h-4" /> Change My Password
          </button>
          <button onClick={fetchUsers} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-4 h-4 text-charcoal/60" />
          </button>
          <button onClick={() => { setShowForm(true); setError(""); }} className="inline-flex items-center gap-2 bg-forest text-white font-nunito font-bold text-sm px-4 py-2.5 rounded-button hover:bg-forest/90 transition-all shadow-sm">
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error   && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-poppins text-red-600 text-xs flex items-center gap-2"><X className="w-4 h-4 flex-shrink-0" />{error}<button onClick={() => setError("")} className="ml-auto"><X className="w-3 h-3" /></button></div>}
      {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-leaf/15 border border-leaf/30 rounded-xl px-4 py-3 font-poppins text-forest text-xs flex items-center gap-2"><Check className="w-4 h-4 flex-shrink-0" />{success}</motion.div>}

      {/* Role filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "teacher", "parent"].map((r) => (
          <button key={r} onClick={() => setRoleFilter(r)} className={`font-nunito font-bold text-xs px-4 py-2 rounded-button transition-all capitalize ${roleFilter === r ? "bg-forest text-white shadow-sm" : "bg-white text-charcoal/60 border border-gray-200 hover:border-forest/40"}`}>
            {r === "all" ? "All Users" : r === "parent" ? "Parents/Students" : "Teachers"}
          </button>
        ))}
      </div>

      {/* Users list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-6 h-6 text-charcoal/30 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-card border border-gray-100">
          <Users className="w-10 h-10 text-charcoal/20 mx-auto mb-3" />
          <p className="font-nunito font-bold text-charcoal/40 text-base">No users found</p>
          <p className="font-poppins text-charcoal/30 text-xs mt-1">Click &quot;Add User&quot; to create an account</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((u) => {
            const meta = ROLE_META[u.role];
            const Icon = meta.icon;
            return (
              <div key={u.id} className={`bg-white rounded-card p-4 shadow-card border-l-4 flex items-center gap-4 flex-wrap ${!u.active ? "opacity-60" : ""}`} style={{ borderLeftColor: meta.color }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: meta.color + "22" }}>
                  <Icon className="w-5 h-5" style={{ color: meta.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-nunito font-bold text-forest text-base">{u.name}</p>
                    {!u.active && <span className="font-poppins text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-500">Inactive</span>}
                    {u.username === "admin" && <span className="font-poppins text-xs px-2 py-0.5 rounded-full bg-forest/10 text-forest">Main Admin</span>}
                  </div>
                  <p className="font-poppins text-charcoal/50 text-xs">
                    {u.role === "parent" ? `Access Code: ${u.username}` : `@${u.username}`} · {meta.label}
                  </p>
                  {/* Assigned classes for parents */}
                  {u.role === "parent" && (
                    <div className="flex flex-wrap gap-1 mt-1 items-center">
                      {u.classes && u.classes.length > 0 ? (
                        u.classes.map((c) => (
                          <span key={c} className="font-poppins text-[10px] px-2 py-0.5 rounded-full bg-leaf/15 text-forest">{c}</span>
                        ))
                      ) : (
                        <span className="font-poppins text-[10px] text-orange-400">⚠ No classes assigned</span>
                      )}
                    </div>
                  )}
                  <p className="font-poppins text-charcoal/35 text-xs mt-0.5">
                    Added {new Date(u.created_at).toLocaleDateString("en-GB")}
                  </p>
                </div>

                {/* Actions */}
                {u.username !== "admin" && (
                  <div className="flex items-center gap-2">
                    {/* Edit classes — parents only */}
                    {u.role === "parent" && (
                      <button
                        onClick={() => setEditClassUser(u)}
                        title="Edit assigned classes"
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors"
                      >
                        <BookMarked className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {/* Reset password */}
                    <button onClick={() => setEditUser(u)} title="Reset password" className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {/* Toggle active */}
                    <button onClick={() => handleToggleActive(u)} title={u.active ? "Deactivate" : "Activate"} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${u.active ? "bg-gray-100 hover:bg-orange-100 hover:text-orange-600" : "bg-green-100 text-green-600 hover:bg-green-200"}`}>
                      {u.active ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                    </button>
                    {/* Delete */}
                    <button onClick={() => handleDelete(u)} title="Delete" className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Create user modal ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-[24px] shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-nunito font-extrabold text-forest text-lg">Create New Account</h3>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"><X className="w-4 h-4" /></button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                {/* Role toggle */}
                <div>
                  <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-2">Account Type *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["teacher", "parent"] as const).map((r) => (
                      <button key={r} type="button" onClick={() => setForm({ ...form, role: r, classes: [] })} className={`py-3 px-4 rounded-xl font-nunito font-bold text-sm transition-all border-2 ${form.role === r ? "bg-forest text-white border-forest" : "bg-white text-charcoal/60 border-gray-200"}`}>
                        {r === "teacher" ? "👩‍🏫 Teacher" : "👨‍👩‍👧 Parent/Student"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Mrs. Okafor" className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors" />
                </div>

                {/* Username / Access code */}
                <div>
                  <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">{form.role === "parent" ? "Access Code *" : "Username *"}</label>
                  <input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder={form.role === "parent" ? "e.g. PAR2025 or child's surname" : "e.g. mrs.okafor"} className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors" />
                  {form.role === "parent" && <p className="font-poppins text-charcoal/40 text-xs mt-1">Share this code privately with the parent.</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">{form.role === "parent" ? "Confirm Access Code *" : "Password *"}</label>
                  <div className="relative">
                    <input required type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={form.role === "parent" ? "Re-enter access code" : "Min 6 characters"} className="w-full font-poppins text-sm px-4 py-3 pr-11 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-forest transition-colors">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Class assignment — parents only */}
                {form.role === "parent" && (
                  <ClassPicker
                    selected={form.classes}
                    onToggle={toggleClass}
                    label="Assign Classes *"
                    hint="Select all classes their child/children are enrolled in"
                  />
                )}

                {error && <p className="font-poppins text-red-500 text-xs">{error}</p>}

                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 font-nunito font-bold text-sm py-3 rounded-button border-2 border-gray-200 text-charcoal/60 hover:border-gray-300 transition-all">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 bg-forest text-white font-nunito font-bold text-sm py-3 rounded-button hover:bg-forest/90 transition-all shadow-sm disabled:opacity-60">
                    {saving ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edit parent classes modal ── */}
      <AnimatePresence>
        {editClassUser && (
          <EditClassesModal
            targetUser={editClassUser}
            onClose={() => setEditClassUser(null)}
            onSave={handleUpdateClasses}
          />
        )}
      </AnimatePresence>

      {/* ── Reset password modal ── */}
      <AnimatePresence>
        {editUser && (
          <ResetPasswordModal
            targetUser={editUser}
            onClose={() => setEditUser(null)}
            onReset={handleResetPassword}
          />
        )}
      </AnimatePresence>

      {/* ── Admin change own password ── */}
      <AnimatePresence>
        {showPassChange && (
          <ResetPasswordModal
            targetUser={{ id: user.id, username: user.username, name: user.name, role: "admin", active: true, created_at: "" }}
            onClose={() => setShowPassChange(false)}
            onReset={(_, newPassword) => handleOwnPasswordChange(newPassword)}
            title="Change Your Password"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Class Picker — reusable ──────────────────────────────────────────────────
function ClassPicker({
  selected, onToggle, label, hint,
}: {
  selected: string[];
  onToggle: (cls: string) => void;
  label?: string;
  hint?: string;
}) {
  return (
    <div>
      {label && (
        <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-2">
          {label}
          {hint && <span className="text-charcoal/40 font-normal"> — {hint}</span>}
        </label>
      )}
      <div className="space-y-3 border-2 border-gray-100 rounded-xl p-4">
        {STAGE_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="font-poppins text-xs text-charcoal/40 mb-1.5 font-semibold">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.classes.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => onToggle(cls)}
                  className={`font-poppins text-xs px-3 py-1.5 rounded-full border-2 transition-all ${
                    selected.includes(cls)
                      ? "border-leaf bg-leaf/15 text-forest font-semibold"
                      : "border-gray-200 text-charcoal/50 hover:border-gray-300"
                  }`}
                >
                  {selected.includes(cls) ? "✓ " : ""}{cls}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selected.length > 0 && (
        <p className="font-poppins text-forest text-xs mt-2 font-semibold">
          Selected: {selected.join(", ")}
        </p>
      )}
    </div>
  );
}

// ─── Edit Classes Modal ───────────────────────────────────────────────────────
function EditClassesModal({
  targetUser, onClose, onSave,
}: {
  targetUser: ManagedUser;
  onClose: () => void;
  onSave: (user: ManagedUser, classes: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(targetUser.classes || []);

  function toggleClass(cls: string) {
    setSelected((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-[24px] shadow-2xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-nunito font-extrabold text-forest text-lg">Edit Assigned Classes</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <p className="font-poppins text-charcoal/50 text-xs mb-5">
          Parent: <span className="font-semibold text-forest">{targetUser.name}</span> — update which classes they can access
        </p>

        <ClassPicker
          selected={selected}
          onToggle={toggleClass}
          label="Assigned Classes"
          hint="select all applicable classes"
        />

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 font-nunito font-bold text-sm py-3 rounded-button border-2 border-gray-200 text-charcoal/60 hover:border-gray-300 transition-all">Cancel</button>
          <button
            onClick={() => onSave(targetUser, selected)}
            disabled={selected.length === 0}
            className="flex-1 bg-forest text-white font-nunito font-bold text-sm py-3 rounded-button hover:bg-forest/90 transition-all shadow-sm disabled:opacity-40"
          >
            Save Classes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Reset Password Modal ─────────────────────────────────────────────────────
function ResetPasswordModal({
  targetUser, onClose, onReset, title,
}: {
  targetUser: ManagedUser;
  onClose: () => void;
  onReset: (user: ManagedUser, password: string) => void;
  title?: string;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow]               = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-[24px] shadow-2xl w-full max-w-sm p-6">
        <h3 className="font-nunito font-extrabold text-forest text-lg mb-1">{title || "Reset Password"}</h3>
        <p className="font-poppins text-charcoal/50 text-xs mb-5">
          For: {targetUser.name}{targetUser.username !== "admin" && ` (@${targetUser.username})`}
        </p>

        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password (min 6 characters)"
            className="w-full font-poppins text-sm px-4 py-3 pr-11 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors"
          />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-forest transition-colors">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 font-nunito font-bold text-sm py-3 rounded-button border-2 border-gray-200 text-charcoal/60 hover:border-gray-300 transition-all">Cancel</button>
          <button onClick={() => { if (newPassword.length >= 6) onReset(targetUser, newPassword); }} disabled={newPassword.length < 6} className="flex-1 bg-forest text-white font-nunito font-bold text-sm py-3 rounded-button hover:bg-forest/90 transition-all shadow-sm disabled:opacity-40">
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}