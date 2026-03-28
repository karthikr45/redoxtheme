import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".png";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      filename,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
