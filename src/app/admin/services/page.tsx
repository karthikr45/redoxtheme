"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  text: string;
  image: string;
  link: string;
}

interface ServicesContent {
  subtitle: string;
  heading: string;
  description: string;
  items: ServiceItem[];
}

export default function ServicesEditor() {
  const [data, setData] = useState<ServicesContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=services")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: keyof ServiceItem, value: string) => {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    if (!data) return;
    const newId = String(data.items.length + 1);
    setData({
      ...data,
      items: [
        ...data.items,
        {
          id: newId,
          number: `(${newId.padStart(3, "0")})`,
          title: "New Service",
          text: "Service description here",
          image: "/assets/imgs/project/image-47.webp",
          link: "/service-details",
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
      <h1 style={S.pageTitle}>Services Section</h1>
      <p style={S.pageSubtitle}>Manage the services displayed on your home page</p>

      {saved && <div style={S.successMsg}>Services saved successfully!</div>}

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
          <input
            style={S.inputStyle}
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
      </div>

      <h2 style={{ fontSize: 20, margin: "24px 0 16px", color: "#1e1e2f" }}>
        Service Items ({data.items.length})
      </h2>

      {data.items.map((item, index) => (
        <div key={index} style={S.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, color: "#1e1e2f" }}>
              Service #{index + 1}
            </h3>
            <button style={S.dangerBtn} onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={S.labelStyle}>Number</label>
              <input style={S.inputStyle} value={item.number} onChange={(e) => updateItem(index, "number", e.target.value)} />
            </div>
            <div>
              <label style={S.labelStyle}>Title</label>
              <input style={S.inputStyle} value={item.title} onChange={(e) => updateItem(index, "title", e.target.value)} />
            </div>
          </div>
          <div style={S.fieldGroup}>
            <label style={S.labelStyle}>Description</label>
            <textarea style={S.textareaStyle} value={item.text} onChange={(e) => updateItem(index, "text", e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={S.labelStyle}>Image Path</label>
              <input style={S.inputStyle} value={item.image} onChange={(e) => updateItem(index, "image", e.target.value)} />
            </div>
            <div>
              <label style={S.labelStyle}>Link</label>
              <input style={S.inputStyle} value={item.link} onChange={(e) => updateItem(index, "link", e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button style={S.addBtn} onClick={addItem}>
          + Add Service
        </button>
        <button style={S.saveBtn} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
