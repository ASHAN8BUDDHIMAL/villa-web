"use client";

import { useState } from "react";

const inputCls = "w-full border border-stone-200 bg-white px-6 py-5 text-base text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-sand-400 focus:ring-2 focus:ring-sand-400/20 transition-all duration-300 rounded-sm";
const labelCls = "text-xs text-stone-400 tracking-[0.2em] uppercase mb-2 block";

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
      <div className="bg-sand-100 p-16 text-center">
        <div className="w-14 h-px bg-sand-400 mx-auto mb-10" />
        <p className="font-display text-3xl text-stone-800 mb-4">Inquiry Received</p>
        <p className="text-lg text-stone-400 leading-relaxed max-w-xs mx-auto">Thank you. Our team will be in touch within 24 hours with availability and details.</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelCls}>Check-in</label>
          <input name="checkIn" type="date" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Check-out</label>
          <input name="checkOut" type="date" required className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Room Preference</label>
        <select name="room" className={inputCls}>
          <option value="">No preference</option>
          <option value="deluxe-suite">Deluxe Suite — $250 / night</option>
          <option value="garden-room">Garden Room — $150 / night</option>
          <option value="pool-villa">Pool Villa — $400 / night</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Message</label>
        <textarea name="message" placeholder="Special requests or questions…" rows={6} required className={inputCls} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-5 bg-sand-600 text-ivory text-sm tracking-[0.25em] uppercase hover:bg-sand-700 transition-all duration-500 disabled:opacity-50 mt-2"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </button>
      {status === "error" && <p className="text-red-400 text-xs text-center tracking-wide">Something went wrong. Please try again.</p>}
    </form>
  );
}
