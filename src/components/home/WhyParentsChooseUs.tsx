"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, GraduationCap, Wifi, Palette, Users, BookHeart } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    color: "#52B788",
    title: "Safe & Secure Environment",
    desc: "Fenced campus, locked gates, 24-hour security personnel, and 50+ CCTV cameras so your child is always protected.",
  },
  {
    icon: GraduationCap,
    color: "#5BA4CF",
    title: "Qualified & Caring Teachers",
    desc: "24 dedicated educators who know every pupil by name — and teach to each child's unique strengths and pace.",
  },
  {
    icon: Wifi,
    color: "#E8845C",
    title: "Technology-Enabled Learning",
    desc: "Smart, air-conditioned classrooms with modern tech, a fully-stocked ICT room, and 24-hour solar electricity.",
  },
  {
    icon: Palette,
    color: "#F4D03F",
    title: "Creative Development",
    desc: "Art, music, drama, STEM labs and 8 clubs ensure every child discovers and develops their unique talent.",
  },
  {
    icon: Users,
    color: "#52B788",
    title: "Small Class Attention",
    desc: "Low pupil-to-teacher ratios mean no child gets left behind. Every voice is heard, every question welcomed.",
  },
  {
    icon: BookHeart,
    color: "#5BA4CF",
    title: "Values-Based Learning",
    desc: "We don't just build academic achievers — we build CLASSY young leaders: Communicators, Lifelong Learners, and Social Contributors.",
  },
];

export default function WhyParentsChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #1B4332 100%)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-leaf/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-nursery/8 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">
            Trusted by Families
          </span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">
            Why Parents Choose Thinkers Base
          </h2>
          <p className="font-poppins text-white/70 text-base max-w-xl mx-auto">
            From safety to creativity, from technology to values — here&apos;s what makes us different.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white/10 backdrop-blur-sm border border-white/15 rounded-card p-7 hover:bg-white/15 hover:border-white/25 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: reason.color + "25" }}
              >
                <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
              </div>
              <h3 className="font-nunito font-bold text-white text-lg mb-2">{reason.title}</h3>
              <p className="font-poppins text-white/70 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-14 flex flex-wrap justify-center gap-8 text-center border-t border-white/10 pt-10"
        >
          {[
            { value: "98%", label: "Parent satisfaction" },
            { value: "100+", label: "Happy families" },
            { value: "2019", label: "Est. since" },
            { value: "8", label: "Clubs & activities" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-nunito font-extrabold text-2xl text-nursery">{item.value}</span>
              <span className="font-poppins text-white/55 text-xs mt-0.5">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}