import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TableOfContents } from '../table-of-contents';

describe('TableOfContents', () => {
  const items = [
    { id: 'policy', label: '申請資格' },
    { id: 'calculator', label: '資格試算' },
    { id: 'cost', label: '費用表' },
    { id: 'process', label: '申請流程' },
    { id: 'documents', label: '申請文件' },
    { id: 'faq', label: '常見問題' },
  ];

  it('renders all TOC links', () => {
    render(<TableOfContents items={items} />);
    for (const item of items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it('renders anchor links with correct href', () => {
    render(<TableOfContents items={items} />);
    const firstLink = screen.getByText('申請資格').closest('a');
    expect(firstLink).toHaveAttribute('href', '#policy');
  });
});
