"use client";
import { useEffect, useState, useRef } from "react";

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" };

const fontOptions = [
  { label: "BDO Grotesk (Default)", value: "font-heading-bdogrotesk-regular" },
  { label: "Sequel Sans", value: "font-heading-sequelsans-romanbody" },
  { label: "Instrument Sans", value: "font-heading-instrumentsans-medium" },
  { label: "DM Sans", value: "font-heading-dmsans" },
  { label: "Thunder", value: "font-heading-thunder" },
];

const colorPresets = [
  { label: "Purple (Default)", primary: "#6c5ce7", secondary: "#00b894" },
  { label: "Blue", primary: "#0984e3", secondary: "#00cec9" },
  { label: "Red", primary: "#d63031", secondary: "#e17055" },
  { label: "Green", primary: "#00b894", secondary: "#55efc4" },
  { label: "Orange", primary: "#e17055", secondary: "#fdcb6e" },
  { label: "Dark", primary: "#2d3436", secondary: "#636e72" },
];

interface SiteSettings {
  logo: string;
  logoDark: string;
  favicon: string;
  siteName: string;
  siteDescription: string;
  headingFont: string;
  primaryColor: string;
  secondaryColor: string;
  footerCopyright: string;
  footerCopyrightLink: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const defaultSettings: SiteSettings = {
  logo: "/assets/imgs/logo/logo-2.png",
  logoDark: "/assets/imgs/logo/logo-2.png",
  favicon: "",
  siteName: "Redox Agency",
  siteDescription: "Creative Agency and Portfolio",
  headingFont: "font-heading-bdogrotesk-regular",
  primaryColor: "#6c5ce7",
  secondaryColor: "#00b894",
  footerCopyright: "All rights reserved by",
  footerCopyrightLink: "https://themeforest.net/user/ravextheme",
  contactEmail: "hello@redoxagency.com",
  contactPhone: "(505) 555-0125",
  contactAddress: "3891 Ranchview Dr. Richardson",
};

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saved, setSaved] = useState("");
  const [loading, setLoading] = useState(true);
  const logoRef = useRef<HTMLInputElement>(null);
  const logoDarkRef = useRef<HTMLInputElement>(null);
  const faviconRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/content?type=settings")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) setSettings({ ...defaultSettings, ...d });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    await fetch("/api/content?type=settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaved("Settings saved!");
    setTimeout(() => setSaved(""), 3000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof SiteSettings) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setSettings({ ...settings, [field]: data.url });
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, color: "#1a1a2e" }}>Site Settings</h1>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>Logo, fonts, colors, and global settings</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ color: "#00b894", fontWeight: 600, fontSize: 14 }}>{saved}</span>}
          <button onClick={save} style={{ padding: "10px 24px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save Settings</button>
        </div>
      </div>

      {/* Branding */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 20, marginBottom: 16, border: "1px solid #e8e8e8" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, color: "#1a1a2e" }}>Branding</h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>SITE NAME</label>
            <input style={inputStyle} value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>SITE DESCRIPTION</label>
            <input style={inputStyle} value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {/* Logo Light */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>LOGO (LIGHT)</label>
            {settings.logo && <img src={settings.logo} alt="logo" style={{ height: 40, marginBottom: 8, background: "#1a1a2e", padding: "8px 16px", borderRadius: 6 }} />}
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...inputStyle, flex: 1, fontSize: 12 }} value={settings.logo} onChange={(e) => setSettings({ ...settings, logo: e.target.value })} />
              <button onClick={() => logoRef.current?.click()} style={{ padding: "8px 12px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>Upload</button>
              <input ref={logoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleUpload(e, "logo")} />
            </div>
          </div>

          {/* Logo Dark */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>LOGO (DARK)</label>
            {settings.logoDark && <img src={settings.logoDark} alt="logo dark" style={{ height: 40, marginBottom: 8, background: "#fff", padding: "8px 16px", borderRadius: 6, border: "1px solid #eee" }} />}
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...inputStyle, flex: 1, fontSize: 12 }} value={settings.logoDark} onChange={(e) => setSettings({ ...settings, logoDark: e.target.value })} />
              <button onClick={() => logoDarkRef.current?.click()} style={{ padding: "8px 12px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>Upload</button>
              <input ref={logoDarkRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleUpload(e, "logoDark")} />
            </div>
          </div>

          {/* Favicon */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>FAVICON</label>
            {settings.favicon && <img src={settings.favicon} alt="favicon" style={{ height: 32, marginBottom: 8 }} />}
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...inputStyle, flex: 1, fontSize: 12 }} value={settings.favicon} onChange={(e) => setSettings({ ...settings, favicon: e.target.value })} />
              <button onClick={() => faviconRef.current?.click()} style={{ padding: "8px 12px", background: "#6c5ce7", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>Upload</button>
              <input ref={faviconRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleUpload(e, "favicon")} />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 20, marginBottom: 16, border: "1px solid #e8e8e8" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, color: "#1a1a2e" }}>Typography</h3>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>HEADING FONT</label>
          <select style={inputStyle} value={settings.headingFont} onChange={(e) => setSettings({ ...settings, headingFont: e.target.value })}>
            {fontOptions.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
      </div>

      {/* Colors */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 20, marginBottom: 16, border: "1px solid #e8e8e8" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, color: "#1a1a2e" }}>Colors</h3>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {colorPresets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setSettings({ ...settings, primaryColor: preset.primary, secondaryColor: preset.secondary })}
              style={{
                padding: "8px 14px",
                border: settings.primaryColor === preset.primary ? "2px solid #333" : "1px solid #ddd",
                borderRadius: 8,
                cursor: "pointer",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: preset.primary, display: "inline-block" }} />
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: preset.secondary, display: "inline-block" }} />
              <span style={{ fontSize: 12 }}>{preset.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>PRIMARY COLOR</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} style={{ width: 44, height: 38, border: "1px solid #ddd", borderRadius: 6, cursor: "pointer" }} />
              <input style={inputStyle} value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>SECONDARY COLOR</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="color" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} style={{ width: 44, height: 38, border: "1px solid #ddd", borderRadius: 6, cursor: "pointer" }} />
              <input style={inputStyle} value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 20, marginBottom: 16, border: "1px solid #e8e8e8" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, color: "#1a1a2e" }}>Contact Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>EMAIL</label>
            <input style={inputStyle} value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>PHONE</label>
            <input style={inputStyle} value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>ADDRESS</label>
            <input style={inputStyle} value={settings.contactAddress} onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: "1px solid #e8e8e8" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, color: "#1a1a2e" }}>Footer</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>COPYRIGHT TEXT</label>
            <input style={inputStyle} value={settings.footerCopyright} onChange={(e) => setSettings({ ...settings, footerCopyright: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>COPYRIGHT LINK</label>
            <input style={inputStyle} value={settings.footerCopyrightLink} onChange={(e) => setSettings({ ...settings, footerCopyrightLink: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
}
