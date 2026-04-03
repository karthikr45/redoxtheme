"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { sectionTypes, getSectionType } from "@/lib/section-registry";
import type { FieldDef } from "@/lib/section-registry";
import dynamic from "next/dynamic";

const RichTextField = dynamic(() => import("@/components/puck-fields/rich-text-field"), { ssr: false });

interface Section { type: string; variant?: string; [key: string]: unknown; }
interface PageData { _id?: string; slug: string; title: string; metaTitle?: string; metaDescription?: string; sections: Section[]; versions?: unknown[]; }

const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" };
const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: 70, resize: "vertical" };
const btnPrimary: React.CSSProperties = { padding: "10px 24px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" };
const btnDanger: React.CSSProperties = { padding: "6px 14px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" };
const btnSmall: React.CSSProperties = { padding: "4px 10px", background: "#ddd", color: "#333", border: "none", borderRadius: 4, fontSize: 12, cursor: "pointer" };

function FieldEditor({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  if (field.type === "text") {
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>{field.label}</label>
        <input style={inputStyle} value={(value as string) || ""} onChange={e => onChange(e.target.value)} />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>{field.label}</label>
        <RichTextField value={(value as string) || ""} onChange={(v) => onChange(v)} />
      </div>
    );
  }

  if (field.type === "link" || field.type === "video") {
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>{field.label}</label>
        <input style={{ ...inputStyle, color: "#6c5ce7" }} value={(value as string) || ""} onChange={e => onChange(e.target.value)} placeholder={field.type === "video" ? "https://..." : "/page-url"} />
      </div>
    );
  }

  if (field.type === "image") {
    const src = value as string;
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>{field.label}</label>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {src && <img src={src} alt="" style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 6, border: "1px solid #ddd" }} />}
          <input style={{ ...inputStyle, flex: 1 }} value={src || ""} onChange={e => onChange(e.target.value)} placeholder="/assets/imgs/..." />
          <button type="button" onClick={() => fileRef.current?.click()} style={{ ...btnSmall, background: "#6c5ce7", color: "#fff" }}>Upload</button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={async e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) onChange(data.url);
          }} />
        </div>
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>{field.label}</label>
        <select style={inputStyle} value={(value as string) || ""} onChange={e => onChange(e.target.value)}>
          {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
    );
  }

  if (field.type === "array" && field.fields) {
    const items = (value as Record<string, unknown>[]) || [];
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 8, textTransform: "uppercase" }}>{field.label} ({items.length})</label>
        {items.map((item, idx) => (
          <div key={idx} style={{ background: "#f8f9fa", borderRadius: 8, padding: 14, marginBottom: 8, border: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#888" }}>#{idx + 1}</span>
              <button type="button" style={btnDanger} onClick={() => {
                const next = [...items];
                next.splice(idx, 1);
                onChange(next);
              }}>Remove</button>
            </div>
            {field.fields!.map(subField => (
              <FieldEditor key={subField.name} field={subField} value={item[subField.name]} onChange={v => {
                const next = [...items];
                next[idx] = { ...next[idx], [subField.name]: v };
                onChange(next);
              }} />
            ))}
          </div>
        ))}
        <button type="button" style={{ ...btnSmall, background: "#00b894", color: "#fff" }} onClick={() => {
          const newItem: Record<string, unknown> = {};
          field.fields!.forEach(f => { newItem[f.name] = ""; });
          onChange([...items, newItem]);
        }}>+ Add {field.label.replace(/s$/, "")}</button>
      </div>
    );
  }

  return null;
}

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [page, setPage] = useState<PageData | null>(null);
  const [saved, setSaved] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content?slug=${slug}`).then(r => r.json()).then(d => {
      if (d.error) { setPage(null); }
      else setPage(d);
      setLoading(false);
    });
  }, [slug]);

  const save = async () => {
    if (!page) return;
    await fetch("/api/content?type=page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });
    setSaved("Saved successfully!");
    setTimeout(() => setSaved(""), 3000);
  };

  const updateSection = (idx: number, updates: Partial<Section>) => {
    if (!page) return;
    const sections = [...page.sections];
    sections[idx] = { ...sections[idx], ...updates };
    setPage({ ...page, sections });
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    if (!page) return;
    const sections = [...page.sections];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= sections.length) return;
    [sections[idx], sections[newIdx]] = [sections[newIdx], sections[idx]];
    setPage({ ...page, sections });
  };

  const removeSection = (idx: number) => {
    if (!page) return;
    if (!confirm("Remove this section?")) return;
    const sections = page.sections.filter((_, i) => i !== idx);
    setPage({ ...page, sections });
  };

  const addSection = (type: string) => {
    if (!page) return;
    const stype = getSectionType(type);
    const newSection: Section = { type, variant: stype?.variants[0]?.value || "" };
    stype?.fields.forEach(f => {
      if (f.type === "array") newSection[f.name] = [];
      else newSection[f.name] = "";
    });
    setPage({ ...page, sections: [...page.sections, newSection] });
    setShowAddSection(false);
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading page...</div>;
  if (!page) return <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Page not found. Run <code>npm run seed</code> first.</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => router.push("/admin/pages")} style={{ ...btnSmall, fontSize: 14 }}>Back</button>
            <h1 style={{ margin: 0, fontSize: 24, color: "#1a1a2e" }}>Editing: {page.title}</h1>
          </div>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>/{page.slug} - {page.sections.length} sections</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ color: "#00b894", fontSize: 14, fontWeight: 600 }}>{saved}</span>}
          <a href={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank" style={{ ...btnSmall, background: "#333", color: "#fff", padding: "8px 16px", textDecoration: "none" }}>Preview</a>
          <button onClick={save} style={btnPrimary}>Save Page</button>
        </div>
      </div>

      {/* Page Title & SEO */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 16, marginBottom: 16, border: "1px solid #e8e8e8" }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>Page Title</label>
          <input style={inputStyle} value={page.title} onChange={e => setPage({ ...page, title: e.target.value })} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>SEO Title <span style={{ color: "#888", fontWeight: 400, textTransform: "none" }}>(shows in browser tab)</span></label>
            <input style={inputStyle} value={page.metaTitle || ""} onChange={e => setPage({ ...page, metaTitle: e.target.value })} placeholder={page.title} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>SEO Description <span style={{ color: "#888", fontWeight: 400, textTransform: "none" }}>(Google search result)</span></label>
            <input style={inputStyle} value={page.metaDescription || ""} onChange={e => setPage({ ...page, metaDescription: e.target.value })} placeholder="Brief description for search engines..." />
          </div>
        </div>
      </div>

      {/* Sections (Blocks) */}
      {page.sections.map((section, idx) => {
        const stype = getSectionType(section.type);
        const isCollapsed = false; // could add collapse state

        return (
          <div key={idx} style={{ background: "#fff", borderRadius: 10, marginBottom: 12, border: "1px solid #e8e8e8", overflow: "hidden" }}>
            {/* Section Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#fafafa", borderBottom: "1px solid #eee" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#6c5ce7" }}>{stype?.label || section.type}</span>
                {section.variant && <span style={{ fontSize: 11, color: "#888", background: "#f0f0f0", padding: "2px 8px", borderRadius: 10 }}>{section.variant}</span>}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => moveSection(idx, -1)} disabled={idx === 0} style={{ ...btnSmall, opacity: idx === 0 ? 0.3 : 1 }} title="Move up">Up</button>
                <button onClick={() => moveSection(idx, 1)} disabled={idx === page.sections.length - 1} style={{ ...btnSmall, opacity: idx === page.sections.length - 1 ? 0.3 : 1 }} title="Move down">Dn</button>
                <button onClick={() => removeSection(idx)} style={{ ...btnSmall, background: "#fde8e8", color: "#e74c3c" }}>Remove</button>
              </div>
            </div>

            {/* Section Fields */}
            <div style={{ padding: 16 }}>
              {/* Variant selector */}
              {stype && stype.variants.length > 1 && (
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>Style Variant</label>
                  <select style={inputStyle} value={section.variant || ""} onChange={e => updateSection(idx, { variant: e.target.value })}>
                    {stype.variants.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
                  </select>
                </div>
              )}

              {/* Editable fields */}
              {stype?.fields.map(field => (
                <FieldEditor
                  key={field.name}
                  field={field}
                  value={section[field.name]}
                  onChange={v => updateSection(idx, { [field.name]: v })}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Add Section */}
      {showAddSection ? (
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: "1px solid #e8e8e8" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16, color: "#1a1a2e" }}>Add a Section</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
            {sectionTypes.map(st => (
              <button key={st.slug} onClick={() => addSection(st.slug)} style={{ padding: "12px 14px", background: "#f8f9fa", border: "1px solid #e8e8e8", borderRadius: 8, cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>{st.label}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{st.variants.length} style{st.variants.length > 1 ? "s" : ""}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setShowAddSection(false)} style={{ ...btnSmall, marginTop: 12 }}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowAddSection(true)} style={{ width: "100%", padding: 14, background: "#fff", border: "2px dashed #ddd", borderRadius: 10, cursor: "pointer", fontSize: 15, color: "#6c5ce7", fontWeight: 600 }}>
          + Add Section
        </button>
      )}

      {/* Version History */}
      {page.versions && page.versions.length > 0 && (
        <div style={{ marginTop: 20, background: "#fff", borderRadius: 10, padding: 16, border: "1px solid #e8e8e8" }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#1a1a2e" }}>Version History ({page.versions.length})</h3>
          <p style={{ margin: 0, fontSize: 12, color: "#888" }}>Previous versions are saved automatically when you save. Contact your developer to restore a version.</p>
        </div>
      )}
    </div>
  );
}
