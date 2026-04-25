import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bikes and Brews | Omaha Brewery Bike Routes",
  description:
    "Curated Omaha brewery bike routes with optional audio-guided rides. Join the early access list and help shape launch."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
