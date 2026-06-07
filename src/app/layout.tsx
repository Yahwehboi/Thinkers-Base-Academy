import { Nunito, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Thinkers Base Academy — Every Child Belongs Here",
  description:
    "Thinkers Base Academy is a nurturing nursery and primary school in Enugu, Nigeria. We offer world-class education from Playgroup through Grade School — building confident, curious and compassionate young leaders.",
  keywords: [
    "Thinkers Base Academy",
    "primary school Enugu",
    "nursery school Enugu",
    "best school Enugu",
    "Trans-Ekulu school",
    "New GRA school Enugu",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Thinkers Base Academy — Every Child Belongs Here",
    description:
      "A nurturing school community in Enugu where every child grows into a confident, curious and compassionate leader.",
    siteName: "Thinkers Base Academy",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${poppins.variable} bg-cream font-poppins text-charcoal`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}