"use client";
import { createContext, useContext, useState, useCallback } from "react";

interface PendingChange {
  section: string;
  field: string;
  value: string;
  index?: number;
}

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  pendingChanges: Map<string, PendingChange>;
  addChange: (key: string, change: PendingChange) => void;
  saveAll: () => Promise<void>;
  discardAll: () => void;
  isSaving: boolean;
  savedMessage: string;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  pendingChanges: new Map(),
  addChange: () => {},
  saveAll: async () => {},
  discardAll: () => {},
  isSaving: false,
  savedMessage: "",
});

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) {
      setPendingChanges(new Map());
    }
  }, [isEditMode]);

  const addChange = useCallback((key: string, change: PendingChange) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      next.set(key, change);
      return next;
    });
  }, []);

  const saveAll = useCallback(async () => {
    if (pendingChanges.size === 0) return;
    setIsSaving(true);

    // Group changes by section
    const sectionChanges = new Map<string, PendingChange[]>();
    pendingChanges.forEach((change) => {
      const list = sectionChanges.get(change.section) || [];
      list.push(change);
      sectionChanges.set(change.section, list);
    });

    // For each section, fetch current data, apply changes, save
    for (const [section, changes] of sectionChanges) {
      try {
        const res = await fetch(`/api/admin/content?section=${section}`);
        const data = await res.json();

        for (const change of changes) {
          let value = change.value;

          // Handle image uploads (base64 data URLs)
          if (value.startsWith("data:image/")) {
            const blob = await fetch(value).then((r) => r.blob());
            const formData = new FormData();
            formData.append("file", blob, "image.png");
            const uploadRes = await fetch("/api/admin/upload", {
              method: "POST",
              body: formData,
            });
            const uploadData = await uploadRes.json();
            if (uploadData.success) {
              value = uploadData.url;
            }
          }

          if (change.index !== undefined && Array.isArray(data.items)) {
            const [itemField] = change.field.split(".");
            if (data.items[change.index]) {
              data.items[change.index][itemField] = value;
            }
          } else {
            data[change.field] = value;
          }
        }

        await fetch(`/api/admin/content?section=${section}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error(`Failed to save ${section}:`, err);
      }
    }

    setPendingChanges(new Map());
    setIsSaving(false);
    setSavedMessage("Changes saved! Refresh to see updates.");
    setTimeout(() => setSavedMessage(""), 4000);
  }, [pendingChanges]);

  const discardAll = useCallback(() => {
    setPendingChanges(new Map());
    window.location.reload();
  }, []);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        pendingChanges,
        addChange,
        saveAll,
        discardAll,
        isSaving,
        savedMessage,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}
