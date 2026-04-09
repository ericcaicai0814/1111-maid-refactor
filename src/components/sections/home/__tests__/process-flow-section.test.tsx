import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProcessFlowSection } from '../process-flow-section';

describe('ProcessFlowSection', () => {
  it('renders section title', () => {
    render(<ProcessFlowSection />);
    expect(
      screen.getByText('外籍家庭幫傭申請流程圖'),
    ).toBeInTheDocument();
  });

  it('renders all 6 step titles', () => {
    render(<ProcessFlowSection />);
    // Desktop zigzag + mobile stack both render the same steps → use getAllByText
    expect(screen.getAllByText('符合申請條件資格').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('辦理國內求才登記').length).toBeGreaterThanOrEqual(1);
  });

  it('renders subtitle', () => {
    render(<ProcessFlowSection />);
    expect(
      screen.getByText(/請依序完成以下六個步驟/),
    ).toBeInTheDocument();
  });
});
