"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { useEffect } from "react";

const btnStyle = (active: boolean): React.CSSProperties => ({
  padding: "4px 8px",
  background: active ? "#6c5ce7" : "#f0f0f0",
  color: active ? "#fff" : "#333",
  border: "1px solid #ddd",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  minWidth: 28,
  textAlign: "center",
});

const selectStyle: React.CSSProperties = {
  padding: "4px 6px",
  border: "1px solid #ddd",
  borderRadius: 4,
  fontSize: 12,
  background: "#f0f0f0",
  cursor: "pointer",
};

interface RichTextFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextField({ value, onChange }: RichTextFieldProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const setFontSize = (size: string) => {
    if (size === "default") {
      editor.chain().focus().unsetAllMarks().run();
    } else {
      editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2, padding: "6px 8px", background: "#fafafa", borderBottom: "1px solid #eee" }}>
        {/* Text formatting */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(editor.isActive("bold"))} title="Bold">B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(editor.isActive("italic"))} title="Italic"><i>I</i></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} style={btnStyle(editor.isActive("underline"))} title="Underline"><u>U</u></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} style={btnStyle(editor.isActive("strike"))} title="Strikethrough"><s>S</s></button>

        <span style={{ width: 1, background: "#ddd", margin: "0 4px" }} />

        {/* Headings */}
        <select
          style={selectStyle}
          value={
            editor.isActive("heading", { level: 1 }) ? "h1" :
            editor.isActive("heading", { level: 2 }) ? "h2" :
            editor.isActive("heading", { level: 3 }) ? "h3" :
            editor.isActive("heading", { level: 4 }) ? "h4" : "p"
          }
          onChange={(e) => {
            const val = e.target.value;
            if (val === "p") editor.chain().focus().setParagraph().run();
            else {
              const level = parseInt(val.replace("h", "")) as 1 | 2 | 3 | 4;
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>

        <span style={{ width: 1, background: "#ddd", margin: "0 4px" }} />

        {/* Font size */}
        <select style={selectStyle} onChange={(e) => setFontSize(e.target.value)} defaultValue="default">
          <option value="default">Size</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
          <option value="32px">32px</option>
          <option value="40px">40px</option>
          <option value="48px">48px</option>
        </select>

        {/* Text color */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          style={{ width: 28, height: 28, border: "1px solid #ddd", borderRadius: 4, cursor: "pointer", padding: 0 }}
          title="Text Color"
        />

        {/* Highlight */}
        <button type="button" onClick={() => editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()} style={btnStyle(editor.isActive("highlight"))} title="Highlight">H</button>

        <span style={{ width: 1, background: "#ddd", margin: "0 4px" }} />

        {/* Alignment */}
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} style={btnStyle(editor.isActive({ textAlign: "left" }))} title="Align Left">L</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} style={btnStyle(editor.isActive({ textAlign: "center" }))} title="Align Center">C</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} style={btnStyle(editor.isActive({ textAlign: "right" }))} title="Align Right">R</button>

        <span style={{ width: 1, background: "#ddd", margin: "0 4px" }} />

        {/* Lists */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(editor.isActive("bulletList"))} title="Bullet List">UL</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btnStyle(editor.isActive("orderedList"))} title="Numbered List">OL</button>

        <span style={{ width: 1, background: "#ddd", margin: "0 4px" }} />

        {/* Link */}
        <button type="button" onClick={addLink} style={btnStyle(editor.isActive("link"))} title="Add Link">Link</button>
        {editor.isActive("link") && (
          <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} style={{ ...btnStyle(false), color: "#e74c3c" }} title="Remove Link">Unlink</button>
        )}

        <span style={{ width: 1, background: "#ddd", margin: "0 4px" }} />

        {/* Blockquote */}
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} style={btnStyle(editor.isActive("blockquote"))} title="Quote">Q</button>

        {/* Clear formatting */}
        <button type="button" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} style={btnStyle(false)} title="Clear Formatting">Clear</button>
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        style={{
          padding: "10px 12px",
          minHeight: 100,
          fontSize: 14,
          lineHeight: 1.6,
        }}
      />

      {/* Editor styles */}
      <style>{`
        .tiptap {
          outline: none;
        }
        .tiptap p { margin: 0 0 8px; }
        .tiptap h1 { font-size: 28px; font-weight: 700; margin: 0 0 8px; }
        .tiptap h2 { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
        .tiptap h3 { font-size: 20px; font-weight: 600; margin: 0 0 8px; }
        .tiptap h4 { font-size: 18px; font-weight: 600; margin: 0 0 8px; }
        .tiptap ul, .tiptap ol { padding-left: 20px; margin: 0 0 8px; }
        .tiptap blockquote { border-left: 3px solid #6c5ce7; padding-left: 12px; margin: 0 0 8px; color: #666; }
        .tiptap a { color: #6c5ce7; text-decoration: underline; }
        .tiptap mark { padding: 2px 4px; border-radius: 2px; }
      `}</style>
    </div>
  );
}
