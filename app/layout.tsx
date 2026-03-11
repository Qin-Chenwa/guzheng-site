import type { Metadata } from "next";
import { Geist, Geist_Mono, Long_Cang, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// 引入狂草風格的 Long Cang
const calligraphy = Long_Cang({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-calligraphy',
  display: 'swap',
});

const serif = Noto_Serif_TC({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
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
