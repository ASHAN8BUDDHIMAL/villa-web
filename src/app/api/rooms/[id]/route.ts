import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Room } from "@/models/Room";
import { verifyToken, USER_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

function auth(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE)?.value;
  return token && verifyToken(token);
}

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;
  await connectDB();
  const room = await Room.findById(id).lean();
  if (!room) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(room);
}

export async function PUT(req: NextRequest, { params }: Context) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await connectDB();
    const room = await Room.findByIdAndUpdate(id, await req.json(), { new: true });
    if (!room) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(room);
  } catch (err) {
    console.error("[rooms PUT] error:", err);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Context) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await connectDB();
    await Room.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[rooms DELETE] error:", err);
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
}
