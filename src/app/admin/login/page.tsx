'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputCls = "w-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-sand-400 focus:bg-white transition-colors";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error ?? "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-display text-3xl text-ivory mb-1">Villa Galle</p>
          <p className="text-xs tracking-[0.3em] uppercase text-sand-400">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            autoComplete="email"
            className={inputCls}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className={inputCls}
          />
          {error && (
            <p className="text-red-500 text-xs text-center bg-red-50 py-2 px-3">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-sand-600 text-ivory text-xs tracking-widest uppercase hover:bg-sand-700 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-stone-600 mt-6">
          <a href="/" className="hover:text-stone-400 transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
