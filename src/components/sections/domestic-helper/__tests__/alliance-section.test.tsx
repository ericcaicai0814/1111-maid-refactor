import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AllianceSection } from '../alliance-section';

describe('AllianceSection', () => {
  it('renders section title', () => {
    render(<AllianceSection />);
    expect(
      screen.getByText('跨海嚴選：與菲律賓頂尖仲介戰略結盟'),
    ).toBeInTheDocument();
  });

  it('renders all 3 feature items', () => {
    render(<AllianceSection />);
    expect(screen.getByText('菲律賓官方認證仲介')).toBeInTheDocument();
    expect(screen.getByText('雙重安全審核')).toBeInTheDocument();
    expect(screen.getByText('1111 實地考察把關')).toBeInTheDocument();
  });
});
