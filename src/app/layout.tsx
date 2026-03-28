import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redox - Creative Agency and Portfolio Next js Template",
  description:
    "Redox is a creative agency and portfolio template built with Next.js, designed to showcase your work and services effectively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
