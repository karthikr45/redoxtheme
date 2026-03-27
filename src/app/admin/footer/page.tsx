"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface NavItem {
  label: string;
  href: string;
}

interface FooterContent {
  navItems: NavItem[];
  copyrightText: string;
  copyrightHolder: string;
  copyrightLink: string;
  startYear: string;
}

export default function FooterEditor() {
  const [data, setData] = useState<FooterContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=footer")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=footer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateNavItem = (index: number, field: keyof NavItem, value: string) => {
    if (!data) return;
    const navItems = [...data.navItems];
    navItems[index] = { ...navItems[index], [field]: value };
    setData({ ...data, navItems });
  };

  const addNavItem = () => {
    if (!data) return;
    setData({ ...data, navItems: [...data.navItems, { label: "New Link", href: "/" }] });
  };

  const removeNavItem = (index: number) => {
    if (!data) return;
    setData({ ...data, navItems: data.navItems.filter((_, i) => i !== index) });
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={S.pageTitle}>Footer</h1>
      <p style={S.pageSubtitle}>Edit the footer navigation and copyright info</p>

      {saved && <div style={S.successMsg}>Footer saved successfully!</div>}

      <h2 style={{ fontSize: 20, margin: "0 0 16px", color: "#1e1e2f" }}>Navigation Links</h2>

      {data.navItems.map((item, index) => (
        <div key={index} style={{ ...S.itemCard, display: "flex", gap: 12, alignItems: "end" }}>
          <div style={{ flex: 1 }}>
            <label style={S.labelStyle}>Label</label>
            <input style={S.inputStyle} value={item.label} onChange={(e) => updateNavItem(index, "label", e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={S.labelStyle}>Link</label>
            <input style={S.inputStyle} value={item.href} onChange={(e) => updateNavItem(index, "href", e.target.value)} />
          </div>
          <button style={S.dangerBtn} onClick={() => removeNavItem(index)}>Remove</button>
        </div>
      ))}

      <button style={{ ...S.addBtn, marginBottom: 24 }} onClick={addNavItem}>+ Add Link</button>

      <h2 style={{ fontSize: 20, margin: "0 0 16px", color: "#1e1e2f" }}>Copyright</h2>

      <div style={S.formCard}>
        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, marginBottom: 18 }}>
          <div>
            <label style={S.labelStyle}>Start Year</label>
            <input style={S.inputStyle} value={data.startYear} onChange={(e) => setData({ ...data, startYear: e.target.value })} />
          </div>
          <div>
            <label style={S.labelStyle}>Copyright Text</label>
            <input style={S.inputStyle} value={data.copyrightText} onChange={(e) => setData({ ...data, copyrightText: e.target.value })} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
          <div>
            <label style={S.labelStyle}>Company Name</label>
            <input style={S.inputStyle} value={data.copyrightHolder} onChange={(e) => setData({ ...data, copyrightHolder: e.target.value })} />
          </div>
          <div>
            <label style={S.labelStyle}>Company Link</label>
            <input style={S.inputStyle} value={data.copyrightLink} onChange={(e) => setData({ ...data, copyrightLink: e.target.value })} />
          </div>
        </div>

        <button style={S.saveBtn} onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}
