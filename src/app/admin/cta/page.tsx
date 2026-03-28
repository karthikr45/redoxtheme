"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface CtaContent {
  headingLine1: string;
  headingLine2: string;
  link: string;
}

export default function CtaEditor() {
  const [data, setData] = useState<CtaContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=cta")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=cta", {
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
      <h1 style={S.pageTitle}>CTA Section</h1>
      <p style={S.pageSubtitle}>Edit the call-to-action area on your home page</p>

      {saved && <div style={S.successMsg}>CTA section saved successfully!</div>}

      <div style={S.formCard}>
        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Heading Line 1</label>
          <input
            style={S.inputStyle}
            value={data.headingLine1}
            onChange={(e) => setData({ ...data, headingLine1: e.target.value })}
          />
        </div>

        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Heading Line 2</label>
          <input
            style={S.inputStyle}
            value={data.headingLine2}
            onChange={(e) => setData({ ...data, headingLine2: e.target.value })}
          />
        </div>

        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Link</label>
          <input
            style={S.inputStyle}
            value={data.link}
            onChange={(e) => setData({ ...data, link: e.target.value })}
          />
        </div>

        <button style={S.saveBtn} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
