"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #52B788 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-white/50 text-xs font-poppins mb-4"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Privacy Policy</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-nunito font-extrabold text-4xl sm:text-5xl text-white mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-poppins text-white/75 text-base"
          >
            Last updated: August 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-card p-8 sm:p-12 space-y-10 font-poppins text-charcoal/75 text-sm leading-relaxed"
          >

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">1. Introduction</h2>
              <p>
                Thinkers Base Academy ("we", "our" or "the school") is committed to protecting the privacy of all individuals who interact with our website at{" "}
                <a href="https://www.thinkersbaseacademy.com" className="text-leaf underline">
                  www.thinkersbaseacademy.com
                </a>
                . This Privacy Policy explains what information we collect, how we use it, and your rights regarding your personal data.
              </p>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information when you visit our website or contact us:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Contact information</strong> — your name, email address, phone number, and any message you send us through our contact form.</li>
                <li><strong>Enquiry details</strong> — information about your child such as their age or the class you are enquiring about, provided voluntarily by you.</li>
                <li><strong>Usage data</strong> — general information about how you use our website (pages visited, time spent), collected automatically through analytics tools.</li>
                <li><strong>Curriculum Hub credentials</strong> — usernames and encrypted passwords for parents, teachers and administrators who access our Curriculum Hub.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Respond to your enquiries and admissions requests</li>
                <li>Provide access to the Curriculum Hub for authorised users</li>
                <li>Improve the content and experience of our website</li>
                <li>Send important school communications where you have given consent</li>
                <li>Comply with our legal and regulatory obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">4. Data Storage and Security</h2>
              <p>
                Your data is stored securely using industry-standard measures. Curriculum Hub data is stored in a secure database. Passwords are encrypted and never stored in plain text. We do not sell, trade or rent your personal information to any third party.
              </p>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">5. Children&apos;s Privacy</h2>
              <p>
                We do not knowingly collect personal information directly from children. Any information relating to a child is provided by their parent or guardian and is used solely for the purpose of school enrolment and communication. We handle all child-related data with the highest level of care and confidentiality.
              </p>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">6. Third-Party Services</h2>
              <p className="mb-3">Our website uses the following third-party services which may process data on our behalf:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Vercel</strong> — website hosting</li>
                <li><strong>Cloudinary</strong> — file and image storage for curriculum resources</li>
                <li><strong>Neon</strong> — secure database hosting</li>
                <li><strong>Google Analytics</strong> — anonymous website usage statistics</li>
              </ul>
              <p className="mt-3">Each of these services has their own privacy policy and we encourage you to review them.</p>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">7. Cookies</h2>
              <p>
                Our website may use cookies to improve your browsing experience. Cookies are small files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some parts of our website may not function properly without cookies.
              </p>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">8. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Request access to the personal data we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data where it is no longer necessary</li>
                <li>Withdraw consent for communications at any time</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, please contact us using the details below.</p>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this page periodically.
              </p>
            </div>

            <div>
              <h2 className="font-nunito font-extrabold text-forest text-xl mb-3">10. Contact Us</h2>
              <p className="mb-2">If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="space-y-1 ml-2">
                <li><strong>School:</strong> Thinkers Base Academy</li>
                <li><strong>Email:</strong> thinkersbaseacademy@gmail.com</li>
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a href="https://wa.me/2348037134462" className="text-leaf underline">
                    +234 803 713 4462
                  </a>
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a href="https://www.thinkersbaseacademy.com" className="text-leaf underline">
                    www.thinkersbaseacademy.com
                  </a>
                </li>
              </ul>
            </div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}