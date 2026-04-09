'use client'

import { useRouter } from "next/navigation";

const sections = [
  { label: "Manage Rooms",    desc: "Add, edit or remove room listings.",       href: "/admin/rooms",     icon: "🛏️" },
  { label: "Manage Gallery",  desc: "Upload and organise villa photos.",         href: "/admin/gallery",   icon: "🖼️" },
  { label: "Inquiries",       desc: "View and respond to booking inquiries.",    href: "/admin/inquiries", icon: "✉️" },
  { label: "Site Settings",   desc: "Update contact info and site content.",     href: "/admin/settings",  icon: "⚙️" },
];

export default function AdminDashboard() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-xl text-stone-800">Villa Galle</p>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" target="_blank" className="text-xs text-stone-400 hover:text-stone-600 transition-colors tracking-widest uppercase">
            View Site ↗
          </a>
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
            <a
              key={s.href}
              href={s.href}
              className="group bg-white border border-stone-200 p-6 hover:border-sand-400 hover:shadow-sm transition-all duration-200"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h2 className="font-display text-lg text-stone-800 mb-1 group-hover:text-sand-700 transition-colors">{s.label}</h2>
              <p className="text-sm text-stone-400">{s.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
