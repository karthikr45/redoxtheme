"use client";
import { EditModeProvider } from "./edit-mode-provider";
import EditToolbar from "./edit-toolbar";

export default function InlineEditWrapper({ children }: { children: React.ReactNode }) {
  return (
    <EditModeProvider>
      {children}
      <EditToolbar />
    </EditModeProvider>
  );
}
