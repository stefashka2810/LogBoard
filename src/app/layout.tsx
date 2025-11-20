import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogBoard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{
          backgroundImage: ''
      }}>
        {children}
      </body>
    </html>
  );
}
