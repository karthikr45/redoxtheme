"use client";
import Link from "next/link";

const sections = [
  {
    title: "Menu / Navigation",
    description: "Add, edit or reorder menu items in the header navigation",
    href: "/admin/menu",
    icon: "📋",
  },
  {
    title: "Hero Section",
    description: "Edit the main heading, description, button and video on the home page",
    href: "/admin/hero",
    icon: "🎯",
  },
  {
    title: "About Section",
    description: "Edit the about section subtitle, heading and buttons",
    href: "/admin/about",
    icon: "ℹ️",
  },
  {
    title: "Services Section",
    description: "Manage services list — add, edit or remove service items",
    href: "/admin/services",
    icon: "⚙️",
  },
  {
    title: "Works / Portfolio",
    description: "Manage portfolio items shown on the home page",
    href: "/admin/works",
    icon: "💼",
  },
  {
    title: "Marquee Text",
    description: "Edit the scrolling marquee text on the home page",
    href: "/admin/marquee",
    icon: "📝",
  },
  {
    title: "CTA Section",
    description: "Edit the call-to-action heading and link",
    href: "/admin/cta",
    icon: "📢",
  },
  {
    title: "Footer",
    description: "Edit footer navigation links and copyright information",
    href: "/admin/footer",
    icon: "🔻",
  },
];

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 10,
  padding: 24,
  textDecoration: "none",
  color: "inherit",
  border: "1px solid #e0e0e0",
  transition: "box-shadow 0.2s, transform 0.2s",
  display: "block",
};

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ margin: "0 0 8px", fontSize: 28, color: "#1e1e2f" }}>
        Dashboard
      </h1>
      <p style={{ margin: "0 0 30px", color: "#666" }}>
        Welcome to your site admin panel. Click on any section below to edit its content.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>{section.icon}</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "#1e1e2f" }}>
              {section.title}
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "#888", lineHeight: 1.5 }}>
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
