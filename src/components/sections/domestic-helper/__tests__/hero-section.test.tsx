import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../hero-section';

describe('HeroSection', () => {
  it('renders main title', () => {
    render(<HeroSection />);
    expect(screen.getByText('育兒神隊友')).toBeInTheDocument();
  });

  it('renders eyebrow text', () => {
    render(<HeroSection />);
    expect(screen.getByText('給孩子一個英語環境的')).toBeInTheDocument();
  });

  it('renders highlighted text', () => {
    render(<HeroSection />);
    expect(screen.getByText('只要1名12歲以下子女')).toBeInTheDocument();
  });

  it('renders both CTA buttons', () => {
    render(<HeroSection />);
    expect(screen.getByText('查看申請資格')).toBeInTheDocument();
    expect(screen.getByText('立即報名')).toBeInTheDocument();
  });
});
