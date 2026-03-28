import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/lib/db";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request: NextRequest) {
  const { email, password, action } = await request.json();

  if (action === "logout") {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
    return response;
  }

  if (action === "check") {
    const session = request.cookies.get("admin_session")?.value;
    if (!session) return NextResponse.json({ authenticated: false });
    try {
      const decoded = JSON.parse(Buffer.from(session, "base64").toString());
      const users = await getUsers();
      const user = await users.findOne({ email: decoded.email });
      if (!user) return NextResponse.json({ authenticated: false });
      return NextResponse.json({
        authenticated: true,
        user: { email: user.email, name: user.name, role: user.role },
      });
    } catch {
      return NextResponse.json({ authenticated: false });
    }
  }

  // Login
  try {
    const users = await getUsers();
    const user = await users.findOne({ email });
    if (!user || user.hashedPassword !== hashPassword(password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const session = Buffer.from(
      JSON.stringify({ email: user.email, role: user.role, ts: Date.now() })
    ).toString("base64");

    const response = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set("admin_session", session, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Auth failed: " + String(err) }, { status: 500 });
  }
}
