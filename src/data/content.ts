import type { SchoolInfo, Stage, Stat, NavLink } from "@/types";

// ── School info ───────────────────────────────────────────────────────────────
export const schoolInfo: SchoolInfo = {
  name:        "Thinkers Base Academy",
  tagline:     "Every Child Belongs Here",
  description: "A nurturing school community where foundation stage and grade school pupils grow together into confident, curious, compassionate leaders.",
  phone:       "+2348037134462, +2348088292398",
  email:       "thinkersbaseacademy@gmail.com",
  address:     "Plot 183A/B Mary Emmanuel Street New GRA Trans-Ekulu, Enugu.",
  hours:       "Mon – Wed: 8:00am – 3:00pm  |  Thu – Fri: 8:00am – 2:00pm",
};

// ── Stages ───────────────────────────────────────────────────────────────────
const stages: Stage[] = [
  {
    id: "playgroup",
    label: "Little Learners",
    emoji: "🌱",
    ages: "Ages 1 – 2",
    color: "#F4D03F",
    description: "A safe, warm space where your child takes their first steps into learning through play.",
    href: "/playgroup",
    classes: "playgroup ·· Reception",
    hex: "#FEF9E7",
    image: "/images/P2.webp",
  },
  {
    id: "Pre School",
    label: "Big Adventurers",
    emoji: "🎒",
    ages: "Ages 3 – 5",
    color: "#5BA4CF",
    description: "Curious minds, big questions and the skills to find the answers.",
    href: "/pre-school",
    classes: "Preschool 1 – Preschool 2",
    hex: "#EBF5FB",
    image: "/images/small pupils in uniform.jpeg",
  },
  {
    id: "Grade School",
    label: "Future Leaders",
    emoji: "📚",
    ages: "Ages 6 – 12",
    color: "#E8845C",
    description: "Ambitious, supported and ready to shape the world.",
    href: "/grade-school",
    classes: "Grade 1 – Grade 5/6",
    hex: "#FDF2E9",
    image: "/images/Grade 3 pupils with computer.jpeg",
  },
];
export default stages;

// ── Stats ────────────────────────────────────────────────────────────────────
export const stats: Stat[] = [
  { label: "Dedicated Teachers", value: 24, emoji: "👩‍🏫" },
  { label: "CCTV Cameras",       value: 50, emoji: "📹" },
  { label: "Happy Parents",      value: 98, emoji: "😊" },
  { label: "Students Benefiting", value: 100, emoji: "🎓" },
];

// ── Extra-curricular activities ───────────────────────────────────────────────
export const extraCurricular = [
  { name: "Music & Dance Club",  emoji: "🎵" },
  { name: "Culinary Club",       emoji: "🍳" },
  { name: "Science Club",        emoji: "🔬" },
  { name: "Bible Explorers",     emoji: "📖" },
  { name: "Public Speaking",     emoji: "🎤" },
  { name: "Farmers Club",        emoji: "🌿" },
  { name: "Art & Craft",         emoji: "🎨" },
  { name: "Swimming",            emoji: "🏊" },
];

// ── Navigation links ─────────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home",       href: "/" },
  { label: "About Us",   href: "/about" },
  {
    label: "Our School",
    href: "#",
    children: [
      { label: "🌱 Foundation Stage",       href: "/foundation-stage" },
      { label: "📚 Grade School", href: "/grade-school" },
    ],
  },
  { label: "Admissions",  href: "/admissions" },
  { label: "School Life", href: "/school-life" },
  { label: "Contact",     href: "/contact" },
];