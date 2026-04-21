import { NextRequest, NextResponse } from "next/server";
import { verifyToken, USER_COOKIE } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
