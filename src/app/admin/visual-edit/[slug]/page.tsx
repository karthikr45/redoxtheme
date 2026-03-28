"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Puck, type Data } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";
import "@measured/puck/puck.css";

// Convert DB sections to Puck format
function dbToPuck(sections: Record<string, unknown>[]): Data {
  const typeMap: Record<string, string> = {
    hero: "Hero", works: "Works", marquee: "Marquee",
    about: "About", services: "Services", cta: "CTA",
    "page-title": "PageTitle",
  };

  const content = sections
    .filter((s) => typeMap[s.type as string])
    .map((s) => {
      const { type, variant, ...props } = s;
      return {
        type: typeMap[type as string],
        props: { ...props, id: `block-${Math.random().toString(36).slice(2, 8)}` },
      };
    });

  return { content, root: { props: {} } };
}

// Convert Puck format back to DB sections
function puckToDb(data: Data): Record<string, unknown>[] {
  const typeMap: Record<string, string> = {
    Hero: "hero", Works: "works", Marquee: "marquee",
    About: "about", Services: "services", CTA: "cta",
    PageTitle: "page-title",
  };

  return data.content.map((item) => {
    const { id, ...rest } = item.props;
    return { type: typeMap[item.type] || item.type, ...rest };
  });
}

export default function VisualEditorPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [pageData, setPageData] = useState<{ _id?: string; title: string; sections: Record<string, unknown>[] } | null>(null);
  const [puckData, setPuckData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) {
          setPageData(d);
          setPuckData(dbToPuck(d.sections || []));
        }
        setLoading(false);
      });
  }, [slug]);

  const handleSave = async (data: Data) => {
    if (!pageData) return;
    const sections = puckToDb(data);
    await fetch("/api/content?type=page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...pageData, sections }),
    });
    alert("Page saved! Refresh the live site to see changes.");
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading editor...</div>;
  if (!puckData) return <div style={{ padding: 40, textAlign: "center" }}>Page not found. Run npm run seed first.</div>;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
      <Puck
        config={puckConfig}
        data={puckData}
        onPublish={handleSave}
        headerTitle={`Editing: ${pageData?.title || slug}`}
      />
    </div>
  );
}
