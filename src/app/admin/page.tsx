'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";

const sections = [
  { label: "Manage Rooms",   desc: "Add, edit or remove room listings.",      href: "/admin/rooms",     bg: "bg-stone-800" },
  { label: "Manage Gallery", desc: "Upload and organise villa photos.",        href: "/admin/gallery",   bg: "bg-stone-700" },
  { label: "Inquiries",      desc: "View and respond to booking inquiries.",   href: "/admin/inquiries", bg: "bg-sand-700" },
  { label: "Site Settings",  desc: "Update contact info and site content.",    href: "/admin/settings",  bg: "bg-sand-600" },
];

export default function AdminDashboard() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-xl text-stone-800">Villa Galle</p>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xs text-stone-400 hover:text-stone-600 transition-colors tracking-widest uppercase">
            View Site ↗
          </Link>
          <button
            onClick={logout}
            className="text-xs text-red-400 hover:text-red-600 transition-colors tracking-widest uppercase"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl text-stone-800 mb-2">Welcome back</h1>
        <p className="text-stone-400 text-sm mb-10">Manage your villa content from here.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="group overflow-hidden border border-stone-200 hover:shadow-md transition-all duration-200"
            >
              <div className={`${s.bg} h-2 w-full`} />
              <div className="bg-white p-6">
                <h2 className="font-display text-lg text-stone-800 mb-1 group-hover:text-sand-700 transition-colors">{s.label}</h2>
                <p className="text-sm text-stone-400">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
