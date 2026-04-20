import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Room } from "@/models/Room";
import { verifyToken, USER_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

function auth(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE)?.value;
  return token && verifyToken(token);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const room = await Room.findByIdAndUpdate(params.id, await req.json(), { new: true });
  return NextResponse.json(room);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  await Room.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
