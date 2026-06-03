"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Eye,
  Star,
  Heart,
  Lightbulb,
  Users,
  BookOpen,
  CheckCircle2,
  Sprout,
  Sparkles,
  MessageCircle,
  FileText,
  Music,
  Palette,
  Mic,
  Leaf,
  FlaskConical,
  BookMarked,
  ChevronRight,
  Globe,
  Droplets,
  Sun,
  Clock,
  Calendar,
  Shield,
  Utensils,
  Bus,
  Wifi,
  Building2,
  Waves,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #52B788 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-nursery/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-white/50 text-xs font-poppins mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/80">About Us</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.55 }} className="font-nunito font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
              Built on Care.
              <br />
              <span className="text-nursery">Driven by</span>
              <br />
              Curiosity.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="font-poppins text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              From a small playgroup with a big dream, we&apos;ve grown into a thriving school community that walks with every child from their very first step into learning all the way through Grade School.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3">
              <a href="https://wa.me/2348088292398" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-nursery text-forest font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                Join Our Community <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-nunito font-bold text-sm px-6 py-3 rounded-button hover:bg-white/20 hover:-translate-y-0.5 transition-all">
                Get in Touch
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { emoji: "🌱", value: "5+", label: "Years of excellence" },
              { emoji: "👶", value: "Foundation Stage", label: "Ages 1 – 3" },
              { emoji: "🎒", value: "Key Stage 1", label: "Grade 1 – 2" },
              { emoji: "📚", value: "Key Stage 2", label: "Grade 3 – 5/6" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-card p-5 text-center">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-nunito font-extrabold text-xl text-white mb-1">{item.value}</div>
                <div className="font-poppins text-white/80 text-xs leading-snug">{item.label}</div>
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
// 1. SCHOOL STORY — why the school was founded
// ─────────────────────────────────────────────────────────────────────────────
function SchoolStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Welcome to Thinkers Base Academy</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-6">Our Story</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-nursery" />
            <div className="pl-8">
              <div className="font-nunito font-extrabold text-8xl text-leaf/20 leading-none -mb-4 select-none">"</div>
              <p className="font-nunito font-extrabold text-2xl sm:text-3xl text-forest leading-snug mb-6">
                We started as a small playgroup with a big dream — that every child deserves a school that truly sees them.
              </p>
              <p className="font-poppins text-charcoal/60 text-sm">— Mrs. Joysam Ngene, Founding Principal</p>
            </div>
            <div className="absolute -bottom-4 -right-4 font-nunito font-extrabold text-[120px] text-forest/5 leading-none select-none pointer-events-none">2019</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }} className="space-y-5 font-poppins text-charcoal/80 text-base leading-relaxed">
            <p>
              <span className="font-nunito font-bold text-forest text-xl">Established on 17th September, 2019</span>, Thinkers Base Academy is located at Plot 183A/B Mary Emmanuel Street New GRA Trans-Ekulu, Enugu.
            </p>
            <p>We offer your child the finest international nursery and primary school education in Enugu. Our personalized approach, outstanding teachers and global learning opportunities will support your child to excel at every stage.</p>
            <p>Thinkers Base Academy is a truly inclusive community of learning. We believe that there are <span className="font-nunito font-bold text-leaf">no limits</span> to what our pupils can achieve.</p>
            <p>At TBA, we create a nurturing environment where your child will excel academically, morally, socially and personally — laying the foundation for them to become accomplished critical thinkers and solution providers.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Every child seen", "Learning with joy", "Community first", "Growing together"].map((v) => (
                <span key={v} className="font-nunito font-bold text-xs px-3 py-1.5 rounded-button bg-leaf/15 text-forest">✓ {v}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. MISSION, VISION & VALUES
