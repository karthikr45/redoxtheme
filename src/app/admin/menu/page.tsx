"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface MenuItem {
  title: string;
  href: string;
  children?: MenuItem[];
}

interface PageOption {
  title: string;
  path: string;
  category: string;
}

const allPages: PageOption[] = [
  { title: "Home (Digital Agency)", path: "/", category: "Home Pages" },
  { title: "Creative Agency", path: "/creative-agency", category: "Home Pages" },
  { title: "Marketing Agency", path: "/marketing-agency", category: "Home Pages" },
  { title: "Design Agency", path: "/design-agency", category: "Home Pages" },
  { title: "Startup Agency", path: "/startup-agency", category: "Home Pages" },
  { title: "Modern Agency", path: "/modern-agency", category: "Home Pages" },
  { title: "Agency Portfolio", path: "/agency-portfolio", category: "Home Pages" },
  { title: "Portfolio Horizontal", path: "/portfolio-horizontal", category: "Portfolio Home" },
  { title: "Portfolio Line Effect", path: "/portfolio-line-effect", category: "Portfolio Home" },
  { title: "Portfolio Box Effect", path: "/portfolio-box-effect", category: "Portfolio Home" },
  { title: "Portfolio Vertical", path: "/portfolio-vertical", category: "Portfolio Home" },
  { title: "Portfolio Slicer", path: "/portfolio-slicer", category: "Portfolio Home" },
  { title: "Parallax Carousal", path: "/parallax-carousal", category: "Portfolio Home" },
  { title: "Portfolio Showcase", path: "/portfolio-showcase", category: "Portfolio Home" },
  { title: "Services - Core", path: "/services", category: "Services" },
  { title: "Services - Pulse", path: "/services-2", category: "Services" },
  { title: "Services - Morph", path: "/services-3", category: "Services" },
  { title: "Services - Nova", path: "/services-4", category: "Services" },
  { title: "Services - Zenith", path: "/services-5", category: "Services" },
  { title: "Services - Prism", path: "/services-6", category: "Services" },
  { title: "Service Details", path: "/service-details", category: "Services" },
  { title: "Portfolio - Core", path: "/portfolio", category: "Portfolio" },
  { title: "Portfolio - Classic", path: "/portfolio-2", category: "Portfolio" },
  { title: "Portfolio - Minimal", path: "/portfolio-3", category: "Portfolio" },
  { title: "Portfolio - Modern", path: "/portfolio-4", category: "Portfolio" },
  { title: "Portfolio - Interactive", path: "/portfolio-5", category: "Portfolio" },
  { title: "Portfolio - Metro", path: "/portfolio-6", category: "Portfolio" },
  { title: "Portfolio Details", path: "/portfolio-details", category: "Portfolio" },
  { title: "About Us", path: "/about", category: "Pages" },
  { title: "Blog", path: "/blog", category: "Pages" },
  { title: "Blog Details", path: "/blog-details/1", category: "Pages" },
  { title: "Team", path: "/team", category: "Pages" },
  { title: "Team Details", path: "/team-details", category: "Pages" },
  { title: "Contact", path: "/contact", category: "Pages" },
  { title: "FAQ", path: "/faq", category: "Pages" },
];

const categories = ["All", "Home Pages", "Portfolio Home", "Services", "Portfolio", "Pages"];

type PickerTarget =
  | { type: "main" }
  | { type: "sub"; parentIndex: number };

