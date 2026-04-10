import { NextRequest, NextResponse } from "next/server";
import { verifyToken, ADMIN_COOKIE, USER_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const adminToken = req.cookies.get(ADMIN_COOKIE)?.value;
  const userToken  = req.cookies.get(USER_COOKIE)?.value;

  const payload = adminToken ? verifyToken(adminToken) : userToken ? verifyToken(userToken) : null;

  if (!payload) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ user: { id: payload.id, email: payload.email, role: payload.role } });
}
