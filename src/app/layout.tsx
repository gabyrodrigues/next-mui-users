import type { Metadata } from "next";

import ThemeRegistry from "@theme/ThemeRegistry";
import UserContextProvider from "@contexts/User/provider";
import { Menu } from "@components/Menu";

export const metadata: Metadata = {
  title: "Next MUI Users",
  description:
    "Um simples registro de usuários desenvolvido com Typescript, NextJS, React Hook Form e MUI",
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
        <UserContextProvider>
          <Menu />
          <ThemeRegistry>{children}</ThemeRegistry>
        </UserContextProvider>
      </body>
    </html>
  );
}
