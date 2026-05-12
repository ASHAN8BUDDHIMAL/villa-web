import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterWrapper from "@/components/FooterWrapper";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Villa Galle — Luxury Retreat, Sri Lanka",
  description: "A boutique luxury villa on the southern coast of Sri Lanka.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <Navbar />
        <div className="flex-1">{children}</div>

        {/* ── WHATSAPP FLOAT ── */}
        <FooterWrapper />
        <Footer />
      </body>
    </html>
  );
}
