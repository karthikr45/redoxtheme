import { getSiteSettingsData } from "@/lib/get-settings";

export default async function ThemeSettings() {
  const settings = await getSiteSettingsData();

  // Inject custom CSS variables based on site settings
  const customCSS = `
    :root {
      --theme-primary: ${settings.primaryColor};
      --theme-secondary: ${settings.secondaryColor};
    }
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
