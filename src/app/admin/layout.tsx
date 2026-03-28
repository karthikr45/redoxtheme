"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "🏠" },
  { label: "Pages", href: "/admin/pages", icon: "📄" },
  { label: "Menu / Navigation", href: "/admin/menu", icon: "📋" },
  { label: "Hero Section", href: "/admin/hero", icon: "🎯" },
  { label: "About Section", href: "/admin/about", icon: "ℹ️" },
  { label: "Services Section", href: "/admin/services", icon: "⚙️" },
  { label: "Works / Portfolio", href: "/admin/works", icon: "💼" },
  { label: "Marquee Text", href: "/admin/marquee", icon: "📝" },
  { label: "CTA Section", href: "/admin/cta", icon: "📢" },
  { label: "Footer", href: "/admin/footer", icon: "🔻" },
];

interface User {
  username: string;
  name: string;
  role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "check" }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push("/admin/login");
        }
        setChecking(false);
      })
      .catch(() => {
        router.push("/admin/login");
        setChecking(false);
      });
  }, [pathname, router]);

  // Login page - render without sidebar
  if (pathname === "/admin/login") {
    return <div style={{ margin: 0 }}>{children}</div>;
  }

  // Loading state
  if (checking) {
    return (
      <div
        style={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#f5f6fa",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <p style={{ color: "#888", fontSize: 16 }}>Checking authentication...</p>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "#1e1e2f",
          color: "#fff",
          padding: "20px 0",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #333" }}>
          <Link href="/admin" style={{ textDecoration: "none", color: "#fff" }}>
            <h2 style={{ margin: 0, fontSize: 20 }}>Site Admin Panel</h2>
          </Link>
          <p style={{ margin: "5px 0 0", fontSize: 12, color: "#888" }}>
            Edit your website content
          </p>
        </div>
        <nav style={{ marginTop: 10, flex: 1 }}>
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 20px",
                color: pathname === item.href ? "#fff" : "#aaa",
                textDecoration: "none",
                background: pathname === item.href ? "#2d2d44" : "transparent",
                borderLeft: pathname === item.href ? "3px solid #6c5ce7" : "3px solid transparent",
                fontSize: 14,
                transition: "all 0.2s",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User info + actions */}
        <div style={{ borderTop: "1px solid #333", padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#6c5ce7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{user.name}</div>
              <div style={{ fontSize: 11, color: "#888", textTransform: "capitalize" }}>{user.role}</div>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            style={{
              display: "block",
              padding: "10px 16px",
              background: "#6c5ce7",
              color: "#fff",
              textAlign: "center",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 14,
              marginBottom: 8,
            }}
          >
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px 16px",
              background: "transparent",
              color: "#e74c3c",
              border: "1px solid #e74c3c",
              borderRadius: 6,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, background: "#f5f6fa", padding: 30 }}>
        {children}
      </main>
    </div>
  );
}
