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

  await connectDB();
  const body = await req.json();
  let content = await SiteContent.findOne();
  if (!content) content = await SiteContent.create(body);
  else { Object.assign(content, body); await content.save(); }

  return NextResponse.json(content);
}
