import { NextRequest, NextResponse } from "next/server";
import { verifyToken, ADMIN_COOKIE, USER_COOKIE } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Protect user-only routes (e.g. /account, /bookings)
  const userProtected = ["/account", "/bookings"];
  if (userProtected.some(p => pathname.startsWith(p))) {
    const token = req.cookies.get(USER_COOKIE)?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/bookings/:path*"],
};
