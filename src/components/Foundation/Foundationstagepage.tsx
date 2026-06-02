"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Palette,
  BookOpen,
  Users,
  Star,
  Smile,
  Sun,
} from "lucide-react";

const COLOR = "#F4D03F";

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #52B788 100%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" style={{ backgroundColor: COLOR + "20" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-white/50 text-xs font-poppins mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/" className="hover:text-white transition-colors">Our School</Link>
              <span>/</span>
              <span className="text-white/80">Foundation Stage</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 font-nunito font-bold text-sm px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: COLOR, color: "#1B4332" }}>
              🌱 Foundation Stage
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }} className="font-nunito font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
              Little Learners.
              <br />
              <span style={{ color: COLOR }}>Big Hearts.</span>
              <br />
              Bright Futures.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="font-poppins text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              Our Foundation Stage is a warm, joyful space where children aged 1–5 take their very first steps into learning through play, love and guided discovery.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3">
              <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg" style={{ backgroundColor: COLOR, color: "#1B4332" }}>
                Enquire Now <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/admissions" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-nunito font-bold text-sm px-6 py-3 rounded-button hover:bg-white/20 transition-all">
                Apply Now
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { emoji: "👶", value: "Ages 1–5", label: "Our age range" },
              { emoji: "🎮", value: "Play-Based", label: "Learning approach" },
              { emoji: "📋", value: "EYFS", label: "Curriculum framework" },
              { emoji: "❤️", value: "Nurturing", label: "Safe & caring space" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-card p-5 text-center">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-nunito font-extrabold text-lg text-white mb-1">{item.value}</div>
                <div className="font-poppins text-white/70 text-xs">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14">
          <path d="M0,28 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill="#F8FFF4" />
        </svg>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLASSES
// ─────────────────────────────────────────────────────────────────────────────
function Classes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const classes = [
    { name: "Play Group", ages: "Ages 1 – 2", desc: "Gentle introduction to structured play and social interaction. Focused on motor skills, sensory exploration and emotional security.", emoji: "🧸" },
    { name: "Preschool 1", ages: "Ages 2 – 3", desc: "Language development, early literacy foundations, creative play and beginning numeracy through songs, stories and games.", emoji: "🌈" },
    { name: "Preschool 2", ages: "Ages 3 – 4", desc: "Building confidence and independence. Introduction to letters, numbers, colours and shapes through hands-on thematic learning.", emoji: "✏️" },
    { name: "Reception", ages: "Ages 4 – 5", desc: "A bridge between early years and formal learning. Children develop reading readiness, number sense, social confidence and the independence needed for Key Stage 1.", emoji: "🎓" },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Our Classes</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Foundation Stage Classes</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-xl mx-auto">Each class is carefully structured for your child&apos;s age and developmental stage.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {classes.map((cls, i) => (
            <motion.div key={cls.name} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.5 }} className="bg-white rounded-card p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `4px solid ${COLOR}` }}>
              <div className="text-4xl mb-4">{cls.emoji}</div>
              <h3 className="font-nunito font-extrabold text-forest text-xl mb-1">{cls.name}</h3>
              <span className="inline-block font-poppins text-xs font-semibold px-2.5 py-1 rounded-full mb-4" style={{ backgroundColor: COLOR + "33", color: "#1B4332" }}>{cls.ages}</span>
              <p className="font-poppins text-charcoal/65 text-sm leading-relaxed">{cls.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHAT CHILDREN LEARN
// ─────────────────────────────────────────────────────────────────────────────
function WhatTheyLearn() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const areas = [
    { icon: BookOpen, title: "Language & Literacy", desc: "Phonics, listening, speaking, early reading and love of stories and books." },
    { icon: Star, title: "Numeracy", desc: "Counting, shapes, patterns, sorting and early number sense through play." },
    { icon: Palette, title: "Expressive Arts", desc: "Drawing, painting, music, drama and movement for creative self-expression." },
    { icon: Users, title: "Personal, Social & Emotional", desc: "Sharing, turn-taking, empathy, self-confidence and emotional regulation." },
    { icon: Sun, title: "Understanding the World", desc: "Science, nature, technology and cultural awareness through exploration." },
    { icon: Smile, title: "Physical Development", desc: "Gross and fine motor skills, outdoor play, health and body awareness." },
  ];

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">EYFS Framework</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">What Your Child Will Learn</h2>
          <p className="font-poppins text-white/75 text-base max-w-2xl mx-auto">Our Foundation Stage curriculum covers all seven areas of the Early Years Foundation Stage — the same framework used in top British early years schools.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area, i) => (
            <motion.div key={area.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} className="group bg-white/10 border border-white/15 rounded-card p-6 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: COLOR + "33" }}>
                <area.icon className="w-6 h-6" style={{ color: COLOR }} />
              </div>
              <h3 className="font-nunito font-bold text-white text-lg mb-2">{area.title}</h3>
              <p className="font-poppins text-white/70 text-sm leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHY PARENTS CHOOSE FOUNDATION STAGE
// ─────────────────────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const reasons = [
    "Warm, experienced teachers trained in early childhood development",
    "Low pupil-to-teacher ratios — every child is known and nurtured individually",
    "Safe, child-proofed and beautifully designed Foundation Stage classrooms",
    "Daily routines that build security, confidence and independence",
    "Regular parent communication — you always know how your child is doing",
    "Smooth transition pathway from Foundation Stage through to Pre School and Grade School",
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Why TBA Foundation Stage</span>
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-6">Your Youngest Child, in Safe Hands</h2>
            <p className="font-poppins text-charcoal/70 text-base leading-relaxed mb-8">Leaving your child for the first time is a big moment. We take that trust seriously. Our Foundation Stage team provides the same love, warmth and attention you give at home — plus the structure and stimulation that sets your child up for life.</p>
            <ul className="space-y-3">
              {reasons.map((reason, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                  <span className="font-poppins text-charcoal/75 text-sm leading-relaxed">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
            <div className="relative h-96 rounded-[24px] overflow-hidden shadow-xl">
              <Image src="/images/P2.webp" alt="Foundation Stage children at Thinkers Base Academy" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-400 fill-red-400" />
                <div>
                  <p className="font-nunito font-extrabold text-forest text-lg leading-none">Ages 1–5</p>
                  <p className="font-poppins text-charcoal/55 text-xs mt-0.5">Foundation Stage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────
function Cta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-16 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="bg-forest rounded-[24px] p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ backgroundColor: COLOR + "20" }} />
          <div className="relative">
            <span className="text-5xl mb-4 block">🌱</span>
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-white mb-3">Ready to Take the First Step?</h2>
            <p className="font-poppins text-white/75 text-sm mb-7 max-w-md mx-auto leading-relaxed">Spaces are limited. Contact us today to find out about availability and to arrange a visit to our Foundation Stage.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg" style={{ backgroundColor: COLOR, color: "#1B4332" }}>
                Enquire via WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/admissions" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-nunito font-bold text-sm px-6 py-3 rounded-button hover:bg-white/20 transition-all">
                View Admissions
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────
export default function FoundationStagePage() {
  return (
    <>
      <Hero />
      <Classes />
      <WhatTheyLearn />
      <WhyChooseUs />
      <Cta />
    </>
  );
}