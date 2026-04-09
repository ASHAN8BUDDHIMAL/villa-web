import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Villa Galle — Luxury Retreat, Sri Lanka",
  description: "A boutique luxury villa on the southern coast of Sri Lanka.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="bg-stone-900 text-stone-400">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="font-display text-xl text-ivory mb-1">Villa Galle</p>
              <p className="text-xs tracking-[0.2em] uppercase text-sand-400 mb-4">Southern Coast · Sri Lanka</p>
              <p className="text-sm leading-relaxed">An intimate escape where tropical gardens meet the Indian Ocean.</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-sand-400 mb-4">Navigate</p>
              <ul className="space-y-2 text-sm">
                {[["Rooms", "/rooms"], ["Gallery", "/gallery"], ["About", "/about"], ["Contact", "/contact"], ["Book Now", "/book"]].map(([label, href]) => (
                  <li key={href}><a href={href} className="hover:text-ivory transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-sand-400 mb-4">Contact</p>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:hello@villagalle.com" className="hover:text-ivory transition-colors">hello@villagalle.com</a></li>
                <li><a href="tel:+94000000000" className="hover:text-ivory transition-colors">+94 00 000 0000</a></li>
                <li>Galle, Southern Province, Sri Lanka</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 px-6 py-4 text-center text-xs text-stone-600">
            © {new Date().getFullYear()} Villa Galle. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
