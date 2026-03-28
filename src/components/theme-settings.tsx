import { getSiteSettingsData } from "@/lib/get-settings";

export default async function ThemeSettings() {
  const settings = await getSiteSettingsData();

  // Override theme colors and fonts via CSS
  const customCSS = `
    :root {
      --theme-primary: ${settings.primaryColor};
      --theme-secondary: ${settings.secondaryColor};
    }

    /* Apply primary color to buttons, links, accents */
    .rr-btn,
    .rr-btn-group,
    .submit-btn button {
      background-color: var(--theme-primary) !important;
    }
    .rr-btn:hover {
      background-color: var(--theme-secondary) !important;
    }
    .rr-btn-underline::after,
    .rr-btn-underline:hover {
      color: var(--theme-primary) !important;
    }
    .section-subtitle {
      color: var(--theme-primary) !important;
    }
    .section-subtitle svg path {
      stroke: var(--theme-primary) !important;
    }
    .scroll-to-top {
      background-color: var(--theme-primary) !important;
    }
    .mean-expand:hover {
      color: var(--theme-primary) !important;
    }

    /* Font override based on settings */
    ${settings.headingFont === "font-heading-sequelsans-romanbody" ? `
      h1, h2, h3, h4, h5, h6, .section-title {
        font-family: var(--font_sequelsansromanbody) !important;
      }
    ` : ""}
    ${settings.headingFont === "font-heading-instrumentsans-medium" ? `
      h1, h2, h3, h4, h5, h6, .section-title {
        font-family: var(--font_instrumentsans) !important;
      }
    ` : ""}
    ${settings.headingFont === "font-heading-dmsans" ? `
      h1, h2, h3, h4, h5, h6, .section-title {
        font-family: var(--font_dmsans) !important;
      }
    ` : ""}
    ${settings.headingFont === "font-heading-thunder" ? `
      h1, h2, h3, h4, h5, h6, .section-title {
        font-family: var(--font_thunder) !important;
      }
    ` : ""}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      {settings.favicon && (
        <link rel="icon" href={settings.favicon} />
      )}
    </>
  );
}
