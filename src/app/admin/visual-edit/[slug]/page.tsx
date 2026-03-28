"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Puck, type Data } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";
import "@measured/puck/puck.css";

const DB_TO_PUCK: Record<string, string> = {
  hero: "Hero", works: "Works", marquee: "Marquee",
  about: "About", services: "Services", cta: "CTA",
  "page-title": "PageTitle", contact: "Contact",
  team: "Team", faq: "FAQ", blog: "Blog",
  client: "ClientLogos", funfact: "FunFacts",
};

const PUCK_TO_DB: Record<string, string> = {};
Object.entries(DB_TO_PUCK).forEach(([k, v]) => { PUCK_TO_DB[v] = k; });

// Flatten array items into numbered props for Puck (e.g. items[0].title → item1Title)
function flattenArrays(section: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(section)) {
    if (key === "type" || key === "variant") continue;

    if (key === "items" && Array.isArray(value)) {
      const prefix = section.type === "services" ? "svc" : "item";
      value.forEach((item: Record<string, unknown>, i: number) => {
        Object.entries(item).forEach(([field, val]) => {
          const capitalField = field.charAt(0).toUpperCase() + field.slice(1);
          result[`${prefix}${i + 1}${capitalField}`] = val;
        });
      });
    } else if (key === "members" && Array.isArray(value)) {
      value.forEach((m: Record<string, unknown>, i: number) => {
        result[`member${i + 1}Name`] = m.name;
        result[`member${i + 1}Post`] = m.post;
        result[`member${i + 1}Image`] = m.image || m.img;
      });
    } else if (key === "socialLinks" && Array.isArray(value)) {
      value.forEach((s: Record<string, unknown>, i: number) => {
        result[`social${i + 1}Label`] = s.label;
        result[`social${i + 1}Href`] = s.href;
      });
    } else if (Array.isArray(value) && section.type === "faq") {
      // FAQ items
      value.forEach((item: Record<string, unknown>, i: number) => {
        result[`q${i + 1}`] = item.question;
        result[`a${i + 1}`] = item.answer;
      });
    } else {
      result[key] = value;
    }
  }

  return result;
}

function dbToPuck(sections: Record<string, unknown>[]): Data {
  const content = sections
    .filter((s) => DB_TO_PUCK[s.type as string])
    .map((s) => {
      const flat = flattenArrays(s);
      return {
        type: DB_TO_PUCK[s.type as string],
        props: { ...flat, id: `block-${Math.random().toString(36).slice(2, 8)}` },
      };
    });

  return { content, root: { props: {} } };
}

function puckToDb(data: Data): Record<string, unknown>[] {
  return data.content.map((item) => {
    const { id, ...flat } = item.props;
    const type = PUCK_TO_DB[item.type] || item.type;
    const result: Record<string, unknown> = { type };

    // Separate flat numbered props back into arrays
    const items: Record<string, unknown>[] = [];
    const members: Record<string, unknown>[] = [];
    const socialLinks: Record<string, unknown>[] = [];
    const faqItems: Record<string, unknown>[] = [];

    for (const [key, value] of Object.entries(flat)) {
      // Work items: item1Title, item2Tag, etc.
      const itemMatch = key.match(/^item(\d+)([A-Z]\w*)$/);
      if (itemMatch) {
        const idx = parseInt(itemMatch[1]) - 1;
        const field = itemMatch[2].charAt(0).toLowerCase() + itemMatch[2].slice(1);
        if (!items[idx]) items[idx] = {};
        items[idx][field] = value;
        continue;
      }

      // Service items: svc1Title, svc2Number, etc.
      const svcMatch = key.match(/^svc(\d+)([A-Z]\w*)$/);
      if (svcMatch) {
        const idx = parseInt(svcMatch[1]) - 1;
        const field = svcMatch[2].charAt(0).toLowerCase() + svcMatch[2].slice(1);
        if (!items[idx]) items[idx] = {};
        items[idx][field] = value;
        continue;
      }

      // Team members: member1Name, member2Post, etc.
      const memberMatch = key.match(/^member(\d+)([A-Z]\w*)$/);
      if (memberMatch) {
        const idx = parseInt(memberMatch[1]) - 1;
        const field = memberMatch[2].charAt(0).toLowerCase() + memberMatch[2].slice(1);
        if (!members[idx]) members[idx] = {};
        members[idx][field] = value;
        continue;
      }

      // Social links: social1Label, social2Href, etc.
      const socialMatch = key.match(/^social(\d+)([A-Z]\w*)$/);
      if (socialMatch) {
        const idx = parseInt(socialMatch[1]) - 1;
        const field = socialMatch[2].charAt(0).toLowerCase() + socialMatch[2].slice(1);
        if (!socialLinks[idx]) socialLinks[idx] = {};
        socialLinks[idx][field] = value;
        continue;
      }

      // FAQ items: q1, a1, q2, a2, etc.
      const faqQ = key.match(/^q(\d+)$/);
      if (faqQ) {
        const idx = parseInt(faqQ[1]) - 1;
        if (!faqItems[idx]) faqItems[idx] = {};
        faqItems[idx].question = value;
        continue;
      }
      const faqA = key.match(/^a(\d+)$/);
      if (faqA) {
        const idx = parseInt(faqA[1]) - 1;
        if (!faqItems[idx]) faqItems[idx] = {};
        faqItems[idx].answer = value;
        continue;
      }

      // Stats: stat1Label, stat1Value, etc.
      const statMatch = key.match(/^stat(\d+)([A-Z]\w*)$/);
      if (statMatch) {
        const idx = parseInt(statMatch[1]) - 1;
        const field = statMatch[2].charAt(0).toLowerCase() + statMatch[2].slice(1);
        if (!items[idx]) items[idx] = {};
        items[idx][field] = value;
        continue;
      }

      // Regular field
      result[key] = value;
    }

    // Add arrays back if they have data
    const filledItems = items.filter((i) => i && Object.keys(i).length > 0);
    const filledMembers = members.filter((m) => m && Object.keys(m).length > 0);
    const filledSocial = socialLinks.filter((s) => s && Object.keys(s).length > 0);
    const filledFaq = faqItems.filter((f) => f && Object.keys(f).length > 0);

    if (filledItems.length > 0) result.items = filledItems;
    if (filledMembers.length > 0) result.members = filledMembers;
    if (filledSocial.length > 0) result.socialLinks = filledSocial;
    if (filledFaq.length > 0) result.items = filledFaq;

    return result;
  });
}

export default function VisualEditorPage() {
  const params = useParams();
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
