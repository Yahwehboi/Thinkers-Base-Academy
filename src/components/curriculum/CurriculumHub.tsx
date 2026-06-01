"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search, Filter, Upload, Users, BookOpen,
  LogOut, ChevronDown, X, RefreshCw, Bell, Settings,
} from "lucide-react";
import CurriculumLogin, { type AuthUser } from "./CurriculumLogin";
import UploadForm from "./UploadForm";
import UserManagement from "./UserManagement";
import ResourceCard, { type Resource } from "./ResourceCard";
import SettingsPanel from "./SettingsPanel";
import { STAGE_GROUPS } from "@/data/curriculumConstants";

type Tab  = "resources" | "users";
type View = "grid" | "list";

export default function CurriculumHub() {
  const [user, setUser]             = useState<AuthUser | null>(null);
  const [tab, setTab]               = useState<Tab>("resources");
  const [view, setView]             = useState<View>("grid");
  const [resources, setResources]   = useState<Resource[]>([]);
  const [loading, setLoading]       = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Filters
  const [search, setSearch]               = useState("");
  const [filterClass, setFilterClass]     = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterTerm, setFilterTerm]       = useState("");
  const [filterSession, setFilterSession] = useState("");
  const [showPending, setShowPending]     = useState(false);
  const [showSettings, setShowSettings]   = useState(false);

  // Dynamic settings from DB
  const [dynClasses,  setDynClasses]  = useState<string[]>([]);
  const [dynSubjects, setDynSubjects] = useState<string[]>([]);
  const [dynTerms,    setDynTerms]    = useState<string[]>([]);
  const [dynSessions, setDynSessions] = useState<string[]>([]);

  // ── Restore session ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tba_curriculum_user");
      if (saved) setUser(JSON.parse(saved));
    } catch {}
  }, []);

  // Fetch dynamic settings from DB
  const fetchCurriculumSettings = useCallback(async () => {
    try {
      const res  = await fetch("/api/curriculum-settings");
      const data = await res.json();
      if (data.success) {
        setDynClasses(data.settings.class   || []);
        setDynSubjects(data.settings.subject || []);
        setDynTerms(data.settings.term       || []);
        setDynSessions(data.settings.session || []);
      }
    } catch {}
  }, []);

  useEffect(() => { fetchCurriculumSettings(); }, [fetchCurriculumSettings]);

  function handleLogin(loggedInUser: AuthUser) {
    setUser(loggedInUser);
    try {
      localStorage.setItem("tba_curriculum_user", JSON.stringify(loggedInUser));
    } catch {}
  }

  function handleLogout() {
    setUser(null);
    setResources([]);
    try { localStorage.removeItem("tba_curriculum_user"); } catch {}
  }

  // ── Fetch resources ──
  const fetchResources = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (filterClass)   params.set("class",   filterClass);
      if (filterSubject) params.set("subject", filterSubject);
      if (filterTerm)    params.set("term",    filterTerm);
      if (filterSession) params.set("session", filterSession);
      if (search)        params.set("search",  search);

      // Admin toggle for pending
      if (user.role === "admin" || user.role === "teacher") {
        params.set("approvedOnly", showPending ? "false" : "true");
      }

      const res  = await fetch(`/api/curriculum?${params.toString()}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (data.success) setResources(data.resources);

      // Fetch pending count for admin bell
      if (user.role === "admin") {
        const pendRes  = await fetch("/api/curriculum?approvedOnly=false", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const pendData = await pendRes.json();
        if (pendData.success) {
          setPendingCount(
            pendData.resources.filter((r: Resource) => !r.approved).length
          );
        }
      }
    } catch {
      console.error("Failed to fetch resources");
    }
    setLoading(false);
  }, [user, filterClass, filterSubject, filterTerm, filterSession, search, showPending]);

  useEffect(() => {
    if (user) fetchResources();
  }, [fetchResources, user]);

  // ── Actions ──
  async function handleApprove(id: string) {
    try {
      await fetch("/api/curriculum", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user!.token}`,
        },
        body: JSON.stringify({ id, action: "approve", approvedBy: user!.name }),
      });
      fetchResources();
    } catch {}
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this resource? This cannot be undone.")) return;
    try {
      await fetch("/api/curriculum", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user!.token}`,
        },
        body: JSON.stringify({ id }),
      });
      fetchResources();
    } catch {}
  }

  function clearFilters() {
    setFilterClass("");
    setFilterSubject("");
    setFilterTerm("");
    setFilterSession("");
    setSearch("");
    setShowPending(false);
  }

  const hasActiveFilters =
    filterClass || filterSubject || filterTerm || filterSession || showPending;

  // ── Not logged in ──
  if (!user) return <CurriculumLogin onLogin={handleLogin} />;

  const roleColors: Record<string, string> = {
    admin:   "#E8845C",
    teacher: "#5BA4CF",
    parent:  "#52B788",
  };

  // Classes available for filtering
  // Parents only see their assigned classes in the filter
  const availableClasses = user.role === "parent" && user.classes && user.classes.length > 0
    ? user.classes
    : (dynClasses.length > 0 ? dynClasses : STAGE_GROUPS.flatMap((g) => g.classes));

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Navbar ── */}
      <div className="bg-forest shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-nunito font-extrabold text-white text-base leading-none">
                  Curriculum Hub
                </p>
                <p className="font-poppins text-white/50 text-[10px]">
                  Thinkers Base Academy
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Pending bell — admin only */}
              {user.role === "admin" && pendingCount > 0 && (
                <button
                  onClick={() => { setTab("resources"); setShowPending(true); }}
                  className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Bell className="w-4 h-4 text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-nursery rounded-full flex items-center justify-center font-nunito font-extrabold text-[10px] text-forest">
                    {pendingCount}
                  </span>
                </button>
              )}

              {/* Parent assigned classes badge */}
              {user.role === "parent" && user.classes && user.classes.length > 0 && (
                <div className="hidden sm:flex items-center gap-1 flex-wrap max-w-[200px]">
                  {user.classes.slice(0, 2).map((c) => (
                    <span key={c} className="font-poppins text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white">
                      {c}
                    </span>
                  ))}
                  {user.classes.length > 2 && (
                    <span className="font-poppins text-[10px] text-white/50">
                      +{user.classes.length - 2} more
                    </span>
                  )}
                </div>
              )}

              {/* User badge */}
              <div
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
                style={{ backgroundColor: roleColors[user.role] + "33" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: roleColors[user.role] }}
                />
                <span className="font-nunito font-bold text-white text-xs capitalize">
                  {user.role}
                </span>
                <span className="font-poppins text-white/60 text-xs">
                  — {user.name}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* ── Tabs — admin only ── */}
        {user.role === "admin" && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {([
              { key: "resources", label: "📚 Resources" },
              { key: "users",     label: "👥 User Management" },
            ] as { key: Tab; label: string }[]).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`font-nunito font-bold text-sm px-4 sm:px-5 py-2.5 rounded-button transition-all whitespace-nowrap ${
                  tab === t.key
                    ? "bg-forest text-white shadow-md"
                    : "bg-white text-charcoal/60 border border-gray-200 hover:border-forest/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* ── User Management tab ── */}
        {tab === "users" && user.role === "admin" && (
          <UserManagement user={user} />
        )}

        {/* ── Resources tab ── */}
        {tab === "resources" && (
          <>
            {/* Welcome message for parents */}
            {user.role === "parent" && user.classes && user.classes.length > 0 && (
              <div className="bg-white rounded-card p-4 shadow-card mb-6 flex items-center gap-3">
                <span className="text-2xl">👋</span>
                <div>
                  <p className="font-nunito font-bold text-forest text-base">
                    Welcome, {user.name || "Parent"}!
                  </p>
                  <p className="font-poppins text-charcoal/55 text-xs">
                    You can access curriculum resources for:{" "}
                    <span className="font-semibold text-forest">
                      {user.classes.join(", ")}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Search + filter bar */}
            <div className="bg-white rounded-card shadow-card p-4 mb-6">
              <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
                {/* Search */}
                <div className="flex-1 min-w-0 w-full sm:w-auto relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search resources..."
                    className="w-full font-poppins text-sm pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors"
                  />
                </div>

                {/* Filter toggle */}
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className={`inline-flex items-center gap-2 font-nunito font-bold text-sm px-4 py-2.5 rounded-button border-2 transition-all ${
                    hasActiveFilters
                      ? "border-leaf bg-leaf/10 text-forest"
                      : "border-gray-200 text-charcoal/60 hover:border-gray-300"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                  {hasActiveFilters && (
                    <span className="w-5 h-5 bg-leaf text-white rounded-full flex items-center justify-center text-[10px] font-extrabold">
                      {[filterClass, filterSubject, filterTerm, filterSession, showPending]
                        .filter(Boolean).length}
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? "rotate-180" : ""}`} />
                </button>

                {/* Settings — admin only */}
                {user.role === "admin" && (
                  <button
                    onClick={() => setShowSettings(true)}
                    className="w-10 h-10 flex items-center justify-center rounded-button border-2 border-gray-200 hover:border-gray-300 transition-colors"
                    title="Curriculum Settings"
                  >
                    <Settings className="w-4 h-4 text-charcoal/50" />
                  </button>
                )}

                {/* Upload — admin + teacher only */}
                {user.role !== "parent" && (
                  <button
                    onClick={() => setShowUpload(true)}
                    className="inline-flex items-center gap-2 bg-forest text-white font-nunito font-bold text-sm px-4 py-2.5 rounded-button hover:bg-forest/90 transition-all shadow-sm"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Upload</span>
                  </button>
                )}

                {/* Refresh */}
                <button
                  onClick={fetchResources}
                  className="w-10 h-10 flex items-center justify-center rounded-button border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 text-charcoal/50 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Filter panel */}
              {showFilter && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {/* Class */}
                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="font-poppins text-xs px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-white"
                  >
                    <option value="">All Classes</option>
                    {user.role === "parent"
                      ? availableClasses.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))
                      : (dynClasses.length > 0 ? dynClasses : STAGE_GROUPS.flatMap(g => g.classes)).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))
                    }
                  </select>

                  {/* Subject */}
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="font-poppins text-xs px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-white"
                  >
                    <option value="">All Subjects</option>
                    {(dynSubjects.length > 0 ? dynSubjects : []).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {/* Term */}
                  <select
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    className="font-poppins text-xs px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-white"
                  >
                    <option value="">All Terms</option>
                    {(dynTerms.length > 0 ? dynTerms : []).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>

                  {/* Session */}
                  <select
                    value={filterSession}
                    onChange={(e) => setFilterSession(e.target.value)}
                    className="font-poppins text-xs px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-white"
                  >
                    <option value="">All Sessions</option>
                    {(dynSessions.length > 0 ? dynSessions : []).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {/* Pending toggle — admin/teacher only */}
                  {user.role !== "parent" && (
                    <button
                      onClick={() => setShowPending(!showPending)}
                      className={`col-span-2 font-nunito font-bold text-xs px-3 py-2.5 rounded-xl border-2 transition-all ${
                        showPending
                          ? "border-orange-400 bg-orange-50 text-orange-600"
                          : "border-gray-200 text-charcoal/50 hover:border-orange-300"
                      }`}
                    >
                      {showPending ? "✓ Showing Pending Resources" : "Show Pending Approval"}
                    </button>
                  )}

                  {/* Clear filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="col-span-2 inline-flex items-center justify-center gap-1.5 font-nunito font-bold text-xs px-3 py-2.5 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all"
                    >
                      <X className="w-3.5 h-3.5" /> Clear All Filters
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Stats bar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-4 flex-wrap">
                <p className="font-poppins text-charcoal/50 text-sm">
                  <span className="font-nunito font-bold text-forest text-base">
                    {resources.length}
                  </span>{" "}
                  resource{resources.length !== 1 ? "s" : ""} found
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="font-poppins text-xs text-leaf hover:text-forest transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear filters
                  </button>
                )}
              </div>

              {/* Grid / List toggle */}
              <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
                {(["grid", "list"] as View[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 py-2 font-nunito font-bold text-xs capitalize transition-all ${
                      view === v
                        ? "bg-forest text-white"
                        : "text-charcoal/50 hover:text-forest"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw className="w-8 h-8 text-charcoal/30 animate-spin" />
                  <p className="font-poppins text-charcoal/40 text-sm">
                    Loading resources...
                  </p>
                </div>
              </div>
            ) : resources.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <BookOpen className="w-12 h-12 text-charcoal/20 mb-4" />
                <h3 className="font-nunito font-bold text-charcoal/40 text-xl mb-2">
                  No resources found
                </h3>
                <p className="font-poppins text-charcoal/30 text-sm max-w-xs">
                  {user.role === "parent"
                    ? "No resources have been published for your child's class yet. Check back soon."
                    : user.role === "teacher"
                    ? "No resources yet. Upload your first resource using the Upload button above."
                    : "Upload your first resource using the Upload button above."}
                </p>
                {user.role !== "parent" && (
                  <button
                    onClick={() => setShowUpload(true)}
                    className="mt-5 inline-flex items-center gap-2 bg-forest text-white font-nunito font-bold text-sm px-5 py-3 rounded-button hover:bg-forest/90 transition-all shadow-md"
                  >
                    <Upload className="w-4 h-4" /> Upload First Resource
                  </button>
                )}
              </div>
            ) : (
              <div className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  : "space-y-4"
              }>
                {resources.map((resource, i) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    user={user}
                    index={i}
                    onApprove={user.role === "admin" ? handleApprove : undefined}
                    onDelete={
                      user.role === "admin" || user.role === "teacher"
                        ? handleDelete
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Settings panel */}
      {showSettings && (
        <SettingsPanel
          user={user}
          onClose={() => { setShowSettings(false); fetchCurriculumSettings(); }}
        />
      )}

      {/* Upload modal */}
      {showUpload && (
        <UploadForm
          user={user}
          onClose={() => setShowUpload(false)}
          onSuccess={() => { fetchResources(); setShowUpload(false); }}
        />
      )}
    </div>
  );
}