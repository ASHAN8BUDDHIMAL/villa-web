import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  const { name, email, message, checkIn, checkOut } = await req.json();

  if (!name || !email || !message)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  try {
    await connectDB();
    await Inquiry.create({ name, email, message, checkIn, checkOut });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact POST] error:", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
