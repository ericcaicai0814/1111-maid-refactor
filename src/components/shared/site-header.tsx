'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navItems } from '@/data/navigation';
import { publicPaths } from '@/lib/paths';

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-[99]">
      {/* Row 1: Logo bar */}
      <div className="bg-white">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center px-4 md:px-10">
          <Link href={publicPaths.home} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/domestic-helper/外傭專區_LOGO-300x76.png"
              alt="1111外傭專區"
              className="h-10 w-auto"
            />
          </Link>
          <MobileMenuButton open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
        </div>
      </div>

      {/* Row 2: Nav bar (desktop) */}
      <nav className="hidden bg-brand-dark sm:block">
        <div className="mx-auto flex h-[52px] max-w-[1100px] items-center gap-5 px-4 md:px-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className="text-xl font-bold text-white transition-colors hover:text-brand-accent aria-[current=page]:text-brand-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <nav className="bg-brand-dark sm:hidden">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-brand/20 hover:text-brand-accent aria-[current=page]:text-brand-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="ml-auto flex size-9 items-center justify-center rounded-md text-brand-dark hover:bg-brand-bg sm:hidden"
      aria-label={open ? '關閉選單' : '開啟選單'}
      aria-expanded={open}
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
        {open ? (
          <>
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </>
        ) : (
          <>
            <line x1="3" y1="5" x2="17" y2="5" />
            <line x1="3" y1="10" x2="17" y2="10" />
            <line x1="3" y1="15" x2="17" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
