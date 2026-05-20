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

const SITE = "https://zhongrenfei1-hub.github.io/lineup-studio/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Lineup Studio · 电竞数据视频在线制作",
  description:
    "上传战队 + 选手数据,1 分钟生成抖音/B站能用的电竞高燃数据视频。雷达图 + MVP 自动识别 + 上传朋友照片 AI 抠图。",
  keywords: [
    "电竞",
    "Valorant",
    "VCT",
    "数据视频",
    "雷达图",
    "Remotion",
    "Esports Video",
  ],
  authors: [{ name: "zhongrenfei1-hub" }],
  openGraph: {
    title: "Lineup Studio · 电竞数据视频在线制作",
    description:
      "1 分钟出片 · 上传朋友照片自动抠图 · 真实 VCT 选手数据 · 双比例支持",
    url: SITE,
    siteName: "Lineup Studio",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lineup Studio · 电竞数据视频在线制作",
    description: "1 分钟出片 · 浏览器内编辑 + AI 抠图 · 真实战队数据",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
