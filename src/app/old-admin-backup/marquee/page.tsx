"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

export default function MarqueeEditor() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=marquee")
      .then((r) => r.json())
      .then((d) => setText(d.text));
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=marquee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 style={S.pageTitle}>Marquee Text</h1>
      <p style={S.pageSubtitle}>Edit the scrolling text on the home page</p>

      {saved && <div style={S.successMsg}>Marquee text saved successfully!</div>}

      <div style={S.formCard}>
        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Marquee Text</label>
          <input
            style={S.inputStyle}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button style={S.saveBtn} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
