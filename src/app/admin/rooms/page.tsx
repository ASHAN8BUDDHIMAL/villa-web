'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

type Room = { _id: string; name: string; price: number; image: string; description: string };
const empty = { name: "", price: 0, image: "", description: "" };
const inputCls = "w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-sand-400 focus:bg-white transition-colors";
const labelCls = "text-xs text-stone-500 uppercase tracking-widest mb-1 block";

export default function AdminRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms]     = useState<Room[]>([]);
  const [form, setForm]       = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg]         = useState("");

  async function load() {
    const res = await fetch("/api/rooms");
    setRooms(await res.json());
  }

  useEffect(() => { load(); }, []);

  function startEdit(room: Room) {
    setEditing(room._id);
    setForm({ name: room.name, price: room.price, image: room.image, description: room.description });
  }

  function cancel() { setEditing(null); setForm(empty); }

  async function save() {
    if (!form.name || !form.image || !form.description || !form.price)
      return setMsg("All fields are required.");
    const url    = editing ? `/api/rooms/${editing}` : "/api/rooms";
    const method = editing ? "PUT" : "POST";
    const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setMsg(editing ? "Updated!" : "Added!"); cancel(); load(); }
    else setMsg("Failed.");
  }

  async function remove(id: string) {
    if (!confirm("Delete this room?")) return;
    await fetch(`/api/rooms/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-xl text-stone-800">Villa Galle</p>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Manage Rooms</p>
        </div>
        <button onClick={() => router.push("/admin")} className="text-xs text-stone-400 hover:text-stone-600 tracking-widest uppercase transition-colors">
          ← Dashboard
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Form */}
        <section className="bg-white border border-stone-200 p-6">
          <h2 className="font-display text-lg text-stone-800 mb-6">{editing ? "Edit Room" : "Add New Room"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Name</label>
              <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Price / night ($)</label>
              <input type="number" className={inputCls} value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Image</label>
              <ImageUpload value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea rows={3} className={inputCls} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <button onClick={save} className="px-6 py-2.5 bg-sand-600 text-ivory text-xs tracking-widest uppercase hover:bg-sand-700 transition-colors">
              {editing ? "Update Room" : "Add Room"}
            </button>
            {editing && <button onClick={cancel} className="px-6 py-2.5 border border-stone-200 text-stone-500 text-xs tracking-widest uppercase hover:bg-stone-50 transition-colors">Cancel</button>}
            {msg && <p className={`text-xs ${msg === "Added!" || msg === "Updated!" ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
          </div>
        </section>

        {/* Room list */}
        <section className="flex flex-col gap-3">
          {rooms.length === 0 && <p className="text-sm text-stone-400">No rooms yet. Add one above.</p>}
          {rooms.map(room => (
            <div key={room._id} className="bg-white border border-stone-200 p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-stone-800">{room.name}</p>
                <p className="text-xs text-stone-400">${room.price} / night · {room.description}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => startEdit(room)} className="text-xs text-sand-600 hover:text-sand-800 tracking-widest uppercase transition-colors">Edit</button>
                <button onClick={() => remove(room._id)} className="text-xs text-red-400 hover:text-red-600 tracking-widest uppercase transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
