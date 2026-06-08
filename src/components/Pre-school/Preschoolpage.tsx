"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Calculator,
  Globe,
  Lightbulb,
  Palette,
  Users,
} from "lucide-react";

const COLOR = "#5BA4CF";

function PreSchoolHero() {
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
              <span className="text-white/80">Pre School</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 font-nunito font-bold text-sm px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: COLOR, color: "#ffffff" }}>
              🎒 Key Stage 1
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }} className="font-nunito font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
              Big Adventurers.
              <br />
              <span style={{ color: COLOR }}>Bigger Ideas.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="font-poppins text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              Pre School at TBA is where curiosity meets structure. Children aged 2–5 in Preschool 1, Preschool 2 and Reception build confident communication, early literacy and numeracy skills — while keeping their love of learning alive.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3">
              <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg" style={{ backgroundColor: COLOR, color: "#ffffff" }}>
                Enquire Now <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/admissions" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-nunito font-bold text-sm px-6 py-3 rounded-button hover:bg-white/20 transition-all">
                Apply Now
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { emoji: "🎒", value: "Ages 2–5", label: "Age range" },
              { emoji: "📖", value: "3 Classes", label: "PS1, PS2 & Reception" },
              { emoji: "✍️", value: "Literacy", label: "Strong focus" },
              { emoji: "🔢", value: "Numeracy", label: "Core skill" },
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

function PreSchoolClasses() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const classes = [
    {
      name: "Preschool 1",
      ages: "Ages 2 – 3",
      desc: "Children begin structured learning through play, song and guided activities. Focus on language development, social skills, colours, shapes and early number awareness.",
      emoji: "🌟",
    },
    {
      name: "Preschool 2",
      ages: "Ages 3 – 4",
      desc: "Building on Preschool 1, children develop pre-writing skills, phonemic awareness, basic counting and greater independence in classroom routines.",
      emoji: "🚀",
    },
    {
      name: "Reception",
      ages: "Ages 4 – 5",
      desc: "The bridge between preschool and formal schooling. Children in Reception begin phonics, early reading, writing and foundational mathematics in a nurturing, structured setting.",
      emoji: "🎓",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Key Stage 1</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Our Pre School Classes</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-xl mx-auto">Three carefully structured classes that take your child from early exploration all the way to readiness for Grade School.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((cls, i) => (
            <motion.div key={cls.name} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }} className="bg-white rounded-card p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `4px solid ${COLOR}` }}>
              <div className="text-5xl mb-4">{cls.emoji}</div>
              <h3 className="font-nunito font-extrabold text-forest text-2xl mb-2">{cls.name}</h3>
              <span className="inline-block font-poppins text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: COLOR + "33", color: "#1B4332" }}>{cls.ages}</span>
              <p className="font-poppins text-charcoal/65 text-sm leading-relaxed">{cls.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatTheyLearn() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const subjects = [
    { icon: BookOpen, title: "Language & Literacy", desc: "Phonics, guided reading, storytelling, early writing and oral communication skills." },
    { icon: Calculator, title: "Mathematics", desc: "Counting, number recognition, shapes, patterns and simple addition concepts." },
    { icon: Globe, title: "Basic Science", desc: "Nature exploration, simple observations, curiosity about the world around them." },
    { icon: Globe, title: "Social Studies", desc: "Family, community, culture, sharing and learning to live alongside others." },
    { icon: Palette, title: "Creative Arts", desc: "Drawing, painting, crafts, music, rhymes and imaginative role play." },
    { icon: Lightbulb, title: "Critical Thinking", desc: "Puzzles, sorting activities, problem-solving games and guided questioning." },
    { icon: Users, title: "Religious & Moral Education", desc: "Bible stories, moral values, character building and positive social behaviours." },
    { icon: Globe, title: "Physical Development", desc: "Gross and fine motor activities, outdoor play, coordination and healthy habits." },
  ];

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">The Curriculum</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">Subjects Covered in Pre School</h2>
          <p className="font-poppins text-white/75 text-base max-w-2xl mx-auto">A rich, balanced curriculum that develops the whole child — academically, creatively and socially.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjects.map((subject, i) => (
            <motion.div key={subject.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }} className="group bg-white/10 border border-white/15 rounded-card p-6 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: COLOR + "33" }}>
                <subject.icon className="w-5 h-5" style={{ color: COLOR }} />
              </div>
              <h3 className="font-nunito font-bold text-white text-base mb-2">{subject.title}</h3>
              <p className="font-poppins text-white/65 text-xs leading-relaxed">{subject.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyPreSchool() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const outcomes = [
    "Strong communication and early reading skills by end of Reception",
    "Confident counting, number recognition and early maths foundations",
    "Children who can express themselves clearly in speech and early writing",
    "Socially aware, kind and collaborative classmates",
    "Creative and curious learners who ask great questions",
    "Fully ready and excited to transition into Grade School",
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="relative">
            <div className="relative h-96 rounded-[24px] overflow-hidden shadow-xl">
              <Image src="/images/small pupils in uniform.jpeg" alt="Pre School pupils at Thinkers Base Academy" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-gray-100">
              <p className="font-nunito font-extrabold text-forest text-lg leading-none">Key Stage 1</p>
              <p className="font-poppins text-charcoal/55 text-xs mt-0.5">Preschool 1, Preschool 2 & Reception</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
            <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Learning Outcomes</span>
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-6">What Your Child Achieves by the End of Pre School</h2>
            <ul className="space-y-3 mb-8">
              {outcomes.map((outcome, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                  <span className="font-poppins text-charcoal/75 text-sm leading-relaxed">{outcome}</span>
                </motion.li>
              ))}
            </ul>
            <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-md" style={{ backgroundColor: COLOR, color: "#ffffff" }}>
              Enquire About Pre School <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PreSchoolCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-16 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="bg-forest rounded-[24px] p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ backgroundColor: COLOR + "20" }} />
          <div className="relative">
            <span className="text-5xl mb-4 block">🎒</span>
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-white mb-3">Ready for the Next Adventure?</h2>
            <p className="font-poppins text-white/75 text-sm mb-7 max-w-md mx-auto leading-relaxed">Spaces in Preschool 1, Preschool 2 and Reception are limited. Get in touch today to find out about availability.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg" style={{ backgroundColor: COLOR, color: "#ffffff" }}>
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

export default function PreSchoolPage() {
  return (
    <>
      <PreSchoolHero />
      <PreSchoolClasses />
      <WhatTheyLearn />
      <WhyPreSchool />
      <PreSchoolCta />
    </>
  );
}