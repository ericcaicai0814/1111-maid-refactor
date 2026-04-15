'use client';

import { useState, useCallback } from 'react';
import { faqItems } from '@/data/faq';
import type { FAQItem } from '@/data/types';

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: (id: number) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ddd8ee] bg-white shadow-[0_4px_20px_rgba(131,124,207,0.18)]">
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        className="flex w-full items-start justify-between gap-4 px-6 py-6 text-left md:px-9 md:py-7"
        aria-expanded={isOpen}
      >
        <span className="pr-2 text-[22px] font-medium leading-[1.35] tracking-[-0.02em] text-[#3d378e]">
          {item.question}
        </span>
        <svg
          className={`mt-1 h-6 w-6 shrink-0 text-[#4d46aa] transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#eae8fa] px-6 py-5 text-base leading-relaxed text-[#4f4b71] md:px-9 md:py-6">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordionSection() {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggle = useCallback((id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const half = Math.ceil(faqItems.length / 2);
  const leftItems = faqItems.slice(0, half);
  const rightItems = faqItems.slice(half);

  return (
    <div className="bg-[#f5f4ff]">
      <section id="faq" className="py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-5">
          <h2 className="mb-10 text-center text-[28px] font-semibold tracking-[-0.03em] text-[#3d378e] md:mb-12 md:text-[36px]">
            申請問答
          </h2>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-6">
              {leftItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openIds.has(item.id)}
                  onToggle={toggle}
                />
              ))}
            </div>
            <div className="space-y-6">
              {rightItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openIds.has(item.id)}
                  onToggle={toggle}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
