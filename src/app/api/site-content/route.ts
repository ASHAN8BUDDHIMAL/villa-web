import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SiteContent } from "@/models/SiteContent";
import { verifyToken, USER_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  let content = await SiteContent.findOne();
  if (!content) content = await SiteContent.create({});
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const { _id, __v, createdAt, updatedAt, ...data } = body;
    const content = await SiteContent.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true }
    );
    return NextResponse.json(content);
  } catch (err) {
    console.error("[site-content PUT] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
