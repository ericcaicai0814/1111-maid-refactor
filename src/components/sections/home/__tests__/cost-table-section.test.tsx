import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CostTableSection } from '../cost-table-section';

describe('CostTableSection', () => {
  it('renders main section title', () => {
    render(<CostTableSection />);
    expect(
      screen.getByText('外籍家庭幫傭月薪薪資及費用'),
    ).toBeInTheDocument();
  });

  it('renders 3 table subsection headings', () => {
    render(<CostTableSection />);
    expect(screen.getByText('雇主需支付(每月)')).toBeInTheDocument();
    expect(screen.getByText('外籍幫傭自付額')).toBeInTheDocument();
    expect(screen.getByText('備註事項')).toBeInTheDocument();
  });

  it('renders employer cost data', () => {
    render(<CostTableSection />);
    // baseSalary is in a table cell
    expect(screen.getByText('$20,000元')).toBeInTheDocument();
  });

  it('renders maid self-pay item names', () => {
    render(<CostTableSection />);
    // 健保費 appears in both tables - use getAllByText
    const healthInsTexts = screen.getAllByText('健保費');
    expect(healthInsTexts.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('體檢費')).toBeInTheDocument();
  });

  it('renders all 3 tables', () => {
    render(<CostTableSection />);
    const tables = screen.getAllByRole('table');
    expect(tables).toHaveLength(3);
  });
});
