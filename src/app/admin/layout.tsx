import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Villa Galle" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
