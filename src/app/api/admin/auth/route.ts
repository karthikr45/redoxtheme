import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const ROLES: Record<string, Record<string, boolean>> = {
  admin: {
    canEditContent: true,
    canEditMenu: true,
    canEditPages: true,
    canManageUsers: true,
  },
  editor: {
    canEditContent: true,
    canEditMenu: false,
    canEditPages: true,
    canManageUsers: false,
  },
};

export async function POST(request: NextRequest) {
  const { username, password, action } = await request.json();

  if (action === "logout") {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
    return response;
  }

  if (action === "check") {
    const session = request.cookies.get("admin_session")?.value;
    if (!session) {
      return NextResponse.json({ authenticated: false });
    }
    try {
      const decoded = JSON.parse(Buffer.from(session, "base64").toString());
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "admin-users",
        where: { username: { equals: decoded.username } },
        limit: 1,
      });

      if (result.docs.length === 0) {
        return NextResponse.json({ authenticated: false });
      }

      const user = result.docs[0];
      const permissions = ROLES[user.role as string] || ROLES.editor;
      return NextResponse.json({
        authenticated: true,
        user: { username: user.username, name: user.name, role: user.role },
        permissions,
      });
    } catch {
      return NextResponse.json({ authenticated: false });
    }
  }

  // Login action
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "admin-users",
      where: { username: { equals: username } },
      limit: 1,
    });

    if (result.docs.length === 0) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const user = result.docs[0];
    const hashed = hashPassword(password);

    if (user.hashedPassword !== hashed) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const permissions = ROLES[user.role as string] || ROLES.editor;
    const session = Buffer.from(
      JSON.stringify({ username: user.username, role: user.role, ts: Date.now() })
    ).toString("base64");

    const response = NextResponse.json({
      success: true,
      user: { username: user.username, name: user.name, role: user.role },
      permissions,
    });

    response.cookies.set("admin_session", session, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Authentication failed: " + String(err) },
      { status: 500 }
    );
  }
}
