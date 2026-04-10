"use client";

import { useState } from "react";

const inputCls = "w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-sand-400 transition-colors";

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "sent" : "error");
  }

  if (status === "sent")
    return (
      <div className="bg-sand-100 p-10 text-center">
        <p className="text-2xl mb-3">✉️</p>
        <p className="font-display text-xl text-stone-800 mb-2">Inquiry Received</p>
        <p className="text-sm text-stone-500">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name"  placeholder="Full name"  required className={inputCls} />
        <input name="email" type="email" placeholder="Email address" required className={inputCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-400 tracking-widest uppercase">Check-in</label>
          <input name="checkIn"  type="date" required className={inputCls} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-stone-400 tracking-widest uppercase">Check-out</label>
          <input name="checkOut" type="date" required className={inputCls} />
        </div>
      </div>
      <select name="room" className={inputCls}>
        <option value="">Select a room (optional)</option>
        <option value="deluxe-suite">Deluxe Suite — $250/night</option>
        <option value="garden-room">Garden Room — $150/night</option>
        <option value="pool-villa">Pool Villa — $400/night</option>
      </select>
      <textarea name="message" placeholder="Special requests or questions…" rows={4} required className={inputCls} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-sand-600 text-ivory text-sm tracking-widest uppercase hover:bg-sand-700 transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </button>
      {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
    </form>
  );
}
