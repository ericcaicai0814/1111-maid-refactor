import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuoteCTASection } from '../quote-cta-section';
import { publicPaths } from '@/lib/paths';

describe('QuoteCTASection', () => {
  it('renders quote text', () => {
    render(<QuoteCTASection />);
    expect(
      screen.getByText(/讓家務回歸專業.*菲籍人才/),
    ).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<QuoteCTASection />);
    const ctaLink = screen.getByRole('link', { name: '點我立即報名' });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', publicPaths.form);
  });
});
