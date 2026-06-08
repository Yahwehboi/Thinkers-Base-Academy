"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Music,
  Palette,
  Mic,
  Leaf,
  FlaskConical,
  BookMarked,
  Utensils,
  Waves,
  Camera,
  Trophy,
  Heart,
  Star,
  Users,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function SchoolLifeHero() {
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
              <span className="text-white/80">School Life</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.55 }} className="font-nunito font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
              Life at
              <br />
              <span className="text-nursery">Thinkers Base</span>
              <br />
              is an Adventure.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="font-poppins text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              From morning assembly to afternoon clubs, from science experiments to swimming sessions — every day at TBA is full of discovery, laughter and growth.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3">
              <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-nursery text-forest font-nunito font-extrabold text-sm px-6 py-3 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                Book a School Tour <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/admissions" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-nunito font-bold text-sm px-6 py-3 rounded-button hover:bg-white/20 transition-all">
                Apply Now
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { emoji: "🎭", value: "8", label: "Clubs & Activities" },
              { emoji: "📸", value: "365", label: "Days of memories" },
              { emoji: "🎓", value: "100%", label: "Happy pupils" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-card p-5 text-center">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-nunito font-extrabold text-2xl text-white mb-1">{item.value}</div>
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
// A DAY IN THE LIFE
// ─────────────────────────────────────────────────────────────────────────────
function DayInTheLife() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const schedule = [
    { time: "7:45am", title: "Arrival & Morning Prep", desc: "Children arrive, settle in and prepare for the day ahead with their class teacher.", emoji: "🌅", color: "#F4D03F" },
    { time: "8:00am", title: "Morning Assembly", desc: "School-wide gathering for prayer, announcements, character talks and community building.", emoji: "🙏", color: "#52B788" },
    { time: "8:30am", title: "Learning Begins", desc: "Structured lessons across core subjects — literacy, numeracy, science, social studies and more.", emoji: "📚", color: "#5BA4CF" },
    { time: "10:30am", title: "Break & Snack Time", desc: "Outdoor play, healthy snacks and social time. Physical activity and peer connection every day.", emoji: "🍎", color: "#E8845C" },
    { time: "11:00am", title: "Creative & Practical Lessons", desc: "Art, music, ICT, drama or thematic project work. Every child's talent gets spotlight time.", emoji: "🎨", color: "#52B788" },
    { time: "12:30pm", title: "Lunch", desc: "Hot, nutritious meals from our school kitchen following our healthy meal plan.", emoji: "🍽️", color: "#F4D03F" },
    { time: "1:00pm", title: "Afternoon Learning", desc: "Continued lessons, reading sessions, group activities and hands-on experiments.", emoji: "🔬", color: "#5BA4CF" },
    { time: "2:00pm", title: "Clubs & Closing (Mon–Wed)", desc: "Extra-curricular club sessions or end of day for younger pupils. Mon–Wed dismissal at 2:00pm.", emoji: "🎭", color: "#E8845C" },
    { time: "3:00pm", title: "Closing Time (Thu–Fri)", desc: "Extended learning day on Thursdays and Fridays. Dismissal at 3:00pm.", emoji: "🏠", color: "#52B788" },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">A Typical School Day</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">A Day in the Life at TBA</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-xl mx-auto">Every day is purposefully planned — structured enough to build strong habits, flexible enough to follow curiosity.</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-leaf/20" />

          <div className="space-y-5">
            {schedule.map((item, i) => (
              <motion.div key={item.time} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.45 }} className="relative flex items-start gap-5 pl-16 sm:pl-20">
                {/* Circle */}
                <div className="absolute left-0 top-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl border-4 border-white shadow-md flex-shrink-0" style={{ backgroundColor: item.color }}>
                  {item.emoji}
                </div>

                <div className="bg-white rounded-card p-5 shadow-card flex-1 hover:shadow-card-hover transition-shadow">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-nunito font-extrabold text-sm px-2.5 py-0.5 rounded-full" style={{ backgroundColor: item.color + "33", color: "#1B4332" }}>{item.time}</span>
                    <h3 className="font-nunito font-bold text-forest text-base">{item.title}</h3>
                  </div>
                  <p className="font-poppins text-charcoal/65 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXTRA CURRICULAR CLUBS
// ─────────────────────────────────────────────────────────────────────────────
const clubs = [
  {
    icon: Music,
    name: "Music & Dance Club",
    color: "#F4D03F",
    bg: "#FEF9E7",
    desc: "Rhythm, movement and musical expression. Children learn instruments, songs, choreography and perform at school events.",
    who: "All stages welcome",
  },
  {
    icon: Utensils,
    name: "Culinary Club",
    color: "#E8845C",
    bg: "#FDF2E9",
    desc: "Our well-equipped kitchen comes alive as young chefs learn to prepare healthy, delicious meals and understand nutrition.",
    who: "Pre School & Grade School",
  },
  {
    icon: FlaskConical,
    name: "Science Club",
    color: "#5BA4CF",
    bg: "#EBF5FB",
    desc: "Experiments, discoveries and 'why?' moments. Children explore the world of science through hands-on activities and mini-projects.",
    who: "Grade School focus",
  },
  {
    icon: BookMarked,
    name: "Bible Explorers",
    color: "#52B788",
    bg: "#F0FFF4",
    desc: "Stories, values, character and faith. A nurturing space where children explore scripture and develop strong moral foundations.",
    who: "All stages welcome",
  },
  {
    icon: Mic,
    name: "Public Speaking Club",
    color: "#9B59B6",
    bg: "#F5EEF8",
    desc: "Confidence, clarity and conviction. Children learn to stand up, speak up and articulate their ideas to an audience.",
    who: "Pre School & Grade School",
  },
  {
    icon: Leaf,
    name: "Farmers Club",
    color: "#27AE60",
    bg: "#EAFAF1",
    desc: "From seed to harvest. Children learn about agriculture, sustainability and where food comes from through real gardening activities.",
    who: "All stages welcome",
  },
  {
    icon: Palette,
    name: "Art & Craft",
    color: "#E74C3C",
    bg: "#FDEDEC",
    desc: "Drawing, painting, sculpting, weaving and making. A creative outlet where every child discovers and develops their artistic voice.",
    who: "All stages welcome",
  },
  {
    icon: Waves,
    name: "Swimming",
    color: "#2E86C1",
    bg: "#EBF5FB",
    desc: "Supervised swimming sessions in our on-campus pool. Children build water confidence, technique and a lifelong love of swimming.",
    who: "All stages welcome",
  },
];

function ExtraCurricular() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Beyond the Classroom</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">Our 8 Clubs & Activities</h2>
          <p className="font-poppins text-white/75 text-base max-w-xl mx-auto">Every child has a talent. Our clubs exist to find it, nurture it and celebrate it. Tap any club to learn more.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {clubs.map((club, i) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setSelected(selected === i ? null : i)}
              className="cursor-pointer group"
            >
              <div className={`rounded-card p-6 transition-all duration-300 ${selected === i ? "shadow-xl scale-[1.02]" : "hover:shadow-lg hover:-translate-y-1"}`} style={{ backgroundColor: selected === i ? club.bg : "rgba(255,255,255,0.1)", border: selected === i ? `2px solid ${club.color}` : "2px solid rgba(255,255,255,0.1)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: club.color + "33" }}>
                  <club.icon className="w-6 h-6" style={{ color: selected === i ? club.color : "#ffffff" }} />
                </div>
                <h3 className={`font-nunito font-bold text-base mb-2 ${selected === i ? "text-forest" : "text-white"}`}>{club.name}</h3>
                <span className={`font-poppins text-xs px-2 py-0.5 rounded-full ${selected === i ? "text-forest/60" : "text-white/50"}`} style={{ backgroundColor: club.color + "22" }}>{club.who}</span>

                {selected === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} className="font-poppins text-charcoal/70 text-sm leading-relaxed mt-3">
                    {club.desc}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO GALLERY
// ─────────────────────────────────────────────────────────────────────────────
const galleryPhotos = [
  { src: "/images/Grade 3 pupils with computer.jpeg", label: "Digital Learning", size: "col-span-2 row-span-2" },
  { src: "/images/student with mini microscope.jpeg", label: "Science Club", size: "" },
  { src: "/images/students displaying handcraft.jpeg", label: "Art & Craft", size: "" },
  { src: "/images/pupils playing.jpg", label: "Playtime", size: "" },
  { src: "/images/Students in swimmingpool.jpeg", label: "Swimming", size: "" },
  { src: "/images/students holding adire.jpeg", label: "Cultural Day", size: "col-span-2" },
  { src: "/images/students in traditional atire.jpeg", label: "Traditional Attire", size: "" },
  { src: "/images/pupil with mic.jpg", label: "Public Speaking", size: "" },
  { src: "/images/small pupils in uniform.jpeg", label: "Ready to Learn", size: "" },
  { src: "/images/P2.webp", label: "Little Learners", size: "" },
];

function PhotoGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">
            <Camera className="w-3.5 h-3.5 inline mr-1" />
            Moments & Memories
          </span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Life Through Our Lens 📸</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-md mx-auto">A glimpse into the everyday magic that happens at Thinkers Base Academy.</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 auto-rows-[150px]">
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={photo.label}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => setLightbox(photo.src)}
              className={`${photo.size} relative rounded-2xl overflow-hidden shadow-card border-2 border-white group cursor-pointer`}
            >
              <Image src={photo.src} alt={`${photo.label} — Thinkers Base Academy`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-nunito font-bold text-white text-sm">{photo.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative max-w-4xl max-h-[85vh] w-full">
            <Image src={lightbox} alt="Gallery image" width={1200} height={800} className="object-contain rounded-xl max-h-[85vh] w-auto mx-auto" />
            <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold hover:bg-white/30 transition-colors">✕</button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPECIAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────
function SpecialEvents() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const events = [
    { emoji: "🎓", title: "Graduation Day", desc: "A proud celebration as our Grade School pupils cross the stage and begin the next chapter of their journey.", color: "#F4D03F" },
    { emoji: "🌍", title: "Cultural Day", desc: "A vibrant celebration of Nigerian heritage — traditional attire, food, music, dance and pride in our roots.", color: "#E8845C" },
    { emoji: "🔬", title: "Science Fair", desc: "Pupils present their own science projects and experiments. Innovation, creativity and curiosity on full display.", color: "#5BA4CF" },
    { emoji: "🎭", title: "End of Term Show", desc: "Drama performances, musical acts and presentations showcasing everything children have learned each term.", color: "#52B788" },
    { emoji: "🏆", title: "Awards Assembly", desc: "Recognising academic excellence, good character, most improved and outstanding club achievements.", color: "#9B59B6" },
    { emoji: "📖", title: "Reading Week", desc: "A school-wide celebration of books, storytelling, author visits and reading challenges to build a love of literacy.", color: "#27AE60" },
  ];

  return (
    <section ref={ref} className="py-20 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">Mark the Calendar</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">Special Events & Celebrations</h2>
          <p className="font-poppins text-white/75 text-base max-w-xl mx-auto">School life at TBA is punctuated with memorable events that children look forward to all year.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, i) => (
            <motion.div key={event.title} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} className="group bg-white/10 border border-white/15 rounded-card p-6 hover:bg-white/15 hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform" style={{ backgroundColor: event.color + "33" }}>
                {event.emoji}
              </div>
              <h3 className="font-nunito font-bold text-white text-lg mb-2">{event.title}</h3>
              <p className="font-poppins text-white/70 text-sm leading-relaxed">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WELLBEING & VALUES
// ─────────────────────────────────────────────────────────────────────────────
function WellbeingValues() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const pillars = [
    { icon: Heart, title: "Emotional Wellbeing", desc: "Every child's feelings matter. Our teachers are trained to notice, listen and support — creating a safe emotional space for every pupil.", color: "#E8845C" },
    { icon: Users, title: "Peer Relationships", desc: "We teach children how to make friends, resolve conflict peacefully and be kind community members through daily interactions.", color: "#5BA4CF" },
    { icon: Trophy, title: "Achievement Culture", desc: "We celebrate effort, not just results. Every improvement, no matter how small, is recognised and affirmed.", color: "#F4D03F" },
    { icon: Star, title: "Character Development", desc: "Through our CLASSY programme — Communicators, Lifelong Learners, Academic Achievers, Social Contributors, Strong & Exceptional, Young Role Models.", color: "#52B788" },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block font-poppins text-leaf font-semibold text-sm tracking-widest uppercase mb-3">More Than Academics</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest mb-4">Wellbeing & Character at the Core</h2>
          <p className="font-poppins text-charcoal/60 text-base max-w-xl mx-auto">We raise whole children — academically excellent, emotionally healthy, morally grounded and socially aware.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div key={pillar.title} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.5 }} className="bg-white rounded-card p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group" style={{ borderTop: `4px solid ${pillar.color}` }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ backgroundColor: pillar.color + "22" }}>
                <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
              </div>
              <h3 className="font-nunito font-bold text-forest text-lg mb-3">{pillar.title}</h3>
              <p className="font-poppins text-charcoal/65 text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────
function SchoolLifeCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-16 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center">
          <span className="text-5xl mb-5 block">🎒</span>
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-white mb-4">
            Your Child Belongs Here Too
          </h2>
          <p className="font-poppins text-white/75 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Every child you&apos;ve seen in these photos started exactly where yours is now — at the beginning of an extraordinary journey. Come and join us.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/2348037134462" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-nursery text-forest font-nunito font-extrabold text-sm px-7 py-3.5 rounded-button hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-nunito font-bold text-sm px-7 py-3.5 rounded-button hover:bg-white/20 transition-all">
              Book a Visit
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────
export default function SchoolLifePage() {
  return (
    <>
      <SchoolLifeHero />
      <DayInTheLife />
      <ExtraCurricular />
      <PhotoGallery />
      <SpecialEvents />
      <WellbeingValues />
      <SchoolLifeCta />
    </>
  );
}