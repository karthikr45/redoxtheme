"use client";
import { useRef, useState } from "react";
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

  if (!isEditMode) return <>{children}</>;

  const handleClick = () => {
    // Programmatically trigger file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      addChange(changeKey, {
        section,
        field,
        value: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      data-edit-ui="true"
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={handleClick}
        style={{
          outline: hasPendingChange
            ? "3px solid #00b894"
            : isHovered
            ? "3px dashed #6c5ce7"
            : "3px dashed transparent",
          outlineOffset: 2,
          borderRadius: 4,
          transition: "outline 0.15s",
        }}
      >
        {children}
      </div>

      {isHovered && (
        <div
          onClick={handleClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(108, 92, 231, 0.85)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'Segoe UI', sans-serif",
            whiteSpace: "nowrap",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          Click to replace image
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ position: "absolute", top: -9999, left: -9999, opacity: 0 }}
      />
    </div>
  );
}
