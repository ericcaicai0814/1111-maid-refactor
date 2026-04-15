'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { miniFAQItems } from '@/data/faq';
import { publicPaths } from '@/lib/paths';
import { ChevronDown } from 'lucide-react';

export function MiniFAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section id="faq-guide" className="scroll-mt-32">
      <div className="mx-auto max-w-5xl px-4">
        {/* 區塊標題 — 淡紫 hero pill */}
        <div className="mb-7 rounded-2xl bg-[#ecebf7] px-6 py-4 text-center">
          <h2 className="text-[1.55rem] font-semibold tracking-[-0.02em] text-[#3d378e] md:text-[1.8rem]">
            申請問答
          </h2>
        </div>

        <div className="space-y-3">
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
            href={publicPaths.faq}
            className="text-brand underline-offset-4 hover:underline"
          >
            找不到問題嗎？查看更多常見問題
          </Link>
        </div>
      </div>
    </section>
  );
}
