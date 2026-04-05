import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { StatsCards } from '../stats-cards';

describe('StatsCards', () => {
  it('renders all five status cards with correct labels', () => {
    render(
      <StatsCards
        pending={5}
        contacted={3}
        processing={2}
        completed={10}
        cancelled={1}
      />
    );

    expect(screen.getByText('待處理')).toBeInTheDocument();
    expect(screen.getByText('已聯繫')).toBeInTheDocument();
    expect(screen.getByText('處理中')).toBeInTheDocument();
    expect(screen.getByText('已完成')).toBeInTheDocument();
    expect(screen.getByText('已取消')).toBeInTheDocument();
  });

  it('renders correct counts', () => {
    render(
      <StatsCards
        pending={5}
        contacted={3}
        processing={2}
        completed={10}
        cancelled={1}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders zero counts correctly', () => {
    render(
      <StatsCards
        pending={0}
        contacted={0}
        processing={0}
        completed={0}
        cancelled={0}
      />
    );

    const zeros = screen.getAllByText('0');
    expect(zeros).toHaveLength(5);
  });
});
