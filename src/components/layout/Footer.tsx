"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Phone, Mail, Clock,
  Facebook, Instagram, BookOpen,
} from "lucide-react";
import stages, { schoolInfo, navLinks } from "@/data/content";

/* Wave divider */
function WaveTop() {
  return (
    <div className="w-full overflow-hidden leading-none -mb-px">
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16 block"
      >
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill="#1B4332"
        />
      </svg>
    </div>
  );
}

/* Social Button */
function SocialBtn({
  href, icon: Icon, label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-nursery hover:text-forest text-white/70 transition-all duration-200 hover:-translate-y-1"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

/* Footer link */
function FooterLink({
  href, children, external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-nursery text-sm transition-colors duration-150"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="text-white/60 hover:text-nursery text-sm transition-colors duration-150"
    >
      {children}
    </Link>
  );
}

/* Contact row */
function ContactRow({
  icon: Icon, children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0">
        <Icon className="w-4 h-4 text-nursery" />
      </div>
      <span className="text-white/70 text-sm leading-relaxed">{children}</span>
    </div>
  );
}

/* Main Footer */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <WaveTop />

      <footer className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">

            {/* ── Brand + Logo ── */}
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                {/* TBA Logo */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/15 flex-shrink-0 border border-white/20 group-hover:border-nursery transition-colors">
                  <Image
                    src="/images/TB logo.jpg"
                    alt="Thinkers Base Academy Logo"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-nunito font-extrabold text-white text-base tracking-tight">
                    Thinkers Base
                  </span>
                  <span className="font-poppins text-nursery text-[10px] tracking-widest uppercase">
                    Academy
                  </span>
                </div>
              </Link>

              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                {schoolInfo.description}
              </p>

              {/* Social Media */}
              <div className="flex gap-2">
                <SocialBtn
                  href="https://www.facebook.com/share/1CCEHrhTFm/"
                  icon={Facebook}
                  label="Facebook"
                />
                <SocialBtn
                  href="https://www.instagram.com/thinkersbaseacademyenugu?utm_source=qr&igsh=MWs2bDh0ZjU3eG81Mw=="
                  icon={Instagram}
                  label="Instagram"
                />
                <SocialBtn
                  href="mailto:thinkersbaseacademy@gmail.com"
                  icon={Mail}
                  label="Gmail"
                />
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <h4 className="font-nunito font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks
                  .filter((l) => !l.children)
                  .map((l) => (
                    <li key={l.href}>
                      <FooterLink href={l.href}>{l.label}</FooterLink>
                    </li>
                  ))}
                {/* Curriculum Hub — subtle staff portal link */}
                <li className="pt-2 border-t border-white/10 mt-2">
                  <Link
                    href="/curriculum"
                    className="inline-flex items-center gap-1.5 text-white/40 hover:text-nursery text-xs transition-colors duration-150"
                  >
                    <BookOpen className="w-3 h-3" />
                    Staff & Parent Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* ── Our School ── */}
            <div>
              <h4 className="font-nunito font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
                Our School
              </h4>
              <ul className="space-y-2">
                {stages.map((s) => (
                  <li key={s.id}>
                    <FooterLink href={s.href}>{s.label}</FooterLink>
                  </li>
                ))}
                <li>
                  <FooterLink href="/admissions">Admissions</FooterLink>
                </li>
                <li>
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li>
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                </li>
                <li>
                  <FooterLink href="/school-life">School Life</FooterLink>
                </li>
              </ul>
            </div>

            {/* ── Contact ── */}
            <div>
              <h4 className="font-nunito font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
                Contact
              </h4>
              <div className="space-y-3">
                <ContactRow icon={MapPin}>
                  {schoolInfo.address}
                </ContactRow>
                <ContactRow icon={Phone}>
                  <a href={`tel:${schoolInfo.phone}`} className="hover:text-nursery transition-colors">
                    {schoolInfo.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={Mail}>
                  <a href={`mailto:${schoolInfo.email}`} className="hover:text-nursery transition-colors break-all">
                    {schoolInfo.email}
                  </a>
                </ContactRow>
                <ContactRow icon={Clock}>
                  <span className="whitespace-pre-line">
                    {schoolInfo.hours}
                  </span>
                </ContactRow>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs">
              © {year} {schoolInfo.name}. All rights reserved.
            </p>
            <p className="text-white/25 text-xs">
              Designed with ❤️ for every child at TBA
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}