// ─────────────────────────────────────────────────────────────────────────────
function MissionVisionValues() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cards = [
    {
      icon: Target, title: "Our Mission", color: "#52B788", bg: "#F0FFF4",
      content: "To provide an exceptional, inclusive education that nurtures every child's unique potential — from their very first day in Creche to the moment they step into the world as confident, capable young people.",
      type: "paragraph" as const,
    },
    {
      icon: Eye, title: "Our Vision", color: "#5BA4CF", bg: "#EBF5FF",
      content: "A community where every child — regardless of background, ability or circumstance — has access to outstanding education, genuine care, and the opportunity to discover what makes them extraordinary.",
      type: "paragraph" as const,
    },
    {
      icon: Star, title: "Our Values", color: "#F4D03F", bg: "#FFFDE7",
      items: [
        { icon: Heart, label: "Care", desc: "Every child known and loved" },
        { icon: Lightbulb, label: "Curiosity", desc: "Questions are always welcome" },
        { icon: Users, label: "Community", desc: "We grow stronger together" },
        { icon: CheckCircle2, label: "Integrity", desc: "We say what we do, and do what we say" },
      ],
      type: "list" as const,
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">What Drives Us</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">Mission, Vision & Values</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }} className="rounded-card p-8 shadow-card hover:shadow-card-hover transition-shadow" style={{ backgroundColor: card.bg, borderTop: `4px solid ${card.color}` }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: card.color + "33" }}>
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <h3 className="font-nunito font-extrabold text-forest text-xl mb-4">{card.title}</h3>
              {card.type === "paragraph" ? (
                <p className="font-poppins text-charcoal/75 text-sm leading-relaxed">{card.content}</p>
              ) : (
                <ul className="space-y-3">
                  {card.items!.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: card.color + "33" }}>
                        <item.icon className="w-3.5 h-3.5 text-forest" />
                      </div>
                      <div>
                        <p className="font-nunito font-bold text-forest text-sm">{item.label}</p>
                        <p className="font-poppins text-charcoal/60 text-xs">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. LEARNING PHILOSOPHY
// ─────────────────────────────────────────────────────────────────────────────
function LearningPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const approaches = [
    { icon: Sprout, title: "Play-Based Learning", desc: "We use inquiry-based, objective-based and thematic approaches. Learning through play isn't optional — it's essential to how young minds grow." },
    { icon: BookOpen, title: "Montessori Approach", desc: "Children are active constructors of knowledge. We guide, not dictate — nurturing independence, self-motivation and intrinsic curiosity." },
    { icon: Globe, title: "Global Citizenship", desc: "We prepare compassionate, internationally-minded young people who can contribute to — and help improve — the world around them." },
    { icon: Lightbulb, title: "Critical Thinking", desc: "Every lesson is designed to develop questioning minds that can analyse, evaluate, and arrive at their own thoughtful conclusions." },
    { icon: Palette, title: "Creative Expression", desc: "Art, music, drama and storytelling are core — not extras. Creativity is at the heart of how children process and own knowledge." },
    { icon: Mic, title: "Communication Skills", desc: "From Public Speaking Club to daily discussions, we build confident voices that can articulate ideas with clarity and conviction." },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">How We Teach</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Our Learning Philosophy</h2>
          <p className="font-poppins text-charcoal/65 text-base max-w-2xl mx-auto">We combine the best of Nigerian and British educational traditions — blending rigour with warmth, structure with play, and knowledge with character.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {approaches.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} className="group bg-white rounded-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1" style={{ borderTop: "3px solid #52B788" }}>
              <div className="w-12 h-12 rounded-2xl bg-leaf/12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <a.icon className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-nunito font-bold text-forest text-lg mb-2">{a.title}</h3>
              <p className="font-poppins text-charcoal/65 text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CURRICULUM & KEY STAGES
// ─────────────────────────────────────────────────────────────────────────────
function OurCurriculum() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const keyStages = [
    {
      badge: "🌱 Foundation Stage",
      label: "Foundation",
      color: "#F4D03F",
      bg: "#FEF9E7",
      ageRange: "Ages 1 – 3",
      classes: ["Play Group", "Preschool 1 & 2", "Reception"],
      desc: "EYFS-inspired play-based learning that builds language, motor skills, emotional intelligence and a genuine love of discovery.",
      outcomes: ["Confident communicators", "Early literacy & numeracy", "Social-emotional development"],
    },
    {
      badge: "🎒 Key Stage 1",
      label: "Grade 1 – 2",
      color: "#5BA4CF",
      bg: "#EBF5FB",
      ageRange: "Ages 4 – 6",
      classes: ["Grade 1", "Grade 2"],
      desc: "Structured learning builds strong academic habits while keeping curiosity at the core. Reading, writing and maths come alive through creative projects.",
      outcomes: ["Fluent readers & writers", "Number confidence", "Problem-solving foundations"],
    },
    {
      badge: "📚 Key Stage 2",
      label: "Grade 3 – 5/6",
      color: "#E8845C",
      bg: "#FDF2E9",
      ageRange: "Ages 6 – 12",
      classes: ["Grade 3", "Grade 4", "Grade 5/6"],
      desc: "Expanding subject knowledge, critical analysis and independent thinking. Pupils are comprehensively prepared for secondary school and life beyond.",
      outcomes: ["Subject mastery", "Critical & analytical thinking", "Leadership & presentation skills"],
    },
  ];

  const curriculumFeatures = [
    { icon: BookOpen, title: "Nigerian & British Blend", desc: "Rich integration of both curricula with rich extracurricular activities" },
    { icon: Globe, title: "International Standards", desc: "Meets both Nigerian and international educational standards" },
    { icon: Sparkles, title: "EYFS Framework", desc: "British Early Years Foundation Stage for foundation learners" },
    { icon: Lightbulb, title: "Inquiry-Based Learning", desc: "Thematic, objective-based and project-driven approaches" },
  ];

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Academic Excellence</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">Our Curriculum & Key Stages</h2>
          <p className="font-poppins text-white/75 text-base max-w-2xl mx-auto">A rich blend of Nigerian and British curriculum with extracurricular activities to suit every child&apos;s interest and learning style.</p>
        </motion.div>

        {/* Feature pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {curriculumFeatures.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-white/10 border border-white/15 rounded-card p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-nursery/20 flex items-center justify-center mx-auto mb-3">
                <f.icon className="w-5 h-5 text-nursery" />
              </div>
              <h4 className="font-nunito font-bold text-white text-sm mb-1">{f.title}</h4>
              <p className="font-poppins text-white/60 text-xs leading-snug">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Stage cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyStages.map((stage, i) => (
            <motion.div key={stage.badge} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }} className="rounded-card overflow-hidden shadow-lg" style={{ backgroundColor: stage.bg, borderTop: `4px solid ${stage.color}` }}>
              <div className="p-7">
                <span className="inline-block font-nunito font-bold text-xs px-3 py-1 rounded-full mb-4" style={{ backgroundColor: stage.color + "33", color: "#1B4332" }}>{stage.badge}</span>
                <h3 className="font-nunito font-extrabold text-forest text-xl mb-1">{stage.label}</h3>
                <p className="font-poppins text-forest/55 text-xs font-semibold mb-4">{stage.ageRange}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {stage.classes.map((c) => (
                    <span key={c} className="font-poppins text-xs px-2.5 py-0.5 rounded-full" style={{ backgroundColor: stage.color + "33", color: "#1B4332" }}>{c}</span>
                  ))}
                </div>
                <p className="font-poppins text-charcoal/70 text-sm leading-relaxed mb-5">{stage.desc}</p>
                <div className="space-y-2">
                  {stage.outcomes.map((o) => (
                    <div key={o} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-leaf flex-shrink-0" />
                      <span className="font-poppins text-xs text-charcoal/70">{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CLASSY PRINCIPLE
// ─────────────────────────────────────────────────────────────────────────────
function OurPrinciple() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const classyValues = [
    { letter: "C", word: "Communicators", desc: "Express thoughts clearly and listen actively" },
    { letter: "L", word: "Lifelong Learners", desc: "Never stop learning and growing" },
    { letter: "A", word: "Academic Achievers", desc: "Strive for excellence in all subjects" },
    { letter: "S", word: "Social Contributors", desc: "Make positive contributions to society" },
    { letter: "S", word: "Strong & Exceptional", desc: "Healthy body and mind, outstanding character" },
    { letter: "Y", word: "Young Role Models", desc: "Inspire others through good example" },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Our Guiding Principle</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Every Child is UNIQUE and CLASSY</h2>
          <p className="font-poppins text-charcoal/65 text-base max-w-2xl mx-auto">We expose them to well-planned activities which stimulate their interest and their natural quest for knowledge.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {classyValues.map((item, i) => (
            <motion.div key={item.letter + i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-white rounded-card p-6 text-center shadow-card hover:shadow-card-hover transition-shadow">
              <div className="w-14 h-14 rounded-full bg-forest mx-auto mb-4 flex items-center justify-center">
                <span className="font-nunito font-extrabold text-2xl text-white">{item.letter}</span>
              </div>
              <h3 className="font-nunito font-bold text-forest text-sm mb-1">{item.word}</h3>
              <p className="font-poppins text-charcoal/55 text-xs leading-snug">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. EDUCATIONAL APPROACH / STRATEGY
// ─────────────────────────────────────────────────────────────────────────────
function OurStrategy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const strategies = [
    "Provide opportunities that stimulate interest and imagination",
    "Make every child feel valued as an individual",
    "Nurture every child to become a happy, healthy, enthusiastic and confident learner",
    "Raise independent, curious, creative and resilient learners",
    "Inspire our pupils to be courageous",
    "Encourage each child to be the very best they can be",
    "Mould them to challenge themselves and take risks",
    "Raise pupils who are exceptional in every area of life",
    "Enhance their ability to think critically and ask questions",
  ];

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Our Approach</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">Educational Strategy</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategies.map((strategy, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-card p-5 flex items-start gap-3 hover:bg-white/15 transition-colors">
              <div className="w-8 h-8 rounded-full bg-nursery/25 flex items-center justify-center flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-nursery" />
              </div>
              <p className="font-poppins text-white text-sm leading-relaxed">{strategy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. SCHOOL ENVIRONMENT & FACILITIES
// ─────────────────────────────────────────────────────────────────────────────
function OurFacilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const facilities = [
    { icon: Building2, title: "Child-Friendly Campus", desc: "Safe, attractive, comfortable and hygienic facilities designed for young learners" },
    { icon: Shield, title: "24/7 Security", desc: "Fenced premises, locked gates, security personnel & 50+ CCTV cameras" },
    { icon: Wifi, title: "Smart Classrooms", desc: "Air-conditioned rooms with modern technology integration" },
    { icon: BookOpen, title: "Library / ICT Room", desc: "Well-stocked library and fully equipped computer room" },
    { icon: Utensils, title: "Kitchen Facility", desc: "Well-equipped kitchen for culinary club lessons" },
    { icon: Bus, title: "AC Transportation", desc: "Air-conditioned bus for safe pickup and drop-off" },
    { icon: Sprout, title: "Playground", desc: "Well-equipped, safe playground for physical development and exploration" },
    { icon: Droplets, title: "Steady Water Supply", desc: "24-hour clean, steady water supply throughout the campus" },
    { icon: Sun, title: "Solar Electricity", desc: "24-hour solar-powered electricity — no power cuts, no interruptions" },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Our Infrastructure</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">World-Class Facilities</h2>
          <p className="font-poppins text-charcoal/65 text-base max-w-2xl mx-auto">Our world-class facility is child-friendly and of the highest quality — safe, attractive, comfortable and hygienic.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {facilities.map((facility, i) => (
            <motion.div key={facility.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.5 }} className="group bg-white rounded-card p-5 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-leaf/12 flex items-center justify-center mb-4 group-hover:bg-leaf/20 transition-colors">
                <facility.icon className="w-5 h-5 text-forest" />
              </div>
              <h3 className="font-nunito font-bold text-forest text-sm mb-1.5">{facility.title}</h3>
              <p className="font-poppins text-charcoal/60 text-xs leading-relaxed">{facility.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. EXTRA CURRICULAR (swimming added)
// ─────────────────────────────────────────────────────────────────────────────
function ExtraCurricular() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const activities = [
    { icon: Music,        name: "Music & Dance Club" },
    { icon: Utensils,     name: "Culinary Club" },
    { icon: FlaskConical, name: "Science Club" },
    { icon: BookMarked,   name: "Bible Explorers" },
    { icon: Mic,          name: "Public Speaking Club" },
    { icon: Leaf,         name: "Farmers Club" },
    { icon: Palette,      name: "Art & Craft" },
    { icon: Waves,        name: "Swimming" },
  ];

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Beyond the Classroom</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">Extra Curricular Activities</h2>
          <p className="font-poppins text-white/75 text-base max-w-xl mx-auto">8 clubs and activities to nurture every child&apos;s interests, talents and passions.</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {activities.map((activity, i) => (
            <motion.div key={activity.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} className="group bg-white/12 backdrop-blur-sm border border-white/15 rounded-card p-4 text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-nursery/25 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <activity.icon className="w-6 h-6 text-nursery" />
              </div>
              <p className="font-poppins text-white text-xs leading-snug">{activity.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. ACADEMIC CALENDAR — updated hours Mon–Wed 8–2pm, Thu–Fri 8–3pm
// ─────────────────────────────────────────────────────────────────────────────
function AcademicCalendar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">School Schedule</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Academic Calendar & Hours</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Calendar,
              title: "Academic Year",
              desc: "Starts in September and ends in July. Divided into three terms with short holidays in between.",
            },
            {
              icon: Clock,
              title: "School Hours",
              lines: [
                "Monday – Wednesday",
                "8:00am – 3:00pm",
                "",
                "Thursday – Friday",
                "8:00am – 2:00pm",
                "",
                "Children should arrive before 8:00am.",
              ],
            },
            {
              icon: Calendar,
              title: "School Days",
              desc: "Monday to Friday, except on public holidays and school holidays. Our dedicated team is available throughout the full school day.",
            },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-white rounded-card p-7 shadow-card">
              <item.icon className="w-10 h-10 text-leaf mb-4" />
              <h3 className="font-nunito font-bold text-forest text-lg mb-3">{item.title}</h3>
              {"lines" in item ? (
                <div className="font-poppins text-charcoal/70 text-sm leading-relaxed space-y-0.5">
                  {item.lines!.map((line, j) =>
                    line === "" ? <div key={j} className="h-2" /> :
                    line.includes("–") && !line.includes(":") ? (
                      <p key={j} className="font-nunito font-bold text-forest text-sm">{line}</p>
                    ) : (
                      <p key={j}>{line}</p>
                    )
                  )}
                </div>
              ) : (
                <p className="font-poppins text-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// 11. TIMELINE
// ─────────────────────────────────────────────────────────────────────────────
const milestones = [
  { year: "2019", title: "Thinkers Base Academy Founded", emoji: "🌱", color: "#F4D03F", desc: "Established on 17th September 2019 at New GRA Trans-Ekulu, Enugu. We opened as a Play Group — small but with a very big dream." },
  { year: "2020", title: "Preschool 1, 2 & Reception Open", emoji: "👶", color: "#F4D03F", desc: "Foundation Stage grows to include Preschool 1, Preschool 2 and Reception, bringing the full EYFS-inspired early years programme to life." },
  { year: "2021", title: "Key Stage 1 Launches", emoji: "🎒", color: "#5BA4CF", desc: "Grades 1, 2 and 3 open. Families who started with us in 2019 continue their journey seamlessly into primary education." },
  { year: "2021", title: "Extra-Curricular Clubs Launch", emoji: "🎭", color: "#5BA4CF", desc: "Full club programme launches: Music & Dance, Culinary, Science, Bible Explorers, Public Speaking, Farmers Club, Art & Craft, and Swimming." },
  { year: "2022–23", title: "Grades 4 & 5 Added", emoji: "📚", color: "#E8845C", desc: "Key Stage 2 is completed. Grades 4 and 5/6 give every pupil a full primary journey from Creche to graduation." },
  { year: "2024", title: "First Grade School Graduation 🎓", emoji: "🏆", color: "#E8845C", desc: "A landmark milestone — our very first graduating class crosses the stage. The pupils who started as a Play Group in 2019 graduated in 2024." },
];

function TreeTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Our Journey</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">How We Grew 🌳</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-lg mx-auto">From a Play Group in 2019 to a full Playgroup, Pre School and Grade School — with our first graduating class in 2024.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-leaf/30 sm:-translate-x-px" />
          <div className="space-y-8">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              const isActive = active === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: isLeft ? -32 : 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }} className={`relative flex items-start gap-4 sm:gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <button
                    onClick={() => setActive(isActive ? null : i)}
                    className={`flex-1 ml-14 sm:ml-0 text-left bg-white border rounded-card p-5 shadow-card transition-all duration-300 cursor-pointer ${isLeft ? "sm:mr-12" : "sm:ml-12"} ${isActive ? "border-leaf shadow-card-hover" : "border-gray-100 hover:border-leaf/40 hover:shadow-card-hover"}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{m.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-nunito font-extrabold text-sm" style={{ color: m.color }}>{m.year}</span>
                          <span className="font-nunito font-bold text-forest text-sm">{m.title}</span>
                        </div>
                        <motion.p initial={false} animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: 0.3 }} className="font-poppins text-charcoal/70 text-xs leading-relaxed overflow-hidden">{m.desc}</motion.p>
                        {!isActive && <p className="font-poppins text-charcoal/40 text-xs mt-1">Tap to read more</p>}
                      </div>
                    </div>
                  </button>
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-4 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-sm z-10 shadow-md" style={{ backgroundColor: m.color }}>
                    {m.emoji}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. PRINCIPAL'S MESSAGE
// ─────────────────────────────────────────────────────────────────────────────
function PrincipalsMessage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">A Message from Our Head</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">A Word of Gratitude</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="max-w-4xl mx-auto">
          <div className="bg-white/10 border border-white/15 rounded-[24px] p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col items-center">
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl shadow-black/30 mb-4">
                  <Image src="/images/Mrs Joysam2.jpg" alt="Mrs. Joysam Ngene — School Head, Thinkers Base Academy" fill className="object-cover object-top" />
                </div>
                <p className="font-nunito font-bold text-white text-base text-center">Mrs. Joysam Ngene</p>
                <p className="font-poppins text-leaf text-xs text-center">School Head & Founding Principal</p>
              </div>
              <div className="md:col-span-2">
                <MessageCircle className="w-10 h-10 text-nursery mb-5" />
                <p className="font-poppins text-white text-lg leading-relaxed mb-5">
                  We are grateful to God for preserving our lives and we thank our parents for cooperating with us towards achieving the mission and vision of the school.
                </p>
                <p className="font-poppins text-white/80 text-base leading-relaxed">
                  It is our collective dedication — staff, parents and pupils — that makes Thinkers Base Academy the warm, thriving community it is today. We look forward to many more years of growth, learning and excellence together.
                </p>
                <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-2">
                  {[1,2,3,4,5].map((s) => (<Star key={s} className="w-4 h-4 text-nursery fill-nursery" />))}
                  <span className="font-poppins text-white/50 text-xs ml-2">Founding Principal, Thinkers Base Academy</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. PHOTO WALL
// ─────────────────────────────────────────────────────────────────────────────
const schoolLifePhotos = [
  { src: "/images/bts2.jpg",                              label: "In the Classroom",   size: "col-span-2 row-span-2" },
  { src: "/images/bts3.jpg",                              label: "Playtime",           size: "" },
  { src: "/images/students displaying handcraft.jpeg",    label: "Art & Craft",        size: "" },
  { src: "/images/student with mini microscope.jpeg",     label: "Science Club",       size: "" },
  { src: "/images/Students in swimmingpool.jpeg",         label: "Swimming",           size: "" },
  { src: "/images/students holding adire.jpeg",           label: "Art & Craft",       size: "col-span-2" },
  { src: "/images/students in traditional atire.jpeg",    label: "Traditional Attire", size: "" },
  { src: "/images/Grade 3 pupils with computer.jpeg",     label: "Digital Learning",   size: "" },
];

function PhotoWall() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">School Environment</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">A School Full of Life 📸</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-md mx-auto">Moments from our classrooms, playgrounds, pools and celebrations.</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 auto-rows-[160px]">
          {schoolLifePhotos.map((photo, i) => (
            <motion.div key={photo.label} initial={{ opacity: 0, scale: 0.93 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.06, duration: 0.4 }} whileHover={{ scale: 1.02, transition: { duration: 0.2 } }} className={`${photo.size} relative rounded-2xl overflow-hidden shadow-card border-2 border-white group`}>
              <Image src={photo.src} alt={`${photo.label} — Thinkers Base Academy`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-nunito font-bold text-white text-sm">{photo.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. CTA
// ─────────────────────────────────────────────────────────────────────────────
function AboutCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-16 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="bg-forest rounded-[24px] p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-leaf/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-nursery/10 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <span className="text-4xl mb-4 block">🤝</span>
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-white mb-3">Come and See It for Yourself</h2>
            <p className="font-poppins text-white/80 text-sm mb-7 max-w-md mx-auto leading-relaxed">No website can fully show you what Thinkers Base Academy feels like. Book a visit and experience our community firsthand.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-nursery text-forest font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                Book a School Visit <ArrowRight className="w-4 h-4" />
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
// Order: Story → Mission/Vision → Philosophy → Curriculum/Key Stages
//        → CLASSY → Strategy → Facilities → Extra-curricular
//        → Calendar → Policies → Timeline → Principal → Photo Wall → CTA
// (No team/leadership section per brief)
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SchoolStory />
      <MissionVisionValues />
      <LearningPhilosophy />
      <OurCurriculum />
      <OurPrinciple />
      <OurStrategy />
      <OurFacilities />
      <ExtraCurricular />
      <AcademicCalendar />
      <TreeTimeline />
      <PrincipalsMessage />
      <PhotoWall />
      <AboutCta />
    </>
  );
}