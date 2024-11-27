import type { Metadata } from "next";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Waylarm | Providing up-to-date info for ongoing natural disasters.",
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
        <script src="https://unpkg.com/maplibre-gl@^4.7.1/dist/maplibre-gl.js"></script>
        <link href="https://unpkg.com/maplibre-gl@^4.7.1/dist/maplibre-gl.css" rel="stylesheet" />
      </head>
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
