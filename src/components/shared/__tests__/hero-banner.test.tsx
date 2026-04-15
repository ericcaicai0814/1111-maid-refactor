import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroBanner } from '../hero-banner';

describe('HeroBanner', () => {
  it('renders title text', () => {
    render(<HeroBanner />);
    expect(
      screen.getByText(/2026政府放寬新制/),
    ).toBeInTheDocument();
  });

  it('renders hero image', () => {
    render(<HeroBanner />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(1);
  });
});
