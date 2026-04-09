import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { User } from "@/models/User";
import { signToken, ADMIN_COOKIE, USER_COOKIE, MAX_AGE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  await connectDB();

  // Check admin first
  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    const token = signToken({ id: admin._id.toString(), email: admin.email, role: "admin" });
    const res = NextResponse.json({ success: true, role: "admin" });
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });
    return res;
  }

  // Check regular user
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = signToken({ id: user._id.toString(), email: user.email, role: "user" });
    const res = NextResponse.json({ success: true, role: "user" });
    res.cookies.set(USER_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
