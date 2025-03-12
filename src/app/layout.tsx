import { cherryBomb, roboto, dynapuff, notoSansTagalog, outfit } from "./fonts/fonts";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "CollaboNote",
  description: "A place to collaborate and celebrate our wins over our goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cherryBomb.variable} ${roboto.variable} ${dynapuff.variable} ${notoSansTagalog.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
