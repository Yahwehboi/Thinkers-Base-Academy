"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, BookOpen } from "lucide-react";
import type { Role } from "@/data/curriculumConstants";

export type AuthUser = {
  id: string;
  role: Role;
  name: string;
  username: string;
  token: string;
  classes?: string[]; // for parents — assigned classes
};

type Props = {
  onLogin: (user: AuthUser) => void;
};

const roles = [
  {
    role: "admin" as Role,
    label: "Admin",
    emoji: "🔐",
    desc: "Full access — approve, manage and organise all resources",
    color: "#E8845C",
  },
  {
    role: "teacher" as Role,
    label: "Teacher",
    emoji: "👩‍🏫",
    desc: "Upload and manage your own curriculum resources",
    color: "#5BA4CF",
  },
  {
    role: "parent" as Role,
    label: "Parent / Student",
    emoji: "👨‍👩‍👧",
    desc: "View and download approved curriculum materials",
    color: "#52B788",
  },
];

export default function CurriculumLogin({ onLogin }: Props) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [name, setName]                 = useState("");
  const [username, setUsername]         = useState("");
  const [password, setPassword]         = useState("");
  const [accessCode, setAccessCode]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);

  function reset() {
    setSelectedRole(null);
    setError("");
    setPassword("");
    setUsername("");
    setAccessCode("");
    setName("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ── Parent login — access code is stored as username in DB ──
      if (selectedRole === "parent") {
        const res  = await fetch(
          `/api/users?action=parentLogin&code=${encodeURIComponent(accessCode)}`
        );
        const data = await res.json();

        if (!data.success) {
          setError(data.error || "Invalid access code. Please try again.");
          setLoading(false);
          return;
        }

        onLogin({
          id:       data.user.id,
          role:     data.user.role,
          name:     name || data.user.name,
          username: data.user.username,
          token:    data.token,
          classes:  data.user.classes || [],
        });
        return;
      }

      // ── Admin / Teacher — username + password ──
      const res  = await fetch(
        `/api/users?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Confirm role matches selection
      if (data.user.role !== selectedRole) {
        setError(
          `This account is not registered as a ${selectedRole}. Please select the correct role.`
        );
        setLoading(false);
        return;
      }

      onLogin({
        id:       data.user.id,
        role:     data.user.role,
        name:     data.user.name,
        username: data.user.username,
        token:    data.token,
        classes:  data.user.classes || [],
      });

    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-forest rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-nunito font-extrabold text-3xl text-forest mb-2">
            Curriculum Hub
          </h1>
          <p className="font-poppins text-charcoal/60 text-sm">
            Thinkers Base Academy — Learning Resources Portal
          </p>
        </motion.div>

        {/* Step 1 — Role selection */}
        {!selectedRole ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <p className="font-nunito font-bold text-forest text-center text-base mb-5">
              Who are you logging in as?
            </p>
            <div className="space-y-3">
              {roles.map((r, i) => (
                <motion.button
                  key={r.role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  onClick={() => setSelectedRole(r.role)}
                  className="w-full flex items-center gap-4 bg-white rounded-card p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 text-left group"
                  style={{ borderLeft: `4px solid ${r.color}` }}
                >
                  <span className="text-3xl">{r.emoji}</span>
                  <div className="flex-1">
                    <p className="font-nunito font-bold text-forest text-base">{r.label}</p>
                    <p className="font-poppins text-charcoal/55 text-xs leading-snug">{r.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>
          </motion.div>

        ) : (
          // Step 2 — Login form
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-card p-8 shadow-card">

              {/* Back */}
              <button
                onClick={reset}
                className="flex items-center gap-1.5 font-poppins text-xs text-charcoal/50 hover:text-forest transition-colors mb-6"
              >
                ← Back to role selection
              </button>

              {/* Role badge */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                <span className="text-2xl">
                  {roles.find((r) => r.role === selectedRole)?.emoji}
                </span>
                <div>
                  <p className="font-nunito font-bold text-forest text-base">
                    {roles.find((r) => r.role === selectedRole)?.label}
                  </p>
                  <p className="font-poppins text-charcoal/50 text-xs">
                    Enter your details below
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Admin / Teacher fields */}
                {selectedRole !== "parent" && (
                  <>
                    <div>
                      <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                        Username *
                      </label>
                      <input
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={selectedRole === "admin" ? "admin" : "e.g. mrs.okafor"}
                        className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-gray-50/50"
                      />
                    </div>

                    <div>
                      <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          required
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full font-poppins text-sm px-4 py-3 pr-11 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-gray-50/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-forest transition-colors"
                        >
                          {showPassword
                            ? <EyeOff className="w-4 h-4" />
                            : <Eye    className="w-4 h-4" />
                          }
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Parent fields — access code only */}
                {selectedRole === "parent" && (
                  <>
                    <div>
                      <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                        Your Name{" "}
                        <span className="text-charcoal/40">(optional)</span>
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Mr. Chukwu"
                        className="w-full font-poppins text-sm px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-gray-50/50"
                      />
                    </div>

                    <div>
                      <label className="font-poppins text-xs font-semibold text-charcoal/60 block mb-1.5">
                        Access Code *
                      </label>
                      <div className="relative">
                        <input
                          required
                          type={showPassword ? "text" : "password"}
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                          placeholder="Enter your access code"
                          className="w-full font-poppins text-sm px-4 py-3 pr-11 rounded-xl border-2 border-gray-100 focus:border-leaf focus:outline-none transition-colors bg-gray-50/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-forest transition-colors"
                        >
                          {showPassword
                            ? <EyeOff className="w-4 h-4" />
                            : <Eye    className="w-4 h-4" />
                          }
                        </button>
                      </div>
                    </div>

                    <div className="bg-leaf/10 border border-leaf/20 rounded-xl p-4">
                      <p className="font-poppins text-forest text-xs leading-relaxed">
                        <span className="font-nunito font-bold">Access code</span> is
                        provided by the school. Contact the admin if you don&apos;t have one.
                      </p>
                    </div>
                  </>
                )}

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="font-poppins text-red-600 text-xs">{error}</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-forest text-white font-nunito font-extrabold text-sm px-6 py-3.5 rounded-button hover:bg-forest/90 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    <>Enter Curriculum Hub <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </div>

            <p className="font-poppins text-charcoal/40 text-xs text-center mt-4">
              Forgot your password? Contact the school admin.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}