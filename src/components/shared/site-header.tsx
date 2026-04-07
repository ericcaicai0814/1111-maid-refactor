'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/navigation';
import { publicPaths } from '@/lib/paths';

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-brand text-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href={publicPaths.home} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="1111人力銀行"
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden gap-1 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/20 aria-[current=page]:bg-white/25"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenuButton />
      </div>
    </header>
  );
}

function MobileMenuButton() {
  return (
    <button
      className="flex size-9 items-center justify-center rounded-md hover:bg-white/20 sm:hidden"
      aria-label="開啟選單"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="3" y1="5" x2="17" y2="5" />
        <line x1="3" y1="10" x2="17" y2="10" />
        <line x1="3" y1="15" x2="17" y2="15" />
      </svg>
    </button>
  );
}
