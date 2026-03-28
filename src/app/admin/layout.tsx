"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User { email: string; name: string; role: string; }

const S = {
  sidebar: { width: 250, background: "#1a1a2e", color: "#fff", padding: "16px 0", flexShrink: 0, display: "flex" as const, flexDirection: "column" as const, minHeight: "100vh" },
  link: (active: boolean) => ({ display: "flex", alignItems: "center" as const, gap: 10, padding: "11px 20px", color: active ? "#fff" : "#8b8ba7", textDecoration: "none", background: active ? "#16213e" : "transparent", borderLeft: active ? "3px solid #6c5ce7" : "3px solid transparent", fontSize: 14 }),
};

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "H" },
  { label: "Pages", href: "/admin/pages", icon: "P" },
  { label: "Blogs", href: "/admin/blogs", icon: "B" },
  { label: "Menu", href: "/admin/menu", icon: "M" },
  { label: "Media", href: "/admin/media", icon: "I" },
  { label: "Settings", href: "/admin/settings", icon: "S" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") { setLoading(false); return; }
    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "check" }),
    }).then(r => r.json()).then(d => {
      if (d.authenticated) setUser(d.user);
      else router.push("/admin/login");
      setLoading(false);
    }).catch(() => { router.push("/admin/login"); setLoading(false); });
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "system-ui" }}>Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ display: "flex", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <aside style={S.sidebar}>
        <div style={{ padding: "0 20px 16px", borderBottom: "1px solid #2a2a4a" }}>
          <Link href="/admin" style={{ textDecoration: "none", color: "#fff" }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Redox Admin</h2>
          </Link>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "#666" }}>Content Management</p>
        </div>
        <nav style={{ flex: 1, marginTop: 8 }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={S.link(pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)))}>
              <span style={{ width: 24, height: 24, borderRadius: 6, background: "#2a2a4a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div style={{ padding: "12px 20px", borderTop: "1px solid #2a2a4a" }}>
          <div style={{ fontSize: 13, color: "#fff", marginBottom: 4 }}>{user.name}</div>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 10 }}>{user.role}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <Link href="/" target="_blank" style={{ flex: 1, padding: "8px 0", background: "#6c5ce7", color: "#fff", textAlign: "center", borderRadius: 6, textDecoration: "none", fontSize: 12 }}>View Site</Link>
            <button onClick={async () => { await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) }); router.push("/admin/login"); }} style={{ flex: 1, padding: "8px 0", background: "transparent", color: "#e74c3c", border: "1px solid #e74c3c", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Logout</button>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, background: "#f0f2f5", padding: 24, minHeight: "100vh", overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
