"use client";
import { useRef, useState } from "react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) onChange(data.url);
    setUploading(false);
  };

  return (
    <div style={{ marginBottom: 8 }}>
      {/* Preview */}
      {value && (
        <div style={{ marginBottom: 8, borderRadius: 8, overflow: "hidden", border: "1px solid #ddd", background: "#f5f5f5" }}>
          {value.match(/\.(mp4|webm|ogg)$/i) || value.includes("video") ? (
            <video src={value} style={{ width: "100%", maxHeight: 160 }} controls muted />
          ) : (
            <img src={value} alt="" style={{ width: "100%", maxHeight: 160, objectFit: "cover", display: "block" }} />
          )}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: 6 }}>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/assets/imgs/..."
          style={{ flex: 1, padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            padding: "8px 14px",
            background: uploading ? "#999" : "#6c5ce7",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: uploading ? "wait" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          style={{ marginTop: 4, padding: "4px 10px", background: "none", border: "none", color: "#e74c3c", fontSize: 11, cursor: "pointer" }}
        >
          Remove
        </button>
      )}

      <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: "none" }} onChange={handleUpload} />
    </div>
  );
}
