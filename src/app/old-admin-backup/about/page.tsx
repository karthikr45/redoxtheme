"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface AboutContent {
  subtitle: string;
  heading: string;
  primaryButtonLabel: string;
  primaryButtonLink: string;
  secondaryButtonLabel: string;
  secondaryButtonLink: string;
}

export default function AboutEditor() {
  const [data, setData] = useState<AboutContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=about")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=about", {
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
      <h1 style={S.pageTitle}>About Section</h1>
      <p style={S.pageSubtitle}>Edit the about section on your home page</p>

      {saved && <div style={S.successMsg}>About section saved successfully!</div>}

      <div style={S.formCard}>
        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Subtitle</label>
          <input
            style={S.inputStyle}
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          />
        </div>

        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Heading</label>
          <textarea
            style={S.textareaStyle}
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
          <div>
            <label style={S.labelStyle}>Primary Button Label</label>
            <input
              style={S.inputStyle}
              value={data.primaryButtonLabel}
              onChange={(e) => setData({ ...data, primaryButtonLabel: e.target.value })}
            />
          </div>
          <div>
            <label style={S.labelStyle}>Primary Button Link</label>
            <input
              style={S.inputStyle}
              value={data.primaryButtonLink}
              onChange={(e) => setData({ ...data, primaryButtonLink: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
          <div>
            <label style={S.labelStyle}>Secondary Button Label</label>
            <input
              style={S.inputStyle}
              value={data.secondaryButtonLabel}
              onChange={(e) => setData({ ...data, secondaryButtonLabel: e.target.value })}
            />
          </div>
          <div>
            <label style={S.labelStyle}>Secondary Button Link</label>
            <input
              style={S.inputStyle}
              value={data.secondaryButtonLink}
              onChange={(e) => setData({ ...data, secondaryButtonLink: e.target.value })}
            />
          </div>
        </div>

        <button style={S.saveBtn} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
