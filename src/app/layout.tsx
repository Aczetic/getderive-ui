import type { Metadata } from "next";
import "./globals.css";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230A0F0D'/%3E%3Cpath d='M7 9c6 0 6 7 12 7' fill='none' stroke='%2322C08A' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M7 16c6 0 6 4 12 4' fill='none' stroke='%23E4C179' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M7 23c6 0 8-7 18-7' fill='none' stroke='%23F3EFE4' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: "Derive — AI-Managed Operations for Tax Teams",
  description: "Work executed end-to-end — with your team in command.",
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
          precedence="default"
        />
        {children}
      </body>
    </html>
  );
}
