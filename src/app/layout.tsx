import type { Metadata } from "next";
import "./globals.css";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230A0F0D'/%3E%3Ccircle cx='16' cy='9' r='3' fill='%23F3EFE4'/%3E%3Ccircle cx='16' cy='16' r='3' fill='%23F3EFE4'/%3E%3Ccircle cx='16' cy='23' r='3' fill='%23F3EFE4'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: "Derive - Managed Operations for Tax Teams",
  description: "Work executed end-to-end, with your team in command.",
  icons: { icon: FAVICON },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* React 19 hoists these into <head>; the ported CSS relies on the real font names. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..600&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
          precedence="default"
        />
        {children}
      </body>
    </html>
  );
}
