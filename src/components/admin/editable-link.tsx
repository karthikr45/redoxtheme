"use client";
import { useState } from "react";
import { useEditMode } from "./edit-mode-provider";

interface EditableLinkProps {
  section: string;
  field: string;
  currentHref: string;
  children: React.ReactNode;
}

export default function EditableLink({
  section,
  field,
  currentHref,
  children,
}: EditableLinkProps) {
  const { isEditMode, addChange } = useEditMode();
  const [showPopup, setShowPopup] = useState(false);
  const [href, setHref] = useState(currentHref);

  if (!isEditMode) return <>{children}</>;

  const handleSave = () => {
    addChange(`${section}.${field}`, {
      section,
      field,
      value: href,
    });
    setShowPopup(false);
  };

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowPopup(!showPopup);
        }}
        style={{
          cursor: "pointer",
          outline: "2px dashed rgba(108,92,231,0.5)",
          outlineOffset: 2,
          borderRadius: 4,
          display: "inline-block",
        }}
      >
        {children}
      </span>

      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 8,
            background: "#1e1e2f",
            borderRadius: 8,
            padding: 14,
            zIndex: 99999,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            minWidth: 280,
            fontFamily: "'Segoe UI', sans-serif",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <label style={{ color: "#aaa", fontSize: 11, fontWeight: 600, display: "block", marginBottom: 6 }}>
            LINK URL
          </label>
          <input
            value={href}
            onChange={(e) => setHref(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              border: "1px solid #444",
              borderRadius: 6,
              background: "#2d2d44",
              color: "#fff",
              fontSize: 13,
              boxSizing: "border-box",
              outline: "none",
            }}
            placeholder="/page-url"
          />
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                padding: "7px 0",
                background: "#6c5ce7",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Save Link
            </button>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: "7px 12px",
                background: "#444",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
