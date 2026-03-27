"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <aside
            style={{
              width: 260,
              background: "#1e1e2f",
              color: "#fff",
              padding: "20px 0",
              flexShrink: 0,
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
            <nav style={{ marginTop: 10 }}>
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
            <div style={{ padding: "20px", borderTop: "1px solid #333", marginTop: 20 }}>
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
                }}
              >
                View Live Site
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, background: "#f5f6fa", padding: 30 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
