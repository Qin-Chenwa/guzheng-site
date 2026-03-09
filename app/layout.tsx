import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "古箏演奏家｜娃娃 Guzheng Artist WaWa", // 這裡就是瀏覽器標題
  description: "融合傳統底蘊與現代美學的古箏演奏藝術，提供演出邀約與古箏教學諮詢。", // 搜尋引擎看到的描述
  icons: {
    icon: "/guzheng-site/favicon.jpg", // 這裡可以更換分頁的小圖標
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
