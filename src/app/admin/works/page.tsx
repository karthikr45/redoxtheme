"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface WorkItem {
  title: string;
  tag: string;
  date: string;
  image: string;
}

interface WorksContent {
  subtitle: string;
  heading: string;
  buttonLabel: string;
  buttonLink: string;
  items: WorkItem[];
}

export default function WorksEditor() {
  const [data, setData] = useState<WorksContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=works")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: keyof WorkItem, value: string) => {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    if (!data) return;
    setData({
      ...data,
      items: [
        ...data.items,
        {
          title: "New Project",
          tag: "Category",
          date: "(2025)",
          image: "/assets/imgs/project/image-30.webp",
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    if (!data) return;
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={S.pageTitle}>Works / Portfolio</h1>
      <p style={S.pageSubtitle}>Manage portfolio items on the home page</p>

      {saved && <div style={S.successMsg}>Works section saved successfully!</div>}

      <div style={S.formCard}>
        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Subtitle</label>
          <input style={S.inputStyle} value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
        </div>
        <div style={S.fieldGroup}>
          <label style={S.labelStyle}>Heading</label>
          <input style={S.inputStyle} value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
          <div>
            <label style={S.labelStyle}>Button Label</label>
            <input style={S.inputStyle} value={data.buttonLabel} onChange={(e) => setData({ ...data, buttonLabel: e.target.value })} />
          </div>
          <div>
            <label style={S.labelStyle}>Button Link</label>
            <input style={S.inputStyle} value={data.buttonLink} onChange={(e) => setData({ ...data, buttonLink: e.target.value })} />
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, margin: "24px 0 16px", color: "#1e1e2f" }}>
        Portfolio Items ({data.items.length})
      </h2>

      {data.items.map((item, index) => (
        <div key={index} style={S.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, color: "#1e1e2f" }}>Item #{index + 1}</h3>
            <button style={S.dangerBtn} onClick={() => removeItem(index)}>Remove</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={S.labelStyle}>Title</label>
              <input style={S.inputStyle} value={item.title} onChange={(e) => updateItem(index, "title", e.target.value)} />
            </div>
            <div>
              <label style={S.labelStyle}>Tag / Category</label>
              <input style={S.inputStyle} value={item.tag} onChange={(e) => updateItem(index, "tag", e.target.value)} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={S.labelStyle}>Date</label>
              <input style={S.inputStyle} value={item.date} onChange={(e) => updateItem(index, "date", e.target.value)} />
            </div>
            <div>
              <label style={S.labelStyle}>Image Path</label>
              <input style={S.inputStyle} value={item.image} onChange={(e) => updateItem(index, "image", e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button style={S.addBtn} onClick={addItem}>+ Add Work Item</button>
        <button style={S.saveBtn} onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}
