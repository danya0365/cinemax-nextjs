import type { Metadata } from "next";
import "../public/styles/index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CINEMAX - ดูซีรีย์ไมโครดราม่าออนไลน์",
  description:
    "แพลตฟอร์มสตรีมมิ่งซีรีย์ไมโครดราม่า ซีรีย์แนวตั้ง ซีรีย์สั้น ที่ดีที่สุดในประเทศไทย ตอนแรกดูฟรี!",
  keywords: [
    "ซีรีย์",
    "ไมโครดราม่า",
    "ซีรีย์แนวตั้ง",
    "ซีรีย์สั้น",
    "ดูซีรีย์ออนไลน์",
    "streaming",
    "micro drama",
  ],
  authors: [{ name: "CINEMAX" }],
  openGraph: {
    title: "CINEMAX - ดูซีรีย์ไมโครดราม่าออนไลน์",
    description:
      "แพลตฟอร์มสตรีมมิ่งซีรีย์ไมโครดราม่า ซีรีย์แนวตั้ง ซีรีย์สั้น ที่ดีที่สุดในประเทศไทย",
    type: "website",
    locale: "th_TH",
    siteName: "CINEMAX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
