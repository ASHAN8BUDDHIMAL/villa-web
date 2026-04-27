'use client'

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const isValid = value.startsWith("http://") || value.startsWith("https://");

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => inputRef.current?.click()}
        className="relative w-full h-40 border-2 border-dashed border-stone-200 bg-stone-50 flex items-center justify-center cursor-pointer hover:border-sand-400 transition-colors overflow-hidden"
      >
        {isValid ? (
          <Image src={value} alt="preview" fill className="object-cover" sizes="400px" />
        ) : (
          <div className="text-center text-stone-400">
            <p className="text-2xl mb-1">📷</p>
            <p className="text-xs tracking-widest uppercase">{uploading ? "Uploading…" : "Click to select image"}</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <p className="text-xs text-stone-500 tracking-widest uppercase">Uploading…</p>
          </div>
        )}
      </div>
      {isValid && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs text-stone-400 hover:text-stone-600 tracking-widest uppercase transition-colors text-left"
        >
          Change image
        </button>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}
