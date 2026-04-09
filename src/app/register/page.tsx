'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputCls = "w-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-sand-400 focus:bg-white transition-colors";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = Object.fromEntries(new FormData(e.currentTarget));

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Registration failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center">
            <span className="font-display text-3xl text-stone-900">Villa Galle</span>
            <span className="text-xs tracking-[0.3em] uppercase text-sand-500 mt-1">Southern Coast · Sri Lanka</span>
          </Link>
        </div>

        <div className="bg-white border border-sand-100 p-8 shadow-sm">
          <h1 className="font-display text-2xl text-stone-800 mb-1">Create account</h1>
          <p className="text-sm text-stone-400 mb-8">Join us to make a reservation</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              type="text"
              placeholder="Full name"
              required
              autoComplete="name"
              className={inputCls}
            />
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
              minLength={8}
              autoComplete="new-password"
              className={inputCls}
            />
            <input
              name="confirm"
              type="password"
              placeholder="Confirm password"
              required
              autoComplete="new-password"
              className={inputCls}
            />

            {error && (
              <p className="text-red-500 text-xs text-center bg-red-50 py-2 px-3 border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-sand-600 text-ivory text-xs tracking-widest uppercase hover:bg-sand-700 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-stone-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-sand-600 hover:text-sand-800 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          <Link href="/" className="hover:text-stone-600 transition-colors">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
