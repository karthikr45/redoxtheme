import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/data/content");

const VALID_SECTIONS = [
  "hero",
  "about",
  "services",
  "works",
  "cta",
  "footer",
  "marquee",
  "menu",
];

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");

  if (!section || !VALID_SECTIONS.includes(section)) {
    return NextResponse.json(
      { error: "Invalid section. Valid: " + VALID_SECTIONS.join(", ") },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(CONTENT_DIR, `${section}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");

  if (!section || !VALID_SECTIONS.includes(section)) {
    return NextResponse.json(
      { error: "Invalid section. Valid: " + VALID_SECTIONS.join(", ") },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const filePath = path.join(CONTENT_DIR, `${section}.json`);
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2) + "\n", "utf-8");
    return NextResponse.json({ success: true, message: `${section} content saved!` });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
