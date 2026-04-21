import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GalleryPhoto } from "@/models/GalleryPhoto";
import { verifyToken, USER_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

function auth(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE)?.value;
  return token && verifyToken(token);
}

export async function GET() {
  await connectDB();
  const photos = await GalleryPhoto.find().sort({ order: 1 }).lean();
  return NextResponse.json(photos);
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const photo = await GalleryPhoto.create(body);
    return NextResponse.json(photo, { status: 201 });
  } catch (err) {
    console.error("[gallery POST] error:", err);
    return NextResponse.json({ error: "Failed to add photo" }, { status: 500 });
  }
}
