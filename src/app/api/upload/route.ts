import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyToken, USER_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE)?.value;
  if (!token || !verifyToken(token))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "villa-galle" }, (err, result) => {
        if (err || !result) return reject(err);
        resolve(result.secure_url);
      }).end(buffer);
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[upload] error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
