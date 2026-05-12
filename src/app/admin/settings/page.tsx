'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

type Feature       = { icon: string; title: string; desc: string };
type ContactDetail = { label: string; value: string; href: string };
type Faq           = { q: string; a: string };
type Inclusion     = { label: string };

type Content = {
  hero:     { tagline: string; title: string; subtitle: string; images: string[]; autoScroll: boolean; scrollInterval: number };
  features: Feature[];
  whyUs:    { heading: string; body1: string; body2: string; inclusions: Inclusion[] };
  contact:  { heading: string; subtitle: string; details: ContactDetail[]; faqs: Faq[] };
  footer:   { brandText: string; tagline: string };
};

const inputCls     = "w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-sand-400 focus:bg-white transition-colors";
const labelCls     = "text-xs text-stone-500 uppercase tracking-widest mb-1 block";
const addBtnCls    = "text-xs text-sand-600 hover:text-sand-800 tracking-widest uppercase transition-colors border border-sand-300 hover:border-sand-500 px-3 py-1.5";
const removeBtnCls = "text-xs text-red-400 hover:text-red-600 tracking-widest uppercase transition-colors shrink-0";

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
    fetch("/api/site-content").then(r => r.json()).then((raw: Partial<Content>) => {
      setContent({
        hero: raw.hero ?? { tagline: "", title: "", subtitle: "", images: [], autoScroll: true, scrollInterval: 5 },
        features: raw.features ?? [],
        whyUs: {
          heading:    raw.whyUs?.heading    ?? "",
          body1:      raw.whyUs?.body1      ?? "",
          body2:      raw.whyUs?.body2      ?? "",
          inclusions: raw.whyUs?.inclusions ?? [],
        },
        contact: {
          heading:  raw.contact?.heading  ?? "",
          subtitle: raw.contact?.subtitle ?? "",
          details:  raw.contact?.details  ?? [],
          faqs:     raw.contact?.faqs     ?? [],
        },
        footer: {
          brandText: raw.footer?.brandText ?? "",
          tagline:   raw.footer?.tagline   ?? "",
        },
      });
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

  if (!content) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400 text-sm">Loading…</div>
  );

  // ── helpers ──
  const setHero = (k: keyof Content["hero"], v: string | boolean | number) =>
    setContent(c => c ? { ...c, hero: { ...c.hero, [k]: v } } : c);

  const setWhyUs = (k: keyof Content["whyUs"], v: string) =>
    setContent(c => c ? { ...c, whyUs: { ...c.whyUs, [k]: v } } : c);

  const setContactMeta = (k: "heading" | "subtitle", v: string) =>
    setContent(c => c ? { ...c, contact: { ...c.contact, [k]: v } } : c);

  const setFooter = (k: keyof Content["footer"], v: string) =>
    setContent(c => c ? { ...c, footer: { ...c.footer, [k]: v } } : c);

  // features
  const updateFeature = (i: number, k: keyof Feature, v: string) =>
    setContent(c => { if (!c) return c; const a = [...c.features]; a[i] = { ...a[i], [k]: v }; return { ...c, features: a }; });
  const removeFeature = (i: number) =>
    setContent(c => c ? { ...c, features: c.features.filter((_, idx) => idx !== i) } : c);

  // inclusions
  const updateInclusion = (i: number, v: string) =>
    setContent(c => { if (!c) return c; const a = [...c.whyUs.inclusions]; a[i] = { label: v }; return { ...c, whyUs: { ...c.whyUs, inclusions: a } }; });
  const removeInclusion = (i: number) =>
    setContent(c => c ? { ...c, whyUs: { ...c.whyUs, inclusions: c.whyUs.inclusions.filter((_, idx) => idx !== i) } } : c);

  // contact details
  const updateDetail = (i: number, k: keyof ContactDetail, v: string) =>
    setContent(c => { if (!c) return c; const a = [...c.contact.details]; a[i] = { ...a[i], [k]: v }; return { ...c, contact: { ...c.contact, details: a } }; });
  const removeDetail = (i: number) =>
    setContent(c => c ? { ...c, contact: { ...c.contact, details: c.contact.details.filter((_, idx) => idx !== i) } } : c);

  // faqs
  const updateFaq = (i: number, k: keyof Faq, v: string) =>
    setContent(c => { if (!c) return c; const a = [...c.contact.faqs]; a[i] = { ...a[i], [k]: v }; return { ...c, contact: { ...c.contact, faqs: a } }; });
  const removeFaq = (i: number) =>
    setContent(c => c ? { ...c, contact: { ...c.contact, faqs: c.contact.faqs.filter((_, idx) => idx !== i) } } : c);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="font-display text-xl text-stone-800">Villa Galle</p>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Site Settings</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={save} disabled={saving} className="px-6 py-2 bg-sand-600 text-ivory text-xs tracking-widest uppercase hover:bg-sand-700 transition-colors disabled:opacity-50">
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
                <input className={inputCls} value={f.title} onChange={e => updateFeature(i, "title", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <input className={inputCls} value={f.desc} onChange={e => updateFeature(i, "desc", e.target.value)} />
              </div>
              <button onClick={() => removeFeature(i)} className={`${removeBtnCls} mt-5`}>Remove</button>
            </div>
          ))}
          <button onClick={() => setContent(c => c ? { ...c, features: [...c.features, { icon: "", title: "", desc: "" }] } : c)} className={addBtnCls}>+ Add Feature</button>
        </SectionCard>

        {/* ── WHY CHOOSE US ── */}
        <SectionCard title="Why Choose Us">
          <div>
            <label className={labelCls}>Heading</label>
            <input className={inputCls} value={content.whyUs.heading} onChange={e => setWhyUs("heading", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Paragraph 1</label>
            <textarea rows={3} className={inputCls} value={content.whyUs.body1} onChange={e => setWhyUs("body1", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Paragraph 2</label>
            <textarea rows={3} className={inputCls} value={content.whyUs.body2} onChange={e => setWhyUs("body2", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Inclusions</label>
            {content.whyUs.inclusions.map((inc, i) => (
              <div key={i} className="flex gap-3 items-center border-b border-stone-100 pb-3 mb-3">
                <input className={`${inputCls} flex-1`} value={inc.label} onChange={e => updateInclusion(i, e.target.value)} />
                <button onClick={() => removeInclusion(i)} className={removeBtnCls}>Remove</button>
              </div>
            ))}
            <button onClick={() => setContent(c => c ? { ...c, whyUs: { ...c.whyUs, inclusions: [...c.whyUs.inclusions, { label: "" }] } } : c)} className={addBtnCls}>+ Add Inclusion</button>
          </div>
        </SectionCard>

        {/* ── CONTACT US ── */}
        <SectionCard title="Contact Us Section">
          <div>
            <label className={labelCls}>Heading</label>
            <input className={inputCls} value={content.contact.heading} onChange={e => setContactMeta("heading", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Subtitle</label>
            <textarea rows={2} className={inputCls} value={content.contact.subtitle} onChange={e => setContactMeta("subtitle", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Contact Details</label>
            {content.contact.details.map((d, i) => (
              <div key={i} className="grid grid-cols-[120px_1fr_1fr_auto] gap-3 items-end border-b border-stone-100 pb-4 mb-2">
                <div>
                  <label className={labelCls}>Label</label>
                  <input className={inputCls} value={d.label} onChange={e => updateDetail(i, "label", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Value</label>
                  <input className={inputCls} value={d.value} onChange={e => updateDetail(i, "value", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Link (href)</label>
                  <input className={inputCls} value={d.href} placeholder="mailto: / tel: / leave blank" onChange={e => updateDetail(i, "href", e.target.value)} />
                </div>
                <button onClick={() => removeDetail(i)} className={`${removeBtnCls} pb-2`}>Remove</button>
              </div>
            ))}
            <button onClick={() => setContent(c => c ? { ...c, contact: { ...c.contact, details: [...c.contact.details, { label: "", value: "", href: "" }] } } : c)} className={addBtnCls}>+ Add Detail</button>
          </div>
          <div>
            <label className={labelCls}>FAQs</label>
            {content.contact.faqs.map((faq, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end border-b border-stone-100 pb-4 mb-2">
                <div>
                  <label className={labelCls}>Question</label>
                  <input className={inputCls} value={faq.q} onChange={e => updateFaq(i, "q", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Answer</label>
                  <input className={inputCls} value={faq.a} onChange={e => updateFaq(i, "a", e.target.value)} />
                </div>
                <button onClick={() => removeFaq(i)} className={`${removeBtnCls} pb-2`}>Remove</button>
              </div>
            ))}
            <button onClick={() => setContent(c => c ? { ...c, contact: { ...c.contact, faqs: [...c.contact.faqs, { q: "", a: "" }] } } : c)} className={addBtnCls}>+ Add FAQ</button>
          </div>
        </SectionCard>

        {/* ── FOOTER ── */}
        <SectionCard title="Footer">
          <div>
            <label className={labelCls}>Brand Description</label>
            <textarea rows={3} className={inputCls} value={content.footer.brandText} onChange={e => setFooter("brandText", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Tagline (bottom line)</label>
            <input className={inputCls} value={content.footer.tagline} onChange={e => setFooter("tagline", e.target.value)} />
          </div>
        </SectionCard>

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
