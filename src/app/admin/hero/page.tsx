"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface HeroContent {
  heading: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
  videoUrl: string;
}

export default function HeroEditor() {
  const [data, setData] = useState<HeroContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=hero")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={S.pageTitle}>Hero Section</h1>
      <p style={S.pageSubtitle}>Edit the main banner on your home page</p>

      {saved && <div style={S.successMsg}>Hero section saved successfully!</div>}

      <div style={S.formCard}>
        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Main Heading</label>
          <textarea
            style={S.textareaStyle}
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
          />
        </div>

        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Description</label>
          <textarea
            style={S.textareaStyle}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
          <div>
            <label style={S.labelStyle}>Button Label</label>
            <input
              style={S.inputStyle}
              value={data.buttonLabel}
              onChange={(e) => setData({ ...data, buttonLabel: e.target.value })}
            />
          </div>
          <div>
            <label style={S.labelStyle}>Button Link</label>
            <input
              style={S.inputStyle}
              value={data.buttonLink}
              onChange={(e) => setData({ ...data, buttonLink: e.target.value })}
            />
          </div>
        </div>

        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Video URL</label>
          <input
            style={S.inputStyle}
            value={data.videoUrl}
            onChange={(e) => setData({ ...data, videoUrl: e.target.value })}
          />
        </div>

        <button style={S.saveBtn} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