export default function MenuEditor() {
  const [data, setData] = useState<MenuItem[]>([]);
  const [saved, setSaved] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>({ type: "main" });
  const [pickerCategory, setPickerCategory] = useState("All");
  const [pickerSearch, setPickerSearch] = useState("");
  const [previewPage, setPreviewPage] = useState<PageOption | null>(null);

  useEffect(() => {
    fetch("/api/admin/content?section=menu")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const items = [...data];
    items[index] = { ...items[index], [field]: value };
    setData(items);
  };

  const updateSubItem = (parentIndex: number, childIndex: number, field: string, value: string) => {
    const items = [...data];
    const children = [...(items[parentIndex].children || [])];
    children[childIndex] = { ...children[childIndex], [field]: value };
    items[parentIndex] = { ...items[parentIndex], children };
    setData(items);
  };

  const removeMenuItem = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const removeSubItem = (parentIndex: number, childIndex: number) => {
    const items = [...data];
    const children = (items[parentIndex].children || []).filter((_, i) => i !== childIndex);
    items[parentIndex] = {
      ...items[parentIndex],
      children: children.length > 0 ? children : undefined,
    };
    setData(items);
  };

  // Open page picker
  const openPicker = (target: PickerTarget) => {
    setPickerTarget(target);
    setPickerCategory("All");
    setPickerSearch("");
    setPreviewPage(null);
    setPickerOpen(true);
  };

  // Select a page from picker
  const selectPage = (page: PageOption) => {
    if (pickerTarget.type === "main") {
      setData([...data, { title: page.title, href: page.path }]);
    } else {
      const items = [...data];
      const children = [...(items[pickerTarget.parentIndex].children || [])];
      children.push({ title: page.title, href: page.path });
      items[pickerTarget.parentIndex] = { ...items[pickerTarget.parentIndex], children };
      setData(items);
    }
    setPickerOpen(false);
    setPreviewPage(null);
  };

  // Filter pages
  const filteredPages = allPages.filter((p) => {
    const matchesCategory = pickerCategory === "All" || p.category === pickerCategory;
    const matchesSearch =
      pickerSearch === "" ||
      p.title.toLowerCase().includes(pickerSearch.toLowerCase()) ||
      p.path.toLowerCase().includes(pickerSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h1 style={S.pageTitle}>Menu / Navigation</h1>
      <p style={S.pageSubtitle}>
        Add, edit or remove menu items. Click &quot;+ Add&quot; to browse pages with preview before adding.
      </p>

      {saved && <div style={S.successMsg}>Menu saved successfully! Refresh the site to see changes.</div>}

      {/* Menu Items */}
      {data.map((item, index) => (
        <div key={index} style={{ ...S.formCard, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "end", marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={S.labelStyle}>Menu Title</label>
              <input
                style={S.inputStyle}
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.labelStyle}>Link (URL)</label>
              <input
                style={S.inputStyle}
                value={item.href}
                onChange={(e) => updateItem(index, "href", e.target.value)}
              />
            </div>
            <button style={S.dangerBtn} onClick={() => removeMenuItem(index)}>
              Remove
            </button>
          </div>

          {/* Sub-items */}
          {item.children && item.children.length > 0 && (
            <div style={{ marginLeft: 24, borderLeft: "3px solid #6c5ce7", paddingLeft: 16 }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#6c5ce7" }}>
                SUB-MENU ITEMS
              </p>
              {item.children.map((child, childIndex) => (
                <div key={childIndex} style={{ display: "flex", gap: 12, alignItems: "end", marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <label style={S.labelStyle}>Title</label>
                    <input
                      style={S.inputStyle}
                      value={child.title}
                      onChange={(e) => updateSubItem(index, childIndex, "title", e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={S.labelStyle}>Link</label>
                    <input
                      style={S.inputStyle}
                      value={child.href}
                      onChange={(e) => updateSubItem(index, childIndex, "href", e.target.value)}
                    />
                  </div>
                  <button style={S.dangerBtn} onClick={() => removeSubItem(index, childIndex)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            style={{
              ...S.addBtn,
              fontSize: 12,
              padding: "6px 14px",
              marginTop: 8,
              background: "#6c5ce7",
            }}
            onClick={() => openPicker({ type: "sub", parentIndex: index })}
          >
            + Add Sub-item (Browse Pages)
          </button>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button style={S.addBtn} onClick={() => openPicker({ type: "main" })}>
          + Add Menu Item (Browse Pages)
        </button>
        <button style={S.saveBtn} onClick={handleSave}>
          Save Menu
        </button>
      </div>

      {/* ========== PAGE PICKER MODAL ========== */}
      {pickerOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setPickerOpen(false);
              setPreviewPage(null);
            }
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              width: "90vw",
              maxWidth: 1100,
              height: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#1e1e2f",
                color: "#fff",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 18 }}>
                  {pickerTarget.type === "main"
                    ? "Select a Page for Menu"
                    : `Add Sub-item to "${data[pickerTarget.parentIndex]?.title}"`}
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#aaa" }}>
                  Browse pages, preview them, then click &quot;Add to Menu&quot;
                </p>
              </div>
              <button
                onClick={() => {
                  setPickerOpen(false);
                  setPreviewPage(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: 24,
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                X
              </button>
            </div>

            {/* Search + Category Tabs */}
            <div style={{ padding: "12px 24px", borderBottom: "1px solid #eee", background: "#f9f9fb" }}>
              <input
                type="text"
                placeholder="Search pages by name or URL..."
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                style={{
                  ...S.inputStyle,
                  marginBottom: 10,
                  fontSize: 14,
                  padding: "10px 16px",
                }}
              />
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPickerCategory(cat)}
                    style={{
                      padding: "6px 14px",
                      border: "none",
                      borderRadius: 20,
                      background: pickerCategory === cat ? "#6c5ce7" : "#e0e0e0",
                      color: pickerCategory === cat ? "#fff" : "#555",
                      fontSize: 12,
                      cursor: "pointer",
                      fontWeight: pickerCategory === cat ? 600 : 400,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area: Pages List + Preview */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
              {/* Pages List */}
              <div
                style={{
                  width: previewPage ? "40%" : "100%",
                  overflowY: "auto",
                  padding: 16,
                  transition: "width 0.3s",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: previewPage
                      ? "1fr"
                      : "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: 12,
                  }}
                >
                  {filteredPages.map((page) => (
                    <div
                      key={page.path}
                      style={{
                        background: previewPage?.path === page.path ? "#eef0ff" : "#fff",
                        border:
                          previewPage?.path === page.path
                            ? "2px solid #6c5ce7"
                            : "1px solid #e0e0e0",
                        borderRadius: 8,
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onClick={() => setPreviewPage(page)}
                    >
                      {/* Thumbnail */}
                      {!previewPage && (
                        <div
                          style={{
                            height: 130,
                            overflow: "hidden",
                            background: "#f0f0f0",
                            position: "relative",
                          }}
                        >
                          <iframe
                            src={page.path}
                            style={{
                              width: "1440px",
                              height: "900px",
                              transform: "scale(0.167)",
                              transformOrigin: "top left",
                              border: "none",
                              pointerEvents: "none",
                            }}
                            title={page.title}
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Info */}
                      <div style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#1e1e2f" }}>
                            {page.title}
                          </div>
                          <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                            {page.path}
                            <span
                              style={{
                                marginLeft: 8,
                                background: "#f0f0f0",
                                padding: "2px 6px",
                                borderRadius: 4,
                                fontSize: 10,
                              }}
                            >
                              {page.category}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectPage(page);
                          }}
                          style={{
                            padding: "6px 14px",
                            background: "#6c5ce7",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 12,
                            cursor: "pointer",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Add to Menu
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredPages.length === 0 && (
                    <p style={{ color: "#888", padding: 20, textAlign: "center" }}>
                      No pages found matching your search.
                    </p>
                  )}
                </div>
              </div>

              {/* Preview Panel */}
              {previewPage && (
                <div
                  style={{
                    width: "60%",
                    borderLeft: "1px solid #eee",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Preview Header */}
                  <div
                    style={{
                      padding: "10px 16px",
                      borderBottom: "1px solid #eee",
                      background: "#f9f9fb",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1e1e2f" }}>
                        {previewPage.title}
                      </span>
                      <span style={{ fontSize: 12, color: "#888", marginLeft: 8 }}>
                        {previewPage.path}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => selectPage(previewPage)}
                        style={{
                          padding: "8px 20px",
                          background: "#6c5ce7",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          fontSize: 13,
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Add to Menu
                      </button>
                      <button
                        onClick={() => setPreviewPage(null)}
                        style={{
                          padding: "8px 14px",
                          background: "#eee",
                          color: "#555",
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

                  {/* Preview iframe */}
                  <div style={{ flex: 1, position: "relative" }}>
                    <iframe
                      src={previewPage.path}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                      title={`Preview: ${previewPage.title}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
