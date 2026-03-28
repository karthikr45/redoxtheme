"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pageCount, setPageCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    fetch("/api/content?type=pages").then(r => r.json()).then(d => setPageCount(Array.isArray(d) ? d.length : 0));
    fetch("/api/blogs").then(r => r.json()).then(d => setBlogCount(Array.isArray(d) ? d.length : 0));
  }, []);

  const cards = [
    { title: "Pages", count: pageCount, desc: "Edit page content and sections", href: "/admin/pages", color: "#6c5ce7" },
    { title: "Blog Posts", count: blogCount, desc: "Create and manage blog posts", href: "/admin/blogs", color: "#00b894" },
    { title: "Menu", count: 0, desc: "Edit navigation menu items", href: "/admin/menu", color: "#e17055" },
    { title: "Media", count: 0, desc: "Upload and manage images", href: "/admin/media", color: "#0984e3" },
  ];

  return (
    <div>
      <h1 style={{ margin: "0 0 6px", fontSize: 26, color: "#1a1a2e" }}>Dashboard</h1>
      <p style={{ margin: "0 0 24px", color: "#888", fontSize: 14 }}>Welcome to your site admin panel</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
        {cards.map(card => (
          <Link key={card.href} href={card.href} style={{ background: "#fff", borderRadius: 10, padding: 20, textDecoration: "none", color: "inherit", border: "1px solid #e8e8e8", transition: "box-shadow 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: card.color }}>{card.count}</span>
              <span style={{ width: 40, height: 40, borderRadius: 8, background: card.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{card.title[0]}</span>
            </div>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, color: "#1a1a2e" }}>{card.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: "#888" }}>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
