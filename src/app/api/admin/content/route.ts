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
  "site-settings",
  "about-page",
  "about-details",
  "blog-section",
  "contact-page",
  "team-page",
  "faq-page",
  "admin-users",
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
  // Check auth for write operations
  const session = request.cookies.get("admin_session")?.value;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please login at /admin/login" }, { status: 401 });
  }

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
