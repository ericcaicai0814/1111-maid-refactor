import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MiniFAQ } from '../mini-faq';

describe('MiniFAQ', () => {
  it('renders section title', () => {
    render(<MiniFAQ />);
    expect(screen.getByText('申請問答')).toBeInTheDocument();
  });

  it('renders 4 FAQ accordion buttons', () => {
    render(<MiniFAQ />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });

  it('renders "view more" link', () => {
    render(<MiniFAQ />);
    expect(screen.getByRole('link', { name: /查看更多常見問題/ })).toBeInTheDocument();
  });
});
