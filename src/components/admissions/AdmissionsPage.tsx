"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Calendar,
  Phone,
  Mail,
  ClipboardList,
  HelpCircle,
  ChevronDown,
  Users,
  BookOpen,
  Star,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function AdmissionsHero() {
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
              <span className="text-white/80">Admissions</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.55 }} className="font-nunito font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
              Begin Your
              <br />
              <span className="text-nursery">Child&apos;s Journey</span>
              <br />
              With Us.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="font-poppins text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              We welcome applications for all stages — Playgroup, Pre School and Grade School. The process is simple, personal and designed with your family in mind.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3">
              <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-nursery text-forest font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                Apply via WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:+2348037134462" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-nunito font-bold text-sm px-6 py-3 rounded-button hover:bg-white/20 hover:-translate-y-0.5 transition-all">
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { emoji: "🌱", value: "Foundation Stage", label: "Ages 1 – 4 • Playgroup to Reception" },
              { emoji: "🎒", value: "Key Stage 1", label: "Ages 4 – 6 • Grade 1 – 2" },
              { emoji: "📚", value: "Key Stage 2", label: "Ages 6 – 12 • Grade 3 – 5/6" },
              { emoji: "📅", value: "Sept", label: "New term begins every September" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-card p-5 text-center">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-nunito font-extrabold text-lg text-white mb-1">{item.value}</div>
                <div className="font-poppins text-white/70 text-xs leading-snug">{item.label}</div>
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
// STAGE SELECTOR
// ─────────────────────────────────────────────────────────────────────────────
const stageInfo = [
  {
    id: "Foundation Stage",
    emoji: "🌱",
    label: "Foundation",
    color: "#F4D03F",
    bg: "#FEF9E7",
    ageRange: "Ages 1 – 4",
    classes: ["Play Group", "Preschool 1", "Preschool 2", "Reception"],
    description: "Our Foundation Stage is a warm, nurturing environment where your youngest child begins their learning journey through play, exploration and guided discovery.",
    requirements: [
      "Birth certificate or age declaration",
      "Immunization card (up to date)",
      "Passport photograph (2 copies)",
      "Parent/guardian valid ID",
      "Completed admission form",
    ],
    approach: "Play-based, EYFS-inspired learning with a strong focus on language, motor skills and emotional development.",
  },

  {
    id: "gradeschool",
    emoji: "📚",
    label: "Grade School",
    color: "#E8845C",
    bg: "#FDF2E9",
    ageRange: "Ages 6 – 12",
    classes: ["Grade 1", "Grade 2","Grade 3", "Grade 4", "Grade 5", "Grade 5/6"],
    description: "Grade school pupils are ambitious, supported learners who grow as critical thinkers and are comprehensively prepared for secondary school and beyond.",
    requirements: [
      "Birth certificate or age declaration",
      "Last two terms' school reports",
      "Passport photograph (2 copies)",
      "Parent/guardian valid ID",
      "Completed admission form",
      "Entrance assessment (core subjects)",
      "Transfer certificate (if from another school)",
    ],
    approach: "Subject mastery, independent thinking and leadership development. Pupils are stretched academically and supported personally.",
  },
];

function StageSelector() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState("Foundation Stage");
  const stage = stageInfo.find((s) => s.id === selected)!;

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Choose a Stage</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Which Stage is Your Child In?</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-xl mx-auto">Select a stage below to see the specific requirements and what to expect.</p>
        </motion.div>

        {/* Stage tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {stageInfo.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className="flex items-center gap-2 font-nunito font-bold text-sm px-5 py-2.5 rounded-button transition-all duration-200 border-2"
              style={{
                backgroundColor: selected === s.id ? s.color : "transparent",
                borderColor: s.color,
                color: selected === s.id ? "#1B4332" : "#1B4332",
                opacity: selected === s.id ? 1 : 0.6,
              }}
            >
              {s.emoji} {s.label}
              <span className="font-poppins font-normal text-xs">({s.ageRange})</span>
            </button>
          ))}
        </div>

        {/* Stage detail */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Left — info */}
          <div className="rounded-card p-8 shadow-card" style={{ backgroundColor: stage.bg, borderTop: `4px solid ${stage.color}` }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">{stage.emoji}</span>
              <div>
                <h3 className="font-nunito font-extrabold text-forest text-2xl">{stage.label}</h3>
                <p className="font-poppins text-forest/55 text-sm">{stage.ageRange}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {stage.classes.map((c) => (
                <span key={c} className="font-poppins text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: stage.color + "44", color: "#1B4332" }}>{c}</span>
              ))}
            </div>

            <p className="font-poppins text-charcoal/75 text-sm leading-relaxed mb-5">{stage.description}</p>

            <div className="bg-white/60 rounded-xl p-4 border border-white">
              <p className="font-nunito font-bold text-forest text-sm mb-1">Our Approach</p>
              <p className="font-poppins text-charcoal/65 text-xs leading-relaxed">{stage.approach}</p>
            </div>
          </div>

          {/* Right — requirements */}
          <div className="bg-white rounded-card p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-nunito font-bold text-forest text-lg">What You&apos;ll Need</h4>
            </div>
            <ul className="space-y-3 mb-8">
              {stage.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                  <span className="font-poppins text-charcoal/75 text-sm">{req}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/2348088292398"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full justify-center font-nunito font-extrabold text-sm px-6 py-3.5 rounded-button bg-forest text-white hover:bg-forest/90 hover:-translate-y-0.5 transition-all shadow-md"
            >
              Apply for {stage.label} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO APPLY — 5-step flow
// ─────────────────────────────────────────────────────────────────────────────
const steps = [
  { number: "01", icon: Phone, title: "Get in Touch", desc: "Call or WhatsApp us to express your interest. We'll answer all your questions and tell you about available spaces." },
  { number: "02", icon: FileText, title: "Collect Admission Form", desc: "Visit the school to collect your child's admission form, or request one via WhatsApp. Forms are free of charge." },
  { number: "03", icon: ClipboardList, title: "Submit Documents", desc: "Complete the form and submit it alongside the required documents for your child's stage." },
  { number: "04", icon: Users, title: "Meet the School", desc: "We invite you and your child for a brief visit and friendly assessment — so we can get to know them personally." },
  { number: "05", icon: Star, title: "Welcome to TBA!", desc: "Once accepted, you'll receive your welcome letter with uniform guide, booklist and term start date. Your journey begins!" },
];

function HowToApply() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Simple Process</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">How to Apply</h2>
          <p className="font-poppins text-white/75 text-base max-w-xl mx-auto">Five easy steps from first enquiry to first day at Thinkers Base Academy.</p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* connector line — desktop only */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-white/10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.number} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative flex flex-col items-center text-center">
                {/* Circle */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-nursery flex items-center justify-center shadow-lg mb-5">
                  <step.icon className="w-8 h-8 text-forest" />
                  <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-forest border-2 border-nursery flex items-center justify-center font-nunito font-extrabold text-xs text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-nunito font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="font-poppins text-white/70 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// KEY DATES
// ─────────────────────────────────────────────────────────────────────────────
function KeyDates() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const dates = [
    { term: "First Term", period: "September – December", open: "Applications open: July", color: "#F4D03F" },
    { term: "Second Term", period: "January – March", open: "Applications open: November", color: "#5BA4CF" },
    { term: "Third Term", period: "April – July", open: "Applications open: February", color: "#E8845C" },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Planning Ahead</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Academic Calendar & Key Dates</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-xl mx-auto">Our academic year runs September to July, divided into three terms. Apply early to secure your child&apos;s place.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {dates.map((d, i) => (
            <motion.div key={d.term} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.5 }} className="bg-white rounded-card p-7 shadow-card" style={{ borderTop: `4px solid ${d.color}` }}>
              <Calendar className="w-8 h-8 mb-4" style={{ color: d.color }} />
              <h3 className="font-nunito font-extrabold text-forest text-xl mb-2">{d.term}</h3>
              <p className="font-poppins text-charcoal/70 text-sm mb-3">{d.period}</p>
              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                <p className="font-nunito font-bold text-forest text-xs">{d.open}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="bg-forest/6 border border-forest/15 rounded-card p-5 flex items-start gap-4 max-w-2xl mx-auto">
          <BookOpen className="w-6 h-6 text-forest flex-shrink-0 mt-0.5" />
          <p className="font-poppins text-charcoal/75 text-sm leading-relaxed">
            <span className="font-nunito font-bold text-forest">Early applications are encouraged.</span> Spaces are limited per class and are allocated on a first-come, first-served basis once all requirements are met.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "What age can my child start at Thinkers Base Academy?", a: "We accept children from as young as 1 year old into our Play Group programme. Our Foundation stage runs from ages 1–4, Pre School from 4–6, and Grade School from 6–12." },
  { q: "Do you accept mid-term transfers from other schools?", a: "Yes, we do accept transfers mid-term subject to space availability. Please contact us directly and bring your child's most recent school report and transfer certificate." },
  { q: "Is there a waiting list if spaces are full?", a: "Yes. If a class is full we will place your child on our waiting list and contact you as soon as a space becomes available. We recommend applying early." },
  { q: "Do you offer school bus / transportation?", a: "Yes. We have an air-conditioned school bus for safe and comfortable pickup and drop-off. Please enquire about routes and fees when you contact us." },
  { q: "What curriculum do you follow?", a: "We follow a rich blend of the Nigerian curriculum and British EYFS/primary frameworks, enriched with extracurricular activities, digital literacy, and our CLASSY character programme." },
  { q: "Are there extra-curricular activities?", a: "Yes — 8 clubs and activities including Music & Dance, Culinary, Science, Bible Explorers, Public Speaking, Farmers Club, Art & Craft, and Swimming." },
  { q: "What are the school fees?", a: "School fees vary by stage and term. Please contact us directly via WhatsApp or phone for the current fee schedule — we are happy to discuss all options with you." },
  { q: "How do I arrange a school visit?", a: "Simply call or WhatsApp us on +2348088292398 and we will schedule a convenient time for you to tour the school with your child." },
];

