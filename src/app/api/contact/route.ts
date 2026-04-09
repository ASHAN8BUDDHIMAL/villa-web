import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message, checkIn, checkOut } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: integrate email provider (e.g. Resend, Nodemailer)
  console.log("Inquiry received:", { name, email, message, checkIn, checkOut });

  return NextResponse.json({ success: true });
}
