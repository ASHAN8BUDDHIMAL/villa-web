'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { id: string; email: string; role: "admin" | "user" } | null;

export function useAuth(options?: { required?: boolean; redirectTo?: string }) {
  const router  = useRouter();
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const { user } = await res.json();
        setUser(user);
      } else {
        setUser(null);
        if (options?.required) {
          router.replace(options.redirectTo ?? "/login");
        }
      }
      setLoading(false);
    }
    check();
  }, [options?.required, options?.redirectTo, router]);

  return { user, loading };
}
