import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import Script from 'next/script';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })



export const metadata: Metadata = {
  title: "Waylarm | Up-to-date info for ongoing natural disasters.",
  description: "We provide up-to-date info for ongoing natural disasters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://unpkg.com/maplibre-gl@^4.7.1/dist/maplibre-gl.js" 
          strategy="lazyOnload"
        />
        <link 
          href="https://unpkg.com/maplibre-gl@^4.7.1/dist/maplibre-gl.css" 
          rel="stylesheet" 
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}