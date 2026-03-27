import React from "react";

export const formCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: 10,
  padding: 30,
  border: "1px solid #e0e0e0",
  marginBottom: 20,
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #ddd",
  borderRadius: 6,
  fontSize: 14,
  boxSizing: "border-box",
  outline: "none",
  fontFamily: "inherit",
};

export const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 80,
  resize: "vertical",
};

export const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontSize: 13,
  fontWeight: 600,
  color: "#444",
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

export const fieldGroup: React.CSSProperties = {
  marginBottom: 18,
};

export const saveBtn: React.CSSProperties = {
  padding: "12px 32px",
  background: "#6c5ce7",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 15,
  cursor: "pointer",
  fontWeight: 600,
};

export const dangerBtn: React.CSSProperties = {
  padding: "8px 16px",
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 13,
  cursor: "pointer",
};

export const addBtn: React.CSSProperties = {
  padding: "10px 20px",
  background: "#00b894",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 600,
};

export const successMsg: React.CSSProperties = {
  padding: "12px 20px",
  background: "#d4edda",
  color: "#155724",
  borderRadius: 6,
  marginBottom: 20,
  fontSize: 14,
};

export const pageTitle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 28,
  color: "#1e1e2f",
};

export const pageSubtitle: React.CSSProperties = {
  margin: "0 0 24px",
  color: "#666",
  fontSize: 14,
};

export const itemCard: React.CSSProperties = {
  background: "#f9f9fb",
  borderRadius: 8,
  padding: 20,
  border: "1px solid #eee",
  marginBottom: 16,
};
