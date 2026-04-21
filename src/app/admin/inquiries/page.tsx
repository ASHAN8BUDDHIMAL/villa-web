'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Inquiry = { _id: string; name: string; email: string; message: string; checkIn: string; checkOut: string; createdAt: string };

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch("/api/contact").then(r => r.json()).then(setInquiries);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-xl text-stone-800">Villa Galle</p>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Inquiries</p>
        </div>
        <button onClick={() => router.push("/admin")} className="text-xs text-stone-400 hover:text-stone-600 tracking-widest uppercase transition-colors">
          ← Dashboard
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-4">
        {inquiries.length === 0 && <p className="text-sm text-stone-400">No inquiries yet.</p>}
        {inquiries.map(inq => (
          <div key={inq._id} className="bg-white border border-stone-200 p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-display text-stone-800">{inq.name}</p>
                <a href={`mailto:${inq.email}`} className="text-xs text-sand-600 hover:underline">{inq.email}</a>
              </div>
              <p className="text-xs text-stone-400 shrink-0">{new Date(inq.createdAt).toLocaleDateString()}</p>
            </div>
            {(inq.checkIn || inq.checkOut) && (
              <p className="text-xs text-stone-400 mb-2">
                {inq.checkIn && <>Check-in: {inq.checkIn}</>}
                {inq.checkIn && inq.checkOut && " · "}
                {inq.checkOut && <>Check-out: {inq.checkOut}</>}
              </p>
            )}
            <p className="text-sm text-stone-600 leading-relaxed">{inq.message}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
