import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PolicyHighlightSection } from '../policy-highlight-section';

describe('PolicyHighlightSection', () => {
  it('renders section title', () => {
    render(<PolicyHighlightSection />);
    expect(
      screen.getByText('國人家庭幫傭申請資格總整理'),
    ).toBeInTheDocument();
  });

  it('renders all 4 policy items', () => {
    render(<PolicyHighlightSection />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it('renders subtitle', () => {
    render(<PolicyHighlightSection />);
    expect(
      screen.getByText(/放寬申請門檻/),
    ).toBeInTheDocument();
  });
});
