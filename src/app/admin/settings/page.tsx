'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

type Feature      = { icon: string; title: string; desc: string };
type TimelineItem = { year: string; event: string };
type Value        = { title: string; desc: string };
type ContactDetail= { label: string; value: string; href: string };
type Faq          = { q: string; a: string };
type Amenity      = { title: string; desc: string };

type Content = {
  hero:      { tagline: string; title: string; subtitle: string; images: string[]; autoScroll: boolean; scrollInterval: number };
  intro:     string;
  features:  Feature[];
  quote:     string;
  cta:       { title: string; subtitle: string };
  about:     { story: string[]; timeline: TimelineItem[]; values: Value[] };
  contact:   { details: ContactDetail[]; faqs: Faq[] };
  amenities: Amenity[];
};

const inputCls    = "w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-sand-400 focus:bg-white transition-colors";
const labelCls    = "text-xs text-stone-500 uppercase tracking-widest mb-1 block";
const addBtnCls   = "text-xs text-sand-600 hover:text-sand-800 tracking-widest uppercase transition-colors border border-sand-300 hover:border-sand-500 px-3 py-1.5";
const removeBtnCls= "text-xs text-red-400 hover:text-red-600 tracking-widest uppercase transition-colors shrink-0";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-stone-200 p-6">
      <h2 className="font-display text-lg text-stone-800 mb-6 pb-3 border-b border-stone-100">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState("");

  useEffect(() => {
    fetch("/api/site-content").then(r => r.json()).then((data: Content) => {
      // ensure arrays exist
      data.features  = data.features  ?? [];
      data.amenities = data.amenities ?? [];
      data.about     = data.about     ?? { story: [], timeline: [], values: [] };
      data.about.story    = data.about.story    ?? [];
      data.about.timeline = data.about.timeline ?? [];
      data.about.values   = data.about.values   ?? [];
      data.contact   = data.contact   ?? { details: [], faqs: [] };
      data.contact.details = data.contact.details ?? [];
      data.contact.faqs    = data.contact.faqs    ?? [];
      setContent(data);
    });
  }, []);

  async function save() {
    setSaving(true); setMsg("");
    const res = await fetch("/api/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setMsg(res.ok ? "Saved successfully!" : "Failed to save.");
    setSaving(false);
  }

  // ── helpers ──
  const setHero = (k: keyof Content["hero"], v: string | boolean | number) =>
    setContent(c => c ? { ...c, hero: { ...c.hero, [k]: v } } : c);

  const setCta = (k: keyof Content["cta"], v: string) =>
    setContent(c => c ? { ...c, cta: { ...c.cta, [k]: v } } : c);

  function listSet<T>(key: keyof Content, idx: number, field: keyof T, val: string) {
    setContent(c => {
      if (!c) return c;
      const arr = [...(c[key] as T[])];
      arr[idx] = { ...arr[idx], [field]: val };
      return { ...c, [key]: arr };
    });
  }

  function listAdd<T>(key: keyof Content, item: T) {
    setContent(c => c ? { ...c, [key]: [...(c[key] as T[]), item] } : c);
  }

  function listRemove(key: keyof Content, idx: number) {
    setContent(c => c ? { ...c, [key]: (c[key] as unknown[]).filter((_, i) => i !== idx) } : c);
  }

  function nestedSet<K extends "about" | "contact">(section: K, sub: keyof Content[K], idx: number, field: string, val: string) {
    setContent(c => {
      if (!c) return c;
      const arr = [...(c[section][sub] as Record<string, string>[])];
      arr[idx] = { ...arr[idx], [field]: val };
      return { ...c, [section]: { ...c[section], [sub]: arr } };
    });
  }

  function nestedAdd<K extends "about" | "contact">(section: K, sub: keyof Content[K], item: object) {
    setContent(c => {
      if (!c) return c;
      return { ...c, [section]: { ...c[section], [sub]: [...(c[section][sub] as object[]), item] } };
    });
  }

  function nestedRemove<K extends "about" | "contact">(section: K, sub: keyof Content[K], idx: number) {
    setContent(c => {
      if (!c) return c;
      return { ...c, [section]: { ...c[section], [sub]: (c[section][sub] as unknown[]).filter((_, i) => i !== idx) } };
    });
  }

if (!content) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400 text-sm">Loading…</div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="font-display text-xl text-stone-800">Villa Galle</p>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Site Settings</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-2 bg-sand-600 text-ivory text-xs tracking-widest uppercase hover:bg-sand-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {msg && <p className={`text-xs ${msg.includes("success") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
          <button onClick={() => router.push("/admin")} className="text-xs text-stone-400 hover:text-stone-600 tracking-widest uppercase transition-colors">
            ← Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">

        {/* ── HERO ── */}
        <SectionCard title="Hero Section">
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
            <textarea rows={2} className={inputCls} value={content.hero.subtitle} onChange={e => setHero("subtitle", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Background Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(content.hero.images ?? []).map((url, i) => (
                <div key={i} className="relative group">
                  <ImageUpload value={url} onChange={newUrl => {
                    setContent(c => {
                      if (!c) return c;
                      const images = c.hero.images.map((u, idx) => idx === i ? newUrl : u);
                      return { ...c, hero: { ...c.hero, images } };
                    });
                  }} />
                  <button type="button" onClick={() => setContent(c => c ? { ...c, hero: { ...c.hero, images: c.hero.images.filter((_, idx) => idx !== i) } } : c)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    ✕
                  </button>
                </div>
              ))}
              <ImageUpload value="" onChange={url => setContent(c => c ? { ...c, hero: { ...c.hero, images: [...(c.hero.images ?? []), url] } } : c)} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={content.hero.autoScroll ?? true} onChange={e => setHero("autoScroll", e.target.checked)} className="w-4 h-4 accent-sand-600" />
              <span className="text-xs text-stone-600 uppercase tracking-widest">Auto Scroll</span>
            </label>
            {content.hero.autoScroll && (
              <label className="flex items-center gap-2">
                <span className="text-xs text-stone-500 uppercase tracking-widest">Interval (s)</span>
                <input type="number" min={2} max={30} className={`${inputCls} w-20`} value={content.hero.scrollInterval ?? 5} onChange={e => setHero("scrollInterval", Number(e.target.value))} />
              </label>
            )}
          </div>
        </SectionCard>

        {/* ── FEATURES ── */}
        <SectionCard title="Features Section">
          {content.features.map((f, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-start border-b border-stone-100 pb-4">
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={f.title} onChange={e => listSet<Feature>("features", i, "title", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <input className={inputCls} value={f.desc} onChange={e => listSet<Feature>("features", i, "desc", e.target.value)} />
              </div>
              <button onClick={() => listRemove("features", i)} className={`${removeBtnCls} mt-5`}>Remove</button>
            </div>
          ))}
          <button onClick={() => listAdd<Feature>("features", { icon: "", title: "", desc: "" })} className={addBtnCls}>+ Add Feature</button>
        </SectionCard>

        {/* ── CTA ── */}
        <SectionCard title="CTA Section">
          <div>
            <label className={labelCls}>Title</label>
            <input className={inputCls} value={content.cta.title} onChange={e => setCta("title", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Subtitle</label>
            <textarea rows={2} className={inputCls} value={content.cta.subtitle} onChange={e => setCta("subtitle", e.target.value)} />
          </div>
        </SectionCard>

        {/* ── CONTACT DETAILS ── */}
        <SectionCard title="Contact Details">
          {content.contact.details.map((d, i) => (
            <div key={i} className="grid grid-cols-[120px_1fr_1fr_auto] gap-3 items-start border-b border-stone-100 pb-4">
              <div>
                <label className={labelCls}>Label</label>
                <input className={inputCls} value={d.label} onChange={e => nestedSet("contact", "details", i, "label", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Value</label>
                <input className={inputCls} value={d.value} onChange={e => nestedSet("contact", "details", i, "value", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Link (href)</label>
                <input className={inputCls} value={d.href} placeholder="mailto: / tel: / blank" onChange={e => nestedSet("contact", "details", i, "href", e.target.value)} />
              </div>
              <button onClick={() => nestedRemove("contact", "details", i)} className={`${removeBtnCls} mt-5`}>Remove</button>
            </div>
          ))}
          <button onClick={() => nestedAdd("contact", "details", { label: "", value: "", href: "" })} className={addBtnCls}>+ Add Detail</button>
        </SectionCard>

        {/* ── AMENITIES ── */}
        <SectionCard title="Booking — Included Amenities">
          {content.amenities.map((a, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-start border-b border-stone-100 pb-4">
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={a.title} onChange={e => listSet<Amenity>("amenities", i, "title", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <input className={inputCls} value={a.desc} onChange={e => listSet<Amenity>("amenities", i, "desc", e.target.value)} />
              </div>
              <button onClick={() => listRemove("amenities", i)} className={`${removeBtnCls} mt-5`}>Remove</button>
            </div>
          ))}
          <button onClick={() => listAdd<Amenity>("amenities", { title: "", desc: "" })} className={addBtnCls}>+ Add Amenity</button>
        </SectionCard>

        {/* Bottom save */}
        <div className="flex items-center gap-4 pb-8">
          <button onClick={save} disabled={saving} className="px-8 py-3 bg-sand-600 text-ivory text-xs tracking-widest uppercase hover:bg-sand-700 transition-colors disabled:opacity-50">
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {msg && <p className={`text-xs ${msg.includes("success") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
        </div>

      </main>
    </div>
  );
}
