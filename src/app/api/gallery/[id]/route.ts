import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GalleryPhoto } from "@/models/GalleryPhoto";
import { verifyToken, USER_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

function auth(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE)?.value;
  return token && verifyToken(token);
}

export async function DELETE(req: NextRequest, { params }: Context) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await connectDB();
    await GalleryPhoto.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[gallery DELETE] error:", err);
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}
