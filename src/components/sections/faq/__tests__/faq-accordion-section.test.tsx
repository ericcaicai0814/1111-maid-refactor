import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQAccordionSection } from '../faq-accordion-section';

describe('FAQAccordionSection', () => {
  it('渲染主標題「申請問答」', () => {
    render(<FAQAccordionSection />);
    expect(screen.getByText('申請問答')).toBeInTheDocument();
  });

  it('預設顯示全部 19 則 FAQ 問題', () => {
    render(<FAQAccordionSection />);
    const faqButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('aria-expanded') !== null);
    expect(faqButtons).toHaveLength(19);
  });

  it('點擊 FAQ item 展開顯示答案', () => {
    render(<FAQAccordionSection />);
    const firstFAQButton = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('aria-expanded') !== null);
    expect(firstFAQButton).toBeDefined();

    // CSS animation approach: content is always in DOM but hidden via grid-rows-[0fr]
    // After clicking, aria-expanded becomes true
    expect(firstFAQButton!.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(firstFAQButton!);
    expect(firstFAQButton!.getAttribute('aria-expanded')).toBe('true');
  });

  it('支援多個同時展開', () => {
    render(<FAQAccordionSection />);
    const faqButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('aria-expanded') !== null);

    fireEvent.click(faqButtons[0]);
    fireEvent.click(faqButtons[1]);

    expect(faqButtons[0].getAttribute('aria-expanded')).toBe('true');
    expect(faqButtons[1].getAttribute('aria-expanded')).toBe('true');
  });
});
