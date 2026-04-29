import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/app/provider/Provider";

export const metadata: Metadata = { title: "LogBoard" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className="font-sans">
        <div id="portal-root" />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
