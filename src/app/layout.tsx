import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import VillaLogo from "@/components/VillaLogo";

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
        <a
          href="https://wa.me/94710474331"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white pl-5 pr-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.428a.75.75 0 00.916.916l5.573-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.693 9.693 0 01-4.953-1.362l-.355-.211-3.676.970.985-3.595-.232-.369A9.693 9.693 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          <span className="text-sm font-bold tracking-wide">Contact Us</span>
        </a>

        <footer className="bg-stone-900 text-stone-400">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24 grid grid-cols-1 md:grid-cols-4 gap-14">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <VillaLogo color="#5B82B8" textColor="#FFFFFF" subColor="#ADBFDF" size={44} />
              </div>
              <p className="text-lg leading-relaxed text-stone-500 max-w-sm mb-6">
                An intimate escape where tropical gardens meet the Indian Ocean — crafted for those who seek stillness, beauty, and the unhurried pace of Sri Lankan coastal life.
              </p>
              <p className="text-base text-stone-600 leading-relaxed">
                Three private suites. Two acres of gardens.<br />One unforgettable experience.
              </p>
            </div>

            {/* Explore */}
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-sand-500 mb-7">Explore</p>
              <ul className="space-y-4">
                {[["Rooms", "/#rooms"], ["Gallery", "/#gallery"], ["About", "/#about"], ["Contact", "/#contact"]].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-stone-500 text-lg hover:text-ivory transition-colors duration-300">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-sand-500 mb-7">Contact</p>
              <ul className="space-y-4 text-stone-500">
                <li>
                  <a href="mailto:hello@villagalle.com" className="text-lg hover:text-ivory transition-colors duration-300">hello@villagalle.com</a>
                </li>
                <li>
                  <a href="tel:+94000000000" className="text-lg hover:text-ivory transition-colors duration-300">+94 00 000 0000</a>
                </li>
                <li className="text-lg leading-relaxed">
                  Galle, Southern Province<br />Sri Lanka
                </li>
                <li className="pt-2">
                  <Link href="/#contact" className="inline-block px-6 py-3 border border-sand-700 text-sand-500 text-sm tracking-[0.2em] uppercase hover:bg-sand-600 hover:text-ivory hover:border-sand-600 transition-all duration-500">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

          </div>
          <div className="border-t border-stone-800/60 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-base text-stone-500">
            <span>© {new Date().getFullYear()} Villa Galle. All rights reserved.</span>
            <span className="text-sm tracking-widest uppercase text-stone-600">Galle · Sri Lanka · Est. 2018</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
