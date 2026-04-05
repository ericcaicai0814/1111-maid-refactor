import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { StatusBadge } from '../status-badge';

describe('StatusBadge', () => {
  it('renders PENDING with correct text and yellow color', () => {
    render(<StatusBadge status="PENDING" />);
    const badge = screen.getByText('待處理');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-yellow-100');
    expect(badge).toHaveClass('text-yellow-800');
  });

  it('renders CONTACTED with correct text and blue color', () => {
    render(<StatusBadge status="CONTACTED" />);
    const badge = screen.getByText('已聯繫');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-100');
    expect(badge).toHaveClass('text-blue-800');
  });

  it('renders PROCESSING with correct text and purple color', () => {
    render(<StatusBadge status="PROCESSING" />);
    const badge = screen.getByText('處理中');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-purple-100');
    expect(badge).toHaveClass('text-purple-800');
  });

  it('renders COMPLETED with correct text and green color', () => {
    render(<StatusBadge status="COMPLETED" />);
    const badge = screen.getByText('已完成');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-100');
    expect(badge).toHaveClass('text-green-800');
  });

  it('renders CANCELLED with correct text and gray color', () => {
    render(<StatusBadge status="CANCELLED" />);
    const badge = screen.getByText('已取消');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100');
    expect(badge).toHaveClass('text-gray-800');
  });
});
