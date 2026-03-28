"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface PageItem {
  title: string;
  path: string;
  category: string;
}

const allPages: PageItem[] = [
  // Home pages
  { title: "Digital Agency", path: "/", category: "Home Pages" },
  { title: "Creative Agency", path: "/creative-agency", category: "Home Pages" },
  { title: "Marketing Agency", path: "/marketing-agency", category: "Home Pages" },
  { title: "Design Agency", path: "/design-agency", category: "Home Pages" },
  { title: "Startup Agency", path: "/startup-agency", category: "Home Pages" },
  { title: "Modern Agency", path: "/modern-agency", category: "Home Pages" },
  { title: "Agency Portfolio", path: "/agency-portfolio", category: "Home Pages" },
  // Portfolio Home Pages
  { title: "Portfolio Horizontal", path: "/portfolio-horizontal", category: "Portfolio Home Pages" },
  { title: "Portfolio Line Effect", path: "/portfolio-line-effect", category: "Portfolio Home Pages" },
  { title: "Portfolio Box Effect", path: "/portfolio-box-effect", category: "Portfolio Home Pages" },
  { title: "Portfolio Vertical", path: "/portfolio-vertical", category: "Portfolio Home Pages" },
  { title: "Portfolio Slicer", path: "/portfolio-slicer", category: "Portfolio Home Pages" },
  { title: "Parallax Carousal", path: "/parallax-carousal", category: "Portfolio Home Pages" },
  { title: "Portfolio Showcase", path: "/portfolio-showcase", category: "Portfolio Home Pages" },
  // Service Pages
  { title: "Services - Core", path: "/services", category: "Service Pages" },
  { title: "Services - Pulse", path: "/services-2", category: "Service Pages" },
  { title: "Services - Morph", path: "/services-3", category: "Service Pages" },
  { title: "Services - Nova", path: "/services-4", category: "Service Pages" },
  { title: "Services - Zenith", path: "/services-5", category: "Service Pages" },
  { title: "Services - Prism", path: "/services-6", category: "Service Pages" },
  { title: "Service Details", path: "/service-details", category: "Service Pages" },
  // Portfolio Pages
  { title: "Portfolio - Core", path: "/portfolio", category: "Portfolio Pages" },
  { title: "Portfolio - Classic", path: "/portfolio-2", category: "Portfolio Pages" },
  { title: "Portfolio - Minimal", path: "/portfolio-3", category: "Portfolio Pages" },
  { title: "Portfolio - Modern", path: "/portfolio-4", category: "Portfolio Pages" },
  { title: "Portfolio - Interactive", path: "/portfolio-5", category: "Portfolio Pages" },
  { title: "Portfolio - Metro", path: "/portfolio-6", category: "Portfolio Pages" },
  { title: "Portfolio Details", path: "/portfolio-details", category: "Portfolio Pages" },
  // Other Pages
  { title: "About Us", path: "/about", category: "Other Pages" },
  { title: "Blog", path: "/blog", category: "Other Pages" },
  { title: "Blog Details", path: "/blog-details/1", category: "Other Pages" },
  { title: "Team", path: "/team", category: "Other Pages" },
  { title: "Team Details", path: "/team-details", category: "Other Pages" },
  { title: "Contact", path: "/contact", category: "Other Pages" },
  { title: "FAQ", path: "/faq", category: "Other Pages" },
];

const categories = ["Home Pages", "Portfolio Home Pages", "Service Pages", "Portfolio Pages", "Other Pages"];

