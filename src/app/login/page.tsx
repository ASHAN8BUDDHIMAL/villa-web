'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputCls = "w-full border border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-sand-400 focus:ring-2 focus:ring-sand-400/20 focus:bg-white transition-all duration-300 rounded-sm";

export default function LoginPage() {
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
      window.location.href = "/admin";
    } else {
      const text = await res.text();
      let msg = "Login failed";
      try { msg = JSON.parse(text).error ?? msg; } catch {}
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-12">
          <Link href="/" className="inline-flex flex-col items-center">
            <span className="font-display text-3xl text-ivory">Villa Galle</span>
            <span className="text-[10px] tracking-[0.35em] uppercase text-sand-500 mt-1.5">Southern Coast · Sri Lanka</span>
          </Link>
        </div>

        <div className="bg-ivory p-10">
          <h1 className="font-display text-2xl text-stone-800 mb-1">Welcome back</h1>
          <p className="text-sm text-stone-400 mb-10">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
              <p className="text-red-400 text-xs text-center bg-red-50 py-3 px-4 border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-sand-600 text-ivory text-[10px] tracking-[0.3em] uppercase hover:bg-sand-700 transition-all duration-500 disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-stone-400 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-sand-600 hover:text-sand-700 transition-colors duration-300">
              Register
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-stone-600 mt-6">
          <Link href="/" className="hover:text-stone-400 transition-colors duration-300 tracking-widest uppercase text-[10px]">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
