"use client";
import { useEffect, useState } from "react";
import { useEditMode } from "./edit-mode-provider";
import Link from "next/link";

interface AuthUser {
  username: string;
  name: string;
  role: string;
}

export default function EditToolbar() {
  const {
    isEditMode,
    toggleEditMode,
    pendingChanges,
    saveAll,
    discardAll,
    isSaving,
    savedMessage,
  } = useEditMode();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "check" }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
        setChecked(true);
      })
      .catch(() => setChecked(true));
  }, []);

  // Don't show anything if not logged in
  if (!checked || !user) return null;

  return (
    <>
      {/* Fixed Edit Button (Only for logged-in users) */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
          fontFamily: "'Segoe UI', Tahoma, sans-serif",
        }}
      >
        {/* Saved message */}
        {savedMessage && (
          <div
            style={{
              background: "#00b894",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            {savedMessage}
          </div>
        )}

        {/* Edit Mode Toolbar */}
        {isEditMode && (
          <div
            style={{
              background: "#1e1e2f",
              borderRadius: 12,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginRight: 4,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#00b894",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              <span style={{ color: "#fff", fontSize: 13 }}>EDIT MODE</span>
              <span style={{ color: "#888", fontSize: 11 }}>({user.name})</span>
            </div>

            {pendingChanges.size > 0 && (
              <span
                style={{
                  background: "#e74c3c",
                  color: "#fff",
                  padding: "2px 8px",
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {pendingChanges.size} change{pendingChanges.size > 1 ? "s" : ""}
              </span>
            )}

            <button
              onClick={saveAll}
              disabled={isSaving || pendingChanges.size === 0}
              style={{
                background: pendingChanges.size > 0 ? "#00b894" : "#555",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: pendingChanges.size > 0 ? "pointer" : "default",
                opacity: pendingChanges.size > 0 ? 1 : 0.5,
              }}
            >
              {isSaving ? "Saving..." : "Save All"}
            </button>

            {pendingChanges.size > 0 && (
              <button
                onClick={discardAll}
                style={{
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 14px",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Discard
              </button>
            )}

            <Link
              href="/admin"
              style={{
                background: "#333",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: 13,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              Admin Panel
            </Link>
          </div>
        )}

        {/* Toggle Edit Mode Button */}
        <button
          onClick={toggleEditMode}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: isEditMode ? "#e74c3c" : "#6c5ce7",
            color: "#fff",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        >
          {isEditMode ? "X" : "E"}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
