import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EligibilityCalculator } from '../eligibility-calculator';

describe('EligibilityCalculator', () => {
  it('renders section title', () => {
    render(<EligibilityCalculator />);
    expect(screen.getByText('資格與點數試算')).toBeInTheDocument();
  });

  it('renders all 6 input fields', () => {
    render(<EligibilityCalculator />);
    expect(screen.getAllByRole('spinbutton')).toHaveLength(6);
  });

  it('renders child and extra category labels', () => {
    render(<EligibilityCalculator />);
    expect(screen.getByText('【小朋友相關項目】')).toBeInTheDocument();
    expect(screen.getByText('【其他加分項目】')).toBeInTheDocument();
  });

  it('renders calculate and reset buttons', () => {
    render(<EligibilityCalculator />);
    expect(
      screen.getByRole('button', { name: '計算總點數' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '清除重置' }),
    ).toBeInTheDocument();
  });

  it('shows initial score as 0', () => {
    render(<EligibilityCalculator />);
    expect(screen.getByText(/總得分：0點/)).toBeInTheDocument();
  });

  it('calculates score when button clicked', async () => {
    const user = userEvent.setup();
    render(<EligibilityCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    // First input is 'child-6-to-12' (weight=4)
    await user.clear(inputs[0]);
    await user.type(inputs[0], '1');
    await user.click(screen.getByRole('button', { name: '計算總點數' }));

    expect(screen.getByText(/總得分：4點/)).toBeInTheDocument();
    expect(screen.getByText(/5,000/)).toBeInTheDocument();
  });

  it('resets form when reset button clicked', async () => {
    const user = userEvent.setup();
    render(<EligibilityCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '2');
    await user.click(screen.getByRole('button', { name: '計算總點數' }));
    await user.click(screen.getByRole('button', { name: '清除重置' }));

    expect(screen.getByText(/總得分：0點/)).toBeInTheDocument();
    for (const input of inputs) {
      expect(input).toHaveValue(0);
    }
  });

  it('shows ineligible message when no child selected', async () => {
    const user = userEvent.setup();
    render(<EligibilityCalculator />);

    await user.click(screen.getByRole('button', { name: '計算總點數' }));

    expect(screen.getByText(/不符合申請資格/)).toBeInTheDocument();
  });
});
