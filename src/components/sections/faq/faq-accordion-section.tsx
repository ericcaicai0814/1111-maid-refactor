'use client';

import { useState, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
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
    <div className="rounded-lg border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <h6 className="font-medium text-text-dark">{item.question}</h6>
        <ChevronRight
          className={`size-5 shrink-0 text-text-light transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t px-5 py-4 text-sm text-text-mid">
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

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1100px] px-4">
        {/* 標題區 */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
            申請問答
          </h1>
        </div>

        {/* FAQ 單欄列表 */}
        <div className="flex flex-col gap-4">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openIds.has(item.id)}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
