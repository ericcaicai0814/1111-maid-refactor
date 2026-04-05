import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQAccordionSection } from '../faq-accordion-section';

describe('FAQAccordionSection', () => {
  it('渲染主標題「常見問題」', () => {
    render(<FAQAccordionSection />);
    expect(screen.getByText('常見問題')).toBeInTheDocument();
  });

  it('預設顯示全部 19 則 FAQ 問題', () => {
    render(<FAQAccordionSection />);
    const buttons = screen.getAllByRole('button', { expanded: false });
    // 19 個 FAQ 按鈕 + 3 個 tab 按鈕（全部、申請資格與流程、聘僱管理與權益）
    const faqButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('aria-expanded') !== null);
    expect(faqButtons).toHaveLength(19);
  });

  it('點擊分組按鈕後只顯示該組問題', () => {
    render(<FAQAccordionSection />);
    const group1Button = screen.getByText('申請資格與流程');
    fireEvent.click(group1Button);
    const faqButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('aria-expanded') !== null);
    expect(faqButtons).toHaveLength(10);
  });

  it('點擊 FAQ item 展開顯示答案', () => {
    render(<FAQAccordionSection />);
    const firstFAQButton = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('aria-expanded') !== null);
    expect(firstFAQButton).toBeDefined();

    const answer =
      '是的！過去申請幫傭需要極高的點數門檻（如多胞胎或多位幼童），新制大幅簡化為「只要有一名未滿 12 歲子女」即可申請，這讓多數雙薪家庭都能輕鬆跨過門檻。';
    expect(screen.queryByText(answer)).not.toBeInTheDocument();

    fireEvent.click(firstFAQButton!);
    expect(screen.getByText(answer)).toBeInTheDocument();
  });

  it('支援多個同時展開', () => {
    render(<FAQAccordionSection />);
    const faqButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('aria-expanded') !== null);

    fireEvent.click(faqButtons[0]);
    fireEvent.click(faqButtons[1]);

    const answer1 =
      '是的！過去申請幫傭需要極高的點數門檻（如多胞胎或多位幼童），新制大幅簡化為「只要有一名未滿 12 歲子女」即可申請，這讓多數雙薪家庭都能輕鬆跨過門檻。';
    const answer2 =
      '1111 嚴選的合作人選皆需提供該國「無犯罪紀錄證明（良民證）」，並經過嚴格健康檢查。我們更會優先媒合曾有「海外育兒經驗」或自身也有小孩的移工，確保她們具備足夠的耐心與同理心。';

    expect(screen.getByText(answer1)).toBeInTheDocument();
    expect(screen.getByText(answer2)).toBeInTheDocument();
  });
});
