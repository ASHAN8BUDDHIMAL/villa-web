import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Room } from "@/models/Room";
import { verifyToken, USER_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const rooms = await Room.find().lean();
  return NextResponse.json(rooms);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE)?.value;
  if (!token || !verifyToken(token))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const room = await Room.create(body);
  return NextResponse.json(room, { status: 201 });
}
