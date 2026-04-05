'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { miniFAQItems } from '@/data/faq';
import { ChevronDown } from 'lucide-react';

export function MiniFAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section id="faq" className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center text-2xl font-bold text-brand-dark md:text-3xl">
          申請問答
        </h2>

        <div className="mt-8 space-y-3">
          {miniFAQItems.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                aria-expanded={openId === item.id}
              >
                <span className="font-medium text-text-dark">
                  {item.question}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-text-light transition-transform ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openId === item.id && (
                <div className="border-t px-5 py-4 text-sm text-text-mid">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-brand underline-offset-4 hover:underline"
          >
            找不到問題嗎？查看更多常見問題
          </Link>
        </div>
      </div>
    </section>
  );
}
