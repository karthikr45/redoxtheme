"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" };

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: "", author: "", content: "", excerpt: "", image: "", tags: "", status: "draft" });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    fetch(`/api/blogs?id=${id}`).then((r) => r.json()).then((d) => {
      if (d) setForm({ title: d.title || "", author: d.author || "", content: d.content || "", excerpt: d.excerpt || "", image: d.image || "", tags: d.tags || "", status: d.status || "draft" });
      setLoading(false);
    });
  }, [id]);

  const handleSave = async () => {
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, ...form }),
    });
    setSaved("Saved!");
    setTimeout(() => setSaved(""), 3000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setForm({ ...form, image: data.url });
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 24, color: "#1a1a2e" }}>Edit Blog Post</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ color: "#00b894", fontWeight: 600 }}>{saved}</span>}
          <button onClick={() => router.push("/admin/blogs")} style={{ padding: "10px 20px", background: "#ddd", color: "#333", border: "none", borderRadius: 6, fontSize: 14, cursor: "pointer" }}>Back</button>
          <button onClick={handleSave} style={{ padding: "10px 24px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save</button>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: "1px solid #e8e8e8" }}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>TITLE</label>
          <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>AUTHOR</label>
          <input style={inputStyle} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>FEATURED IMAGE</label>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {form.image && <img src={form.image} alt="" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }} />}
            <input style={{ ...inputStyle, flex: 1 }} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <button type="button" onClick={() => fileRef.current?.click()} style={{ padding: "10px 16px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>Upload</button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleUpload} />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>EXCERPT</label>
          <textarea style={{ ...inputStyle, minHeight: 60 }} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>CONTENT</label>
          <textarea style={{ ...inputStyle, minHeight: 200 }} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>TAGS</label>
            <input style={inputStyle} value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>STATUS</label>
            <select style={inputStyle} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
