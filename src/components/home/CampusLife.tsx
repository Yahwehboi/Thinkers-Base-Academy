"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const moments = [
  { src: "/images/Grade 3 pupils with computer.jpeg", label: "Digital Learning", span: "col-span-2 row-span-2" },
  { src: "/images/student with mini microscope.jpeg", label: "Science Club", span: "" },
  { src: "/images/students displaying handcraft.jpeg", label: "Art & Craft", span: "" },
  { src: "/images/pupils playing.jpg", label: "Playtime", span: "" },
  { src: "/images/fit future leaders.jpg", label: "Science Club", span: "" },
  { src: "/images/students holding adire.jpeg", label: "Art and Craft", span: "col-span-2" },
  { src: "/images/Students in swimmingpool.jpeg", label: "Swimming", span: "col -3" },
];

export default function CampusLife() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">
            Life at Thinkers Base
          </span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">
            Picture Your Child Here
          </h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-lg mx-auto">
            From classrooms to swimming pools, science labs to cultural celebrations — every day at TBA is an adventure in learning.
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-4 gap-3 auto-rows-[140px]">
          {moments.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className={`${m.span} relative rounded-2xl overflow-hidden shadow-card border-2 border-white group`}
            >
              <Image
                src={m.src}
                alt={`${m.label} — Thinkers Base Academy`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-nunito font-bold text-white text-sm">{m.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}