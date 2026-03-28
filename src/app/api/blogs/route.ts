import { NextRequest, NextResponse } from "next/server";
import { getBlogs } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const blogs = await getBlogs();

    if (id) {
      const blog = await blogs.findOne({ _id: new ObjectId(id) });
      return NextResponse.json(blog);
    }

    const allBlogs = await blogs.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(allBlogs);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const blogs = await getBlogs();
    const { _id, ...data } = body;

    if (_id) {
      await blogs.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...data, updatedAt: new Date() } }
      );
    } else {
      await blogs.insertOne({ ...data, createdAt: new Date(), updatedAt: new Date() });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Provide id" }, { status: 400 });

  try {
    const blogs = await getBlogs();
    await blogs.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
