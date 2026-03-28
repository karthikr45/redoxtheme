"use client";
import { useState, useRef } from "react";

export default function MediaPage() {
  const [uploads, setUploads] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setUploads(prev => [data.url, ...prev]);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, color: "#1a1a2e" }}>Media Library</h1>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>Upload and manage images</p>
        </div>
        <button onClick={() => fileRef.current?.click()} style={{ padding: "10px 20px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          + Upload Images
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleUpload} />
      </div>

      {uploads.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {uploads.map((url, idx) => (
            <div key={idx} style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", overflow: "hidden" }}>
              <img src={url} alt="" style={{ width: "100%", height: 150, objectFit: "cover" }} />
              <div style={{ padding: "8px 10px", fontSize: 12, color: "#888", wordBreak: "break-all" }}>{url}</div>
            </div>
          ))}
        </div>
      )}

      {uploads.length === 0 && (
        <div style={{ background: "#fff", borderRadius: 10, padding: 60, textAlign: "center", color: "#888", border: "1px solid #e8e8e8" }}>
          <p style={{ fontSize: 16 }}>No images uploaded yet</p>
          <p style={{ fontSize: 13 }}>Click &quot;Upload Images&quot; or drag images here</p>
        </div>
      )}
    </div>
  );
}
