import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhyPhilippinesSection } from '../why-philippines-section';

describe('WhyPhilippinesSection', () => {
  it('renders section title', () => {
    render(<WhyPhilippinesSection />);
    expect(
      screen.getByText('為什麼選擇菲律賓幫傭？打造高品質育兒生活'),
    ).toBeInTheDocument();
  });

  it('renders all 4 feature items', () => {
    render(<WhyPhilippinesSection />);
    expect(screen.getByText('全天候英語啟蒙環境')).toBeInTheDocument();
    expect(screen.getByText('高比例醫護教保資歷')).toBeInTheDocument();
    expect(screen.getByText('溝通高效 品質感一致')).toBeInTheDocument();
    expect(screen.getByText('熱情耐心 融入家庭')).toBeInTheDocument();
  });
});
