import type { Metadata } from "next";
import ThemeRegistry from "@theme/ThemeRegistry";
import { Menu } from "@components/Menu";

export const metadata: Metadata = {
  title: "Next MUI Users",
  description: "A simple Users Register developed with Typescript, React, NextJS and MUI",
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/icon-512.png",
    apple: "/img/icon-512.png"
  },
  manifest: "/manifest.json"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Menu />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
