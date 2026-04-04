import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const sweiGothic = localFont({
  src: [
    { path: '../fonts/SweiGothicCJKtc-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../fonts/SweiGothicCJKtc-Light.ttf', weight: '200', style: 'normal' },
    { path: '../fonts/SweiGothicCJKtc-DemiLight.ttf', weight: '300', style: 'normal' },
    { path: '../fonts/SweiGothicCJKtc-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/SweiGothicCJKtc-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../fonts/SweiGothicCJKtc-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../fonts/SweiGothicCJKtc-Black.ttf', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-swei-gothic',
});

export const metadata: Metadata = {
  title: '外籍幫傭申請 — 1111人力銀行',
  description: '12歲以下兒童家庭外籍幫傭申請專區',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={cn("font-sans", geist.variable)}>
      <body className="font-[family-name:var(--font-swei-gothic)]">{children}</body>
    </html>
  );
}