function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Got Questions?</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.4 }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left bg-white/10 border border-white/15 hover:bg-white/15 hover:border-white/25 rounded-xl px-5 py-4 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-nursery flex-shrink-0" />
                    <span className="font-nunito font-bold text-white text-sm">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/50 flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
                </div>
                {open === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.25 }} className="font-poppins text-white/75 text-sm leading-relaxed mt-3 pl-7">
                    {faq.a}
                  </motion.p>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT STRIP
// ─────────────────────────────────────────────────────────────────────────────
function ContactStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-16 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="bg-forest rounded-[24px] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-leaf/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-nursery/10 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <div className="text-center mb-8">
              <span className="text-4xl mb-3 block">📞</span>
              <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-white mb-3">Ready to Take the Next Step?</h2>
              <p className="font-poppins text-white/75 text-sm max-w-md mx-auto leading-relaxed">Our admissions team is friendly, patient and ready to answer every question. Reach out today — we&apos;d love to meet your family.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Phone, label: "Call / WhatsApp", value: "+2348088292398", href: "https://wa.me/2348088292398" },
                { icon: Mail, label: "Email Us", value: "thinkersbaseacademy@gmail.com", href: "mailto:thinkersbaseacademy@gmail.com" },
                { icon: Calendar, label: "School Hours", value: "Mon–Wed: 8am–3pm\nThu–Fri: 8am–2pm", href: null },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 border border-white/15 rounded-xl p-4 text-center">
                  <item.icon className="w-6 h-6 text-nursery mx-auto mb-2" />
                  <p className="font-poppins text-white/50 text-xs mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-nunito font-bold text-white text-sm hover:text-nursery transition-colors break-all">{item.value}</a>
                  ) : (
                    <p className="font-nunito font-bold text-white text-sm whitespace-pre-line">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://wa.me/2348088292398" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-nursery text-forest font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                Apply Now <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-nunito font-bold text-sm px-6 py-3 rounded-button hover:bg-white/20 transition-all">
                Visit Contact Page
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
export default function AdmissionsPage() {
  return (
    <>
      <AdmissionsHero />
      <StageSelector />
      <HowToApply />
      <KeyDates />
      <FAQ />
      <ContactStrip />
    </>
  );
}