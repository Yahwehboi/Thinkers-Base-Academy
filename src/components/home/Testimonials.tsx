"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

// ── Testimonials data ─────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "Our daughter loves coming to Thinkers Base Academy. The playgroup teachers are warm and attentive. She's blossoming academically and socially.",
    author: "Mrs. Uzodinma Oyinyechukwu",
    detail: "Parent of a Playgroup pupil",
    stage: "Playgroup" as const,
    stageColor: "#52B788",
    emoji: "🌱",
  },
  {
    quote:
      "My son is gradually  progressing in his handwriting skill. Thumbs up to the Pre school teachers for their effort.",
    author: "Mr. Onovo Olochukwu",
    detail: "Parent of a Pre school pupil",
    stage: "Preschool" as const,
    stageColor: "#1B4332",
    emoji: "🎒",
  },
  {
    quote:
      "The Reception teachers really know each child. My son has improved tremendously. Thinkers Base Academy doesn’t let any child fall behind.",
    author: "Engr. Uchenna Ozongwu",
    detail: "Parent of a Reception pupil",
    stage: "Reception" as const,
    stageColor: "#1B4332",
    emoji: "✏️",
  },
  
  {
    quote:
      "Grade School at Thinkers Base Academy prepared my daughter academically and personally. She is confident, independent, and ready for her future.",
    author: "Mrs. Nnedi Ezedigboh",
    detail: "Parent of a Grade 4 pupil",
    stage: "Grade school" as const,
    stageColor: "#3A6EA5",
    emoji: "📚",
  },
];

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars({ color }: { color: string }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" style={{ color }} />
      ))}
    </div>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  index,
  inView,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.55, ease: "easeOut" }}
      className="bg-white rounded-card p-7 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
      style={{ borderLeft: `4px solid ${testimonial.stageColor}` }}
    >
      {/* Stage tag */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-xs font-nunito font-bold px-2.5 py-1 rounded-button"
          style={{
            backgroundColor: testimonial.stageColor + "22",
            color: testimonial.stage === "Playgroup" ? "#7a5c00" : testimonial.stageColor,
          }}
        >
          {testimonial.emoji}{" "}
          {testimonial.stage.charAt(0).toUpperCase() + testimonial.stage.slice(1)} Parent
        </span>
      </div>

      <Stars color={testimonial.stageColor} />

      {/* Large quote mark */}
      <div
        className="font-nunito font-extrabold text-7xl leading-none mb-2 -mt-2"
        style={{ color: testimonial.stageColor + "55" }}
      >
        "
      </div>

      <p className="font-poppins text-charcoal/75 text-sm leading-relaxed flex-1 -mt-4">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-nunito font-extrabold text-sm flex-shrink-0"
          style={{
            backgroundColor: testimonial.stageColor + "33",
            color: testimonial.stage === "Playgroup" ? "#7a5c00" : testimonial.stageColor,
          }}
        >
          {testimonial.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div>
          <p className="font-nunito font-bold text-forest text-sm">{testimonial.author}</p>
          <p className="font-poppins text-charcoal/50 text-xs">{testimonial.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Testimonials Section ──────────────────────────────────────────────────────
export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F0FFF4 0%, #F8FFF4 50%, #FFF9E6 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-leaf/8 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-nursery/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">
            What Family Says
          </span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">
            Trusted by Our Parents
          </h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-lg mx-auto">
            Don't just take our word for it — hear from the parents who trust us
            with their children’s learning journey.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} inView={inView} />
          ))}
        </div>

        {/* Trust badge row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-center"
        >
          {[
            { value: "98%", label: "Parent satisfaction" },
            { value: "100+", label: "Happy families" },
            { value: "2019", label: "Since establishment" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-nunito font-extrabold text-2xl text-forest">
                {item.value}
              </span>
              <span className="font-poppins text-charcoal/55 text-xs mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}