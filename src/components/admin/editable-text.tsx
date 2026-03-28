"use client";
import { useRef, useState, useEffect } from "react";
import { useEditMode } from "./edit-mode-provider";

interface EditableTextProps {
  section: string;
  field: string;
  index?: number;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
  [key: string]: unknown;
}

export default function EditableText({
  section,
  field,
  index,
  children,
  as: Tag = "span",
  className,
  style,
  multiline = false,
  ...rest
}: EditableTextProps) {
  const { isEditMode, addChange, pendingChanges } = useEditMode();
  const ref = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const changeKey = `${section}.${field}${index !== undefined ? `.${index}` : ""}`;
  const hasPendingChange = pendingChanges.has(changeKey);

  // Reset content when edit mode is turned off
  useEffect(() => {
    if (!isEditMode && ref.current) {
      setIsEditing(false);
    }
  }, [isEditMode]);

  const handleClick = () => {
    if (!isEditMode) return;
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (!isEditMode || !ref.current) return;
    setIsEditing(false);

    const newValue = ref.current.innerText.trim();
    const originalValue = typeof children === "string" ? children : "";

    if (newValue !== originalValue) {
      addChange(changeKey, {
        section,
        field,
        value: newValue,
        index,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      ref.current?.blur();
    }
    if (e.key === "Escape") {
      if (ref.current) {
        ref.current.innerText = typeof children === "string" ? children : "";
      }
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    // @ts-expect-error dynamic tag
    return <Tag className={className} style={style} {...rest}>{children}</Tag>;
  }

  const editStyles: React.CSSProperties = {
    ...style,
    position: "relative",
    cursor: "pointer",
    transition: "outline 0.15s, box-shadow 0.15s",
    outline: isEditing
      ? "2px solid #6c5ce7"
      : isHovered
      ? "2px dashed #6c5ce7"
      : hasPendingChange
      ? "2px solid #00b894"
      : "2px dashed transparent",
    outlineOffset: 2,
    boxShadow: isEditing ? "0 0 0 4px rgba(108,92,231,0.15)" : "none",
    borderRadius: 4,
    minWidth: 20,
    minHeight: 20,
  };

  return (
    <>
      {/* @ts-expect-error dynamic tag */}
      <Tag
        ref={ref}
        className={className}
        style={editStyles}
        contentEditable={isEditing}
        suppressContentEditableWarning
        data-edit-ui="true"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          handleClick();
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        {children}
      </Tag>

      {/* Label tooltip */}
      {isEditMode && isHovered && !isEditing && (
        <div
          style={{
            position: "absolute",
            background: "#6c5ce7",
            color: "#fff",
            fontSize: 11,
            padding: "3px 8px",
            borderRadius: 4,
            fontWeight: 600,
            fontFamily: "'Segoe UI', sans-serif",
            zIndex: 99998,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            marginTop: -24,
            letterSpacing: 0.3,
          }}
        >
          Click to edit: {field}
        </div>
      )}
    </>
  );
}
