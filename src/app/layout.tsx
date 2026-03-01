import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import AppProvider from "@/app/provider/Provider";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LogBoard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} font-sans`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
