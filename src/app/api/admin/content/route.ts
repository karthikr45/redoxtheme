import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import fs from "fs";
import path from "path";

// Map custom section names to Payload global slugs
const SECTION_TO_SLUG: Record<string, string> = {
  hero: "hero-section",
  about: "about-section",
  services: "services-section",
  works: "works-section",
  cta: "cta-section",
  marquee: "marquee-section",
  footer: "footer-section",
  menu: "navigation",
  "about-page": "about-page",
  "contact-page": "contact-page",
  "team-page": "team-page",
  "faq-page": "faq-page",
};

// Sections that still use JSON files (no Payload global)
const JSON_ONLY_SECTIONS = ["site-settings", "admin-users"];
const CONTENT_DIR = path.join(process.cwd(), "src/data/content");

// Transform Payload navigation data to match the menu format the frontend expects
function transformNavForFrontend(data: Record<string, unknown>) {
  if (data.menuItems) return data.menuItems;
  return data;
}

// Transform frontend menu format back to Payload navigation format
function transformNavForPayload(data: unknown) {
  if (Array.isArray(data)) return { menuItems: data };
  return data;
}

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");
  if (!section) {
    return NextResponse.json({ error: "Missing section parameter" }, { status: 400 });
  }

  // JSON-only sections
  if (JSON_ONLY_SECTIONS.includes(section)) {
    try {
      const filePath = path.join(CONTENT_DIR, `${section}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
    }
  }

  const slug = SECTION_TO_SLUG[section];
  if (!slug) {
    return NextResponse.json({ error: `Invalid section: ${section}` }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({ slug: slug as "hero-section" });

    // Strip Payload internal fields for clean frontend data
    const { id, globalType, createdAt, updatedAt, ...cleanData } = data as Record<string, unknown>;
    void id; void globalType; void createdAt; void updatedAt;

    // Special handling for navigation/menu
    if (section === "menu") {
      return NextResponse.json(transformNavForFrontend(cleanData));
    }

    return NextResponse.json(cleanData);
  } catch {
    // Fallback to JSON file if Payload fails
    try {
      const filePath = path.join(CONTENT_DIR, `${section}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please login at /admin/login" }, { status: 401 });
  }

  const section = request.nextUrl.searchParams.get("section");
  if (!section) {
    return NextResponse.json({ error: "Missing section parameter" }, { status: 400 });
  }

  // JSON-only sections
  if (JSON_ONLY_SECTIONS.includes(section)) {
    try {
      const body = await request.json();
      const filePath = path.join(CONTENT_DIR, `${section}.json`);
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2) + "\n", "utf-8");
      return NextResponse.json({ success: true, message: `${section} content saved!` });
    } catch {
      return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }
  }

  const slug = SECTION_TO_SLUG[section];
  if (!slug) {
    return NextResponse.json({ error: `Invalid section: ${section}` }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });
    let body = await request.json();

    // Special handling for navigation/menu
    if (section === "menu") {
      body = transformNavForPayload(body);
    }

    await payload.updateGlobal({
      slug: slug as "hero-section",
      data: body,
    });

    return NextResponse.json({ success: true, message: `${section} content saved to database!` });
  } catch (err) {
    // Fallback to JSON
    try {
      const body = await request.json();
      const filePath = path.join(CONTENT_DIR, `${section}.json`);
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2) + "\n", "utf-8");
      return NextResponse.json({ success: true, message: `${section} content saved!` });
    } catch {
      return NextResponse.json({ error: "Failed to save content: " + String(err) }, { status: 500 });
    }
  }
}
