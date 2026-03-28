"use client";
import { useRef, useState, useCallback } from "react";
import { useEditMode } from "./edit-mode-provider";

interface EditableImageProps {
  section: string;
  field: string;
  currentSrc: string;
  children: React.ReactNode;
}

export default function EditableImage({
  section,
  field,
  currentSrc,
  children,
}: EditableImageProps) {
  const { isEditMode, addChange, pendingChanges } = useEditMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const changeKey = `${section}.${field}`;
  const hasPendingChange = pendingChanges.has(changeKey);

  const openFilePicker = useCallback(() => {
    const input = fileInputRef.current;
    if (input) {
      input.value = "";
      input.click();
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      addChange(changeKey, {
        section,
        field,
        value: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }, [addChange, changeKey, section, field]);

  if (!isEditMode) return <>{children}</>;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          outline: hasPendingChange
            ? "3px solid #00b894"
            : isHovered
            ? "3px dashed #6c5ce7"
            : "none",
          outlineOffset: 2,
          borderRadius: 4,
        }}
      >
        {children}
      </div>

      {/* Overlay button — always on top, always clickable */}
      {isHovered && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openFilePicker();
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(108, 92, 231, 0.9)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'Segoe UI', sans-serif",
            border: "2px solid #fff",
            cursor: "pointer",
            zIndex: 100,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
        >
          Change Image
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
