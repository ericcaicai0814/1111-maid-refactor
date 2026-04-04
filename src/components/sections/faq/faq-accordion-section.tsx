'use client';

import { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems, faqGroups } from '@/data/faq';
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
        <span className="font-medium text-text-dark">{item.question}</span>
        <ChevronDown
          className={`size-5 shrink-0 text-text-light transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="border-t px-5 py-4 text-sm text-text-mid">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export function FAQAccordionSection() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
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

  const handleGroupChange = useCallback((groupId: string | null) => {
    setActiveGroup((prev) => (prev === groupId ? null : groupId));
    setOpenIds(new Set());
  }, []);

  const filteredItems =
    activeGroup
      ? (faqGroups.find((g) => g.id === activeGroup)?.items ?? [])
      : faqItems;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        {/* 標題區 */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
            常見問題
          </h1>
          <p className="mt-2 text-text-mid">
            關於外籍幫傭申請，您最關心的問題我們都替您整理好了
          </p>
        </div>

        {/* 分組 Tab */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => handleGroupChange(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeGroup === null
                ? 'bg-brand text-white'
                : 'bg-brand-light text-brand-dark hover:bg-brand/10'
            }`}
          >
            全部
          </button>
          {faqGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => handleGroupChange(group.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeGroup === group.id
                  ? 'bg-brand text-white'
                  : 'bg-brand-light text-brand-dark hover:bg-brand/10'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        {/* FAQ 雙欄 Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredItems.map((item) => (
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
