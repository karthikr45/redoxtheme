"use client";
import { useEffect, useState } from "react";

interface MenuItem { title: string; href: string; children?: MenuItem[]; }
const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, boxSizing: "border-box" };

export default function MenuEditorPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    fetch("/api/content?type=menu").then(r => r.json()).then(d => setMenu(Array.isArray(d) ? d : []));
  }, []);

  const save = async () => {
    await fetch("/api/content?type=menu", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(menu),
    });
    setSaved("Menu saved!");
    setTimeout(() => setSaved(""), 3000);
  };

  const updateItem = (idx: number, field: string, value: string) => {
    const items = [...menu]; items[idx] = { ...items[idx], [field]: value }; setMenu(items);
  };
  const updateSubItem = (pIdx: number, cIdx: number, field: string, value: string) => {
    const items = [...menu]; const children = [...(items[pIdx].children || [])];
    children[cIdx] = { ...children[cIdx], [field]: value };
    items[pIdx] = { ...items[pIdx], children }; setMenu(items);
  };
  const addItem = () => setMenu([...menu, { title: "New Page", href: "/" }]);
  const removeItem = (idx: number) => setMenu(menu.filter((_, i) => i !== idx));
  const addSubItem = (pIdx: number) => {
    const items = [...menu]; const children = [...(items[pIdx].children || []), { title: "New Sub Page", href: "/" }];
    items[pIdx] = { ...items[pIdx], children }; setMenu(items);
  };
  const removeSubItem = (pIdx: number, cIdx: number) => {
    const items = [...menu]; const children = (items[pIdx].children || []).filter((_, i) => i !== cIdx);
    items[pIdx] = { ...items[pIdx], children: children.length ? children : undefined }; setMenu(items);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, color: "#1a1a2e" }}>Menu / Navigation</h1>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>Edit header navigation menu</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ color: "#00b894", fontWeight: 600, fontSize: 14 }}>{saved}</span>}
          <button onClick={save} style={{ padding: "10px 24px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save Menu</button>
        </div>
      </div>

      {menu.map((item, idx) => (
        <div key={idx} style={{ background: "#fff", borderRadius: 10, padding: 16, marginBottom: 12, border: "1px solid #e8e8e8" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "end", marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 4 }}>TITLE</label>
              <input style={inputStyle} value={item.title} onChange={e => updateItem(idx, "title", e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 4 }}>LINK</label>
              <input style={inputStyle} value={item.href} onChange={e => updateItem(idx, "href", e.target.value)} />
            </div>
            <button onClick={() => removeItem(idx)} style={{ padding: "8px 14px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Remove</button>
          </div>

          {item.children && item.children.length > 0 && (
            <div style={{ marginLeft: 20, borderLeft: "3px solid #6c5ce7", paddingLeft: 14 }}>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: "#6c5ce7" }}>SUB-MENU ITEMS</p>
              {item.children.map((child, cIdx) => (
                <div key={cIdx} style={{ display: "flex", gap: 10, alignItems: "end", marginBottom: 8 }}>
                  <div style={{ flex: 1 }}><input style={inputStyle} value={child.title} onChange={e => updateSubItem(idx, cIdx, "title", e.target.value)} /></div>
                  <div style={{ flex: 1 }}><input style={inputStyle} value={child.href} onChange={e => updateSubItem(idx, cIdx, "href", e.target.value)} /></div>
                  <button onClick={() => removeSubItem(idx, cIdx)} style={{ padding: "6px 12px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>X</button>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => addSubItem(idx)} style={{ padding: "6px 14px", background: "#00b894", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer", marginTop: 4 }}>+ Sub-item</button>
        </div>
      ))}

      <button onClick={addItem} style={{ width: "100%", padding: 14, background: "#fff", border: "2px dashed #ddd", borderRadius: 10, cursor: "pointer", fontSize: 15, color: "#6c5ce7", fontWeight: 600 }}>
        + Add Menu Item
      </button>
    </div>
  );
}
