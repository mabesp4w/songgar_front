/** @format */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FPKK UOGP",
  description: "Generated by Songgar",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-montserrat">{children}</body>
    </html>
  );
}
