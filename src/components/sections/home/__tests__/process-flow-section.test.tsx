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
    expect(screen.getByText('符合申請條件資格')).toBeInTheDocument();
    expect(screen.getByText('辦理國內求才登記')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<ProcessFlowSection />);
    expect(
      screen.getByText(/請依序完成以下六個步驟/),
    ).toBeInTheDocument();
  });
});
