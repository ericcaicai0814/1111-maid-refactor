'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { publicPaths } from '@/lib/paths';

/** 右下浮動「申請表單」按鈕 — 在表單頁自動隱藏 */
export function FooterCTA() {
  const pathname = usePathname();

  if (pathname === publicPaths.form) return null;

  return (
    <Link
      href={publicPaths.form}
      className="fixed right-5 bottom-[90px] z-40 flex flex-col items-center gap-1 rounded-2xl px-[15px] py-2 text-[15px] font-semibold text-white shadow-lg transition hover:opacity-90"
      style={{
        background: 'linear-gradient(135deg, rgb(131,124,207), rgb(61,55,142))',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
      申請表單
    </Link>
  );
}
