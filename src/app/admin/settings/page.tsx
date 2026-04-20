'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Feature = { icon: string; title: string; desc: string };
type Content = {
  hero:     { tagline: string; title: string; subtitle: string };
  features: Feature[];
  cta:      { title: string; subtitle: string };
};

const inputCls = "w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-sand-400 focus:bg-white transition-colors";
const labelCls = "text-xs text-stone-500 uppercase tracking-widest mb-1 block";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState("");

  useEffect(() => {
    fetch("/api/site-content").then(r => r.json()).then(setContent);
  }, []);

  async function save() {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setMsg(res.ok ? "Saved successfully!" : "Failed to save.");
    setSaving(false);
  }

  function setHero(key: keyof Content["hero"], val: string) {
    setContent(c => c ? { ...c, hero: { ...c.hero, [key]: val } } : c);
  }

  function setCta(key: keyof Content["cta"], val: string) {
    setContent(c => c ? { ...c, cta: { ...c.cta, [key]: val } } : c);
  }

  function setFeature(i: number, key: keyof Feature, val: string) {
    setContent(c => {
      if (!c) return c;
      const features = c.features.map((f, idx) => idx === i ? { ...f, [key]: val } : f);
      return { ...c, features };
    });
  }

  if (!content) return <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400 text-sm">Loading…</div>;

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-xl text-stone-800">Villa Galle</p>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Site Settings</p>
        </div>
        <button onClick={() => router.push("/admin")} className="text-xs text-stone-400 hover:text-stone-600 tracking-widest uppercase transition-colors">
          ← Dashboard
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Hero */}
        <section className="bg-white border border-stone-200 p-6">
          <h2 className="font-display text-lg text-stone-800 mb-6">Hero Section</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelCls}>Tagline</label>
              <input className={inputCls} value={content.hero.tagline} onChange={e => setHero("tagline", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Title</label>
              <input className={inputCls} value={content.hero.title} onChange={e => setHero("title", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Subtitle</label>
              <textarea rows={3} className={inputCls} value={content.hero.subtitle} onChange={e => setHero("subtitle", e.target.value)} />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white border border-stone-200 p-6">
          <h2 className="font-display text-lg text-stone-800 mb-6">Features</h2>
          <div className="flex flex-col gap-6">
            {content.features.map((f, i) => (
              <div key={i} className="grid grid-cols-[60px_1fr_1fr] gap-3 items-start">
                <div>
                  <label className={labelCls}>Icon</label>
                  <input className={inputCls} value={f.icon} onChange={e => setFeature(i, "icon", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Title</label>
                  <input className={inputCls} value={f.title} onChange={e => setFeature(i, "title", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Description</label>
                  <input className={inputCls} value={f.desc} onChange={e => setFeature(i, "desc", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border border-stone-200 p-6">
          <h2 className="font-display text-lg text-stone-800 mb-6">CTA Section</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelCls}>Title</label>
              <input className={inputCls} value={content.cta.title} onChange={e => setCta("title", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Subtitle</label>
              <textarea rows={3} className={inputCls} value={content.cta.subtitle} onChange={e => setCta("subtitle", e.target.value)} />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="px-8 py-3 bg-sand-600 text-ivory text-xs tracking-widest uppercase hover:bg-sand-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {msg && <p className={`text-xs ${msg.includes("success") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
        </div>
      </main>
    </div>
  );
}