export default function PagesManager() {
  const [previewPage, setPreviewPage] = useState<PageItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("Home Pages");
  const [currentHomePage, setCurrentHomePage] = useState("/startup-agency");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=site-settings")
      .then((r) => r.json())
      .then((d) => setCurrentHomePage(d.homePage || "/startup-agency"));
  }, []);

  const setAsHomePage = async (path: string) => {
    await fetch("/api/admin/content?section=site-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ homePage: path }),
    });
    setCurrentHomePage(path);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const filteredPages = allPages.filter((p) => p.category === activeCategory);

  // Full page preview modal
  if (previewPage) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: "#000" }}>
        {/* Toolbar */}
        <div
          style={{
            background: "#1e1e2f",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16 }}>{previewPage.title}</h3>
            <span style={{ fontSize: 13, color: "#888" }}>{previewPage.path}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {previewPage.category === "Home Pages" && (
              <button
                onClick={() => setAsHomePage(previewPage.path)}
                style={{
                  padding: "8px 20px",
                  background: currentHomePage === previewPage.path ? "#00b894" : "#6c5ce7",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {currentHomePage === previewPage.path ? "Current Home Page" : "Set as Home Page"}
              </button>
            )}
            <a
              href={previewPage.path}
              target="_blank"
              style={{
                padding: "8px 20px",
                background: "#333",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 13,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              Open in New Tab
            </a>
            <button
              onClick={() => setPreviewPage(null)}
              style={{
                padding: "8px 20px",
                background: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Close Preview
            </button>
          </div>
        </div>
        {/* iframe preview */}
        <iframe
          src={previewPage.path}
          style={{ width: "100%", height: "calc(100vh - 50px)", border: "none" }}
          title={previewPage.title}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 style={S.pageTitle}>Pages</h1>
      <p style={S.pageSubtitle}>
        Browse all available page templates. Click &quot;Preview&quot; to see how they look, then select one as your home page.
      </p>

      {saved && (
        <div style={S.successMsg}>
          Home page updated successfully! Your site will now show this page at the root URL.
        </div>
      )}

      {/* Current Home Page */}
      <div
        style={{
          ...S.formCard,
          background: "#eef0ff",
          borderColor: "#6c5ce7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: 16, color: "#1e1e2f" }}>
            Current Home Page
          </h3>
          <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
            {allPages.find((p) => p.path === currentHomePage)?.title || currentHomePage}
            <span style={{ marginLeft: 8, color: "#888" }}>({currentHomePage})</span>
          </p>
        </div>
        <button
          onClick={() => {
            const page = allPages.find((p) => p.path === currentHomePage);
            if (page) setPreviewPage(page);
          }}
          style={{ ...S.saveBtn, fontSize: 13, padding: "8px 20px" }}
        >
          Preview Current
        </button>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px 6px 0 0",
              background: activeCategory === cat ? "#1e1e2f" : "#ddd",
              color: activeCategory === cat ? "#fff" : "#555",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: activeCategory === cat ? 600 : 400,
            }}
          >
            {cat} ({allPages.filter((p) => p.category === cat).length})
          </button>
        ))}
      </div>

      {/* Page Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {filteredPages.map((page) => (
          <div
            key={page.path}
            style={{
              background: "#fff",
              borderRadius: 10,
              border: currentHomePage === page.path ? "2px solid #6c5ce7" : "1px solid #e0e0e0",
              overflow: "hidden",
              transition: "box-shadow 0.2s",
            }}
          >
            {/* Thumbnail preview via iframe */}
            <div
              style={{
                position: "relative",
                height: 220,
                overflow: "hidden",
                background: "#f0f0f0",
                cursor: "pointer",
              }}
              onClick={() => setPreviewPage(page)}
            >
              <iframe
                src={page.path}
                style={{
                  width: "1440px",
                  height: "900px",
                  transform: "scale(0.222)",
                  transformOrigin: "top left",
                  border: "none",
                  pointerEvents: "none",
                }}
                title={page.title}
                loading="lazy"
              />
              {/* Overlay to make clickable */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0)",
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.4)";
                  const span = e.currentTarget.querySelector("span") as HTMLElement;
                  if (span) span.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0)";
                  const span = e.currentTarget.querySelector("span") as HTMLElement;
                  if (span) span.style.opacity = "0";
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    opacity: 0,
                    transition: "opacity 0.2s",
                    background: "rgba(108, 92, 231, 0.9)",
                    padding: "10px 24px",
                    borderRadius: 6,
                  }}
                >
                  Click to Preview
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: "0 0 2px", fontSize: 15, color: "#1e1e2f" }}>
                  {page.title}
                </h3>
                <span style={{ fontSize: 12, color: "#888" }}>{page.path}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {page.category === "Home Pages" && (
                  currentHomePage === page.path ? (
                    <span
                      style={{
                        padding: "6px 12px",
                        background: "#00b894",
                        color: "#fff",
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      ACTIVE
                    </span>
                  ) : (
                    <button
                      onClick={() => setAsHomePage(page.path)}
                      style={{
                        padding: "6px 12px",
                        background: "#6c5ce7",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 11,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Set as Home
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
