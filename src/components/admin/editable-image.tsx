"use client";
import { useRef, useState } from "react";
import { useEditMode } from "./edit-mode-provider";
import Image from "next/image";

interface EditableImageProps {
  section: string;
  field: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export default function EditableImage({
  section,
  field,
  src,
  alt,
  width,
  height,
  className,
  style,
  ...rest
}: EditableImageProps) {
  const { isEditMode, addChange, pendingChanges } = useEditMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const changeKey = `${section}.${field}`;
  const hasPendingChange = pendingChanges.has(changeKey);

  const handleClick = () => {
    if (!isEditMode) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreviewSrc(dataUrl);
      addChange(changeKey, {
        section,
        field,
        value: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const displaySrc = previewSrc || src;

  if (!isEditMode) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  return (
    <span
      style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{
          ...style,
          outline: hasPendingChange
            ? "3px solid #00b894"
            : isHovered
            ? "3px dashed #6c5ce7"
            : "3px dashed transparent",
          outlineOffset: 2,
          borderRadius: 4,
          transition: "outline 0.15s",
        }}
        {...rest}
      />
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(108, 92, 231, 0.85)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Segoe UI', sans-serif",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10,
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
        style={{ display: "none" }}
      />
    </span>
  );
}
