"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PageItem { _id: string; slug: string; title: string; updatedAt?: string; }

export default function PagesListPage() {
  const [pages, setPages] = useState<PageItem[]>([]);

  useEffect(() => {
    fetch("/api/content?type=pages").then(r => r.json()).then(d => setPages(Array.isArray(d) ? d : []));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, color: "#1a1a2e" }}>Pages</h1>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>Click any page to edit its sections</p>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e8e8e8", overflow: "hidden" }}>
        {pages.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
            <p>No pages yet. Run <code>npm run seed</code> to populate pages.</p>
          </div>
        ) : (
          pages.map((page, idx) => (
            <Link key={page._id} href={`/admin/edit/${page.slug}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", textDecoration: "none", color: "inherit", borderBottom: idx < pages.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>{page.title}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>/{page.slug}</div>
              </div>
              <span style={{ fontSize: 13, color: "#6c5ce7", fontWeight: 600 }}>Edit</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
