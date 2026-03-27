"use client";
import { useEffect, useState } from "react";
import * as S from "../admin-styles";

interface MenuItem {
  title: string;
  href: string;
  children?: MenuItem[];
}

export default function MenuEditor() {
  const [data, setData] = useState<MenuItem[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=menu")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    await fetch("/api/admin/content?section=menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const items = [...data];
    items[index] = { ...items[index], [field]: value };
    setData(items);
  };

  const updateSubItem = (parentIndex: number, childIndex: number, field: string, value: string) => {
    const items = [...data];
    const children = [...(items[parentIndex].children || [])];
    children[childIndex] = { ...children[childIndex], [field]: value };
    items[parentIndex] = { ...items[parentIndex], children };
    setData(items);
  };

  const addMenuItem = () => {
    setData([...data, { title: "New Page", href: "/new-page" }]);
  };

  const removeMenuItem = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const addSubItem = (parentIndex: number) => {
    const items = [...data];
    const children = [...(items[parentIndex].children || [])];
    children.push({ title: "New Sub Page", href: "/new-sub-page" });
    items[parentIndex] = { ...items[parentIndex], children };
    setData(items);
  };

  const removeSubItem = (parentIndex: number, childIndex: number) => {
    const items = [...data];
    const children = (items[parentIndex].children || []).filter((_, i) => i !== childIndex);
    items[parentIndex] = {
      ...items[parentIndex],
      children: children.length > 0 ? children : undefined,
    };
    setData(items);
  };

  return (
    <div>
      <h1 style={S.pageTitle}>Menu / Navigation</h1>
      <p style={S.pageSubtitle}>
        Add, edit or remove menu items in the header. Drag-like reordering coming soon — for now, remove and re-add items to reorder.
      </p>

      {saved && <div style={S.successMsg}>Menu saved successfully! Refresh the site to see changes.</div>}

      {data.map((item, index) => (
        <div key={index} style={{ ...S.formCard, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "end", marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={S.labelStyle}>Menu Title</label>
              <input
                style={S.inputStyle}
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.labelStyle}>Link (URL)</label>
              <input
                style={S.inputStyle}
                value={item.href}
                onChange={(e) => updateItem(index, "href", e.target.value)}
              />
            </div>
            <button style={S.dangerBtn} onClick={() => removeMenuItem(index)}>
              Remove
            </button>
          </div>

          {/* Sub-items */}
          {item.children && item.children.length > 0 && (
            <div style={{ marginLeft: 24, borderLeft: "3px solid #6c5ce7", paddingLeft: 16 }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#6c5ce7" }}>
                SUB-MENU ITEMS
              </p>
              {item.children.map((child, childIndex) => (
                <div key={childIndex} style={{ display: "flex", gap: 12, alignItems: "end", marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <label style={S.labelStyle}>Title</label>
                    <input
                      style={S.inputStyle}
                      value={child.title}
                      onChange={(e) => updateSubItem(index, childIndex, "title", e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={S.labelStyle}>Link</label>
                    <input
                      style={S.inputStyle}
                      value={child.href}
                      onChange={(e) => updateSubItem(index, childIndex, "href", e.target.value)}
                    />
                  </div>
                  <button style={S.dangerBtn} onClick={() => removeSubItem(index, childIndex)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            style={{ ...S.addBtn, fontSize: 12, padding: "6px 14px", marginTop: 8 }}
            onClick={() => addSubItem(index)}
          >
            + Add Sub-item
          </button>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button style={S.addBtn} onClick={addMenuItem}>
          + Add Menu Item
        </button>
        <button style={S.saveBtn} onClick={handleSave}>
          Save Menu
        </button>
      </div>
    </div>
  );
}
