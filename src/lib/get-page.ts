import { getPages } from "./db";

export interface SectionData {
  type: string;
  variant?: string;
  [key: string]: unknown;
}

export interface PageData {
  slug: string;
  title: string;
  sections: SectionData[];
}

export async function getPageData(slug: string): Promise<PageData | null> {
  try {
    const pages = await getPages();
    const page = await pages.findOne({ slug });
    if (page) {
      return {
        slug: page.slug,
        title: page.title,
        sections: page.sections || [],
      };
    }
  } catch {
    // DB not available
  }
  return null;
}

export function getSection(sections: SectionData[], type: string): SectionData | undefined {
  return sections.find((s) => s.type === type);
}

export function getSections(sections: SectionData[], type: string): SectionData[] {
  return sections.filter((s) => s.type === type);
}
