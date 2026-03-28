import { NextRequest, NextResponse } from "next/server";
import { getPages, getSiteSettings } from "@/lib/db";
import { ObjectId } from "mongodb";

// GET /api/content?slug=home or ?type=menu
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const type = request.nextUrl.searchParams.get("type");

  try {
    if (type === "menu") {
      const settings = await getSiteSettings();
      const menu = await settings.findOne({ key: "menu" });
      return NextResponse.json(menu?.data || []);
    }

    if (type === "pages") {
      const pages = await getPages();
      const allPages = await pages.find({}).project({ slug: 1, title: 1, updatedAt: 1, status: 1 }).toArray();
      return NextResponse.json(allPages);
    }

    if (slug) {
      const pages = await getPages();
      const page = await pages.findOne({ slug });
      if (!page) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }
      return NextResponse.json(page);
    }

    return NextResponse.json({ error: "Provide slug or type parameter" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Database error: " + String(err) }, { status: 500 });
  }
}

// POST /api/content — save page or menu
export async function POST(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");

  try {
    const body = await request.json();

    if (type === "menu") {
      const settings = await getSiteSettings();
      await settings.updateOne(
        { key: "menu" },
        { $set: { key: "menu", data: body, updatedAt: new Date() } },
        { upsert: true }
      );
      return NextResponse.json({ success: true });
    }

    if (type === "page") {
      const pages = await getPages();
      const { _id, ...pageData } = body;

      if (_id) {
        // Update existing page — save current version first
        const existing = await pages.findOne({ _id: new ObjectId(_id) });
        if (existing) {
          const versions = existing.versions || [];
          versions.push({
            sections: existing.sections,
            savedAt: existing.updatedAt || new Date(),
          });
          // Keep last 20 versions
          if (versions.length > 20) versions.shift();
          await pages.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { ...pageData, versions, updatedAt: new Date() } }
          );
        }
      } else {
        // Create new page
        await pages.insertOne({ ...pageData, versions: [], createdAt: new Date(), updatedAt: new Date() });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Provide type parameter" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Save failed: " + String(err) }, { status: 500 });
  }
}

// DELETE /api/content?id=xxx
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Provide id" }, { status: 400 });

  try {
    const pages = await getPages();
    await pages.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed: " + String(err) }, { status: 500 });
  }
}
