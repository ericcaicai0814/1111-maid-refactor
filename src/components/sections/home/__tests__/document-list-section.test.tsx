import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DocumentListSection } from '../document-list-section';

describe('DocumentListSection', () => {
  it('renders section title', () => {
    render(<DocumentListSection />);
    expect(screen.getByText('申請文件')).toBeInTheDocument();
  });

  it('renders flattened document bullet items', () => {
    render(<DocumentListSection />);
    expect(screen.getByText(/雇主身分證影本/)).toBeInTheDocument();
    expect(screen.getByText(/公立就業服務機構辦理國內招募/)).toBeInTheDocument();
    expect(screen.getByText(/審查費收據/)).toBeInTheDocument();
  });

  it('renders sub-items for special identity docs', () => {
    render(<DocumentListSection />);
    expect(screen.getByText(/身心障礙手冊影本/)).toBeInTheDocument();
  });
});
