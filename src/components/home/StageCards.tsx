"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Local type — extends Stage with the outcome badge field
type StageWithOutcome = {
  id: string;
  label: string;
  emoji: string;
  ages: string;
  color: string;
  hex: string;
  description: string;
  href: string;
  classes: string;
  image: string;
  outcome: string;
};

const stages: StageWithOutcome[] = [
  {
    id: "Playgroup",
    label: "Little Learners",
    emoji: "🌱",
    ages: "Ages 1 – 2",
    color: "#F4D03F",
    description:
      "A warm, play-based environment where your youngest child takes their first confident steps into learning through exploration and guided discovery.",
    href: "/playgroup",
    classes: "Playgroup",
    hex: "#FEF9E7",
    image: "/images/P2.webp",
    outcome: "Foundation Stage (EYFS)",
  },
  {
    id: "Pre School",
    label: "Big Adventurers",
    emoji: "🎒",
    ages: "Ages 3 – 5",
    color: "#5BA4CF",
    description:
      "Building confident readers, writers and problem-solvers. Key Stage 1 pupils develop strong academic habits alongside social and creative skills.",
    href: "/pre-school",
    classes: "Preschool/Reception",
    hex: "#EBF5FB",
    image: "/images/bts1.jpg",
    outcome: "Key Stage 1",
  },
  {
    id: "Grade School",
    label: "Future Leaders",
    emoji: "📚",
    ages: "Ages 6 – 12",
    color: "#E8845C",
    description:
      "Ambitious learners supported to excel in every subject — growing as critical thinkers ready for secondary school and beyond.",
    href: "/grade-school",
    classes: "Grade 1 – Grade 5/6",
    hex: "#FDF2E9",
    image: "/images/Grade 3 pupils with computer.jpeg",
    outcome: "Key Stage 2",
  },
];

function StageCard({ stage, index }: { stage: StageWithOutcome; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
      style={{ backgroundColor: stage.hex }}
    >
      {/* bg blob */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: "#1B4332" }}
      />

      {/* Photo */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={stage.image}
          alt={`${stage.label} at Thinkers Base Academy`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        {/* Outcome badge */}
        <div
          className="absolute top-3 left-3 font-nunito font-bold text-[10px] px-2.5 py-1 rounded-full"
          style={{ backgroundColor: stage.color, color: "#1B4332" }}
        >
          {stage.outcome}
        </div>
      </div>

      <div className="relative p-7">
        <div className="mb-3">
          <span className="font-poppins text-xs font-semibold text-forest/60 uppercase tracking-widest">
            {stage.classes}
          </span>
        </div>

        <h3 className="font-nunito font-extrabold text-2xl text-forest mb-2">
          {stage.emoji} {stage.label}
        </h3>
        <p className="font-poppins text-xs font-semibold text-forest/60 mb-3">{stage.ages}</p>
        <p className="font-poppins text-sm text-forest/70 leading-relaxed mb-6">
          {stage.description}
        </p>

        <Link
          href={stage.href}
          className="inline-flex items-center gap-2 font-nunito font-bold text-sm px-5 py-2.5 rounded-button bg-forest text-white hover:bg-forest/90 transition-all group-hover:gap-3"
        >
          Discover {stage.label} Learning
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-20"
        style={{ backgroundColor: "#1B4332" }}
      />
    </motion.div>
  );
}

export default function StageCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 40"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10"
        >
          <path d="M0,20 C480,40 960,0 1440,20 L1440,0 L0,0 Z" fill="#1B4332" opacity="0.04" />
        </svg>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">
            Our Programmes
          </span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">
            A Place for Every Child
          </h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-xl mx-auto leading-relaxed">
            From first steps into learning to launching young leaders — our three-stage curriculum
            grows with your child at every age.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((stage, index) => (
            <StageCard key={stage.id} stage={stage} index={index} />
          ))}
        </div>

        {/* Key stage legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-poppins text-charcoal/50"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4D03F] inline-block" />
            Foundation Stage — ages 1–3
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5BA4CF] inline-block" />
            Key Stage 1 — Preschool 1–2
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8845C] inline-block" />
            Key Stage 2 — Grade 1–5/6
          </span>
        </motion.div>
      </div>
    </section>
  );
}