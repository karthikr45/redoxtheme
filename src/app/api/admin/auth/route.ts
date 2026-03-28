import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "src/data/content/admin-users.json");

function getUsers() {
  const data = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  return data;
}

// Login
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
      const data = getUsers();
      const user = data.users.find(
        (u: { username: string }) => u.username === decoded.username
      );
      if (!user) {
        return NextResponse.json({ authenticated: false });
      }
      const role = data.roles[user.role as keyof typeof data.roles];
      return NextResponse.json({
        authenticated: true,
        user: { username: user.username, name: user.name, role: user.role },
        permissions: role,
      });
    } catch {
      return NextResponse.json({ authenticated: false });
    }
  }

  // Login action
  const data = getUsers();
  const user = data.users.find(
    (u: { username: string; password: string }) =>
      u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const role = data.roles[user.role as keyof typeof data.roles];
  const session = Buffer.from(
    JSON.stringify({ username: user.username, role: user.role, ts: Date.now() })
  ).toString("base64");

  const response = NextResponse.json({
    success: true,
    user: { username: user.username, name: user.name, role: user.role },
    permissions: role,
  });

  response.cookies.set("admin_session", session, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });

  return response;
}
