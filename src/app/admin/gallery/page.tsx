'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Photo = { _id: string; url: string; caption: string; order: number };
const empty = { url: "", caption: "", order: 0 };
const inputCls = "w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-sand-400 focus:bg-white transition-colors";
const labelCls = "text-xs text-stone-500 uppercase tracking-widest mb-1 block";

export default function AdminGalleryPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [form, setForm]     = useState(empty);
  const [msg, setMsg]       = useState("");

  async function load() {
    const res = await fetch("/api/gallery");
    setPhotos(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function add() {
    if (!form.url) return setMsg("Image URL is required.");
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { setMsg("Photo added!"); setForm(empty); load(); }
    else setMsg("Failed to add photo.");
  }

  async function remove(id: string) {
    if (!confirm("Delete this photo?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-xl text-stone-800">Villa Galle</p>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Manage Gallery</p>
        </div>
        <button onClick={() => router.push("/admin")} className="text-xs text-stone-400 hover:text-stone-600 tracking-widest uppercase transition-colors">
          ← Dashboard
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Add photo form */}
        <section className="bg-white border border-stone-200 p-6">
          <h2 className="font-display text-lg text-stone-800 mb-6">Add Photo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Image URL</label>
              <input className={inputCls} value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <label className={labelCls}>Caption</label>
              <input className={inputCls} value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Order</label>
              <input type="number" className={inputCls} value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <button onClick={add} className="px-6 py-2.5 bg-sand-600 text-ivory text-xs tracking-widest uppercase hover:bg-sand-700 transition-colors">
              Add Photo
            </button>
            {msg && <p className="text-xs text-green-600">{msg}</p>}
          </div>
        </section>

        {/* Photo grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.length === 0 && <p className="text-sm text-stone-400 col-span-3">No photos yet.</p>}
          {photos.map(photo => (
            <div key={photo._id} className="relative group bg-white border border-stone-200 overflow-hidden">
              <div className="relative aspect-square">
                <Image src={photo.url} alt={photo.caption} fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-2 flex items-center justify-between">
                <p className="text-xs text-stone-500 truncate">{photo.caption || "No caption"}</p>
                <button onClick={() => remove(photo._id)} className="text-xs text-red-400 hover:text-red-600 tracking-widest uppercase transition-colors ml-2 shrink-0">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
