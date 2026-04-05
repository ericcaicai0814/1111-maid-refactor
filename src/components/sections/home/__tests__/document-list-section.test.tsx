import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DocumentListSection } from '../document-list-section';

describe('DocumentListSection', () => {
  it('renders section title', () => {
    render(<DocumentListSection />);
    expect(screen.getByText('申請文件')).toBeInTheDocument();
  });

  it('renders all document categories', () => {
    render(<DocumentListSection />);
    expect(screen.getByText('基本身分證明')).toBeInTheDocument();
    expect(screen.getByText('國內求才證明')).toBeInTheDocument();
    expect(screen.getByText('審查費收據')).toBeInTheDocument();
  });

  it('renders sub-items for special identity docs', () => {
    render(<DocumentListSection />);
    expect(screen.getByText(/身心障礙手冊影本/)).toBeInTheDocument();
  });
});
