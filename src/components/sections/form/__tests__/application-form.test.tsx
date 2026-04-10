import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { ApplicationForm } from '../application-form';

describe('ApplicationForm', () => {
  it('renders the form with all field labels', () => {
    render(<ApplicationForm />);

    expect(screen.getByText('申請人大名')).toBeInTheDocument();
    // #1: 稱謂 → 申請人身份
    expect(screen.getByText('申請人身份')).toBeInTheDocument();
    expect(screen.queryByText('稱謂')).not.toBeInTheDocument();
    expect(screen.getByText(/12歲以下小朋友/)).toBeInTheDocument();
    expect(screen.getByText('小朋友的年齡')).toBeInTheDocument();
    expect(screen.getByText('小朋友出生年月日')).toBeInTheDocument();
    // #2: 家庭狀況 → 您是否有以下特殊資格
    expect(screen.getByText('您是否有以下特殊資格')).toBeInTheDocument();
    expect(screen.queryByText('家庭狀況')).not.toBeInTheDocument();
    expect(screen.getByText(/戶籍所在地/)).toBeInTheDocument();
    // #3: 幫傭國籍偏好 → 是否有指定的外傭國籍
    expect(screen.getByText('是否有指定的外傭國籍')).toBeInTheDocument();
    expect(screen.queryByText('幫傭國籍偏好')).not.toBeInTheDocument();
    expect(screen.getByText('手機號碼')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('服務單位')).toBeInTheDocument();
    expect(screen.getByText('職稱')).toBeInTheDocument();
    // #4: 方便聯絡時段 → 可聯絡時間
    expect(screen.getByText('可聯絡時間')).toBeInTheDocument();
    expect(screen.queryByText('方便聯絡時段')).not.toBeInTheDocument();
  });

  // #5: submit button text
  it('renders the submit button with correct text', () => {
    render(<ApplicationForm />);
    expect(
      screen.getByRole('button', { name: '送出報名' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '送出申請' }),
    ).not.toBeInTheDocument();
  });

  // #7: 聯絡方式 section divider
  it('renders 聯絡方式 section heading', () => {
    render(<ApplicationForm />);
    expect(screen.getByRole('heading', { name: '聯絡方式' })).toBeInTheDocument();
  });

  // #10: submit button style
  it('submit button has correct style classes', () => {
    render(<ApplicationForm />);
    const btn = screen.getByRole('button', { name: '送出報名' });
    expect(btn.className).toMatch(/rounded-full/);
    expect(btn.className).toMatch(/bg-\[#0056b3\]/);
  });

  // #11: no Card wrapper — no CardHeader title text
  it('does not render Card wrapper', () => {
    render(<ApplicationForm />);
    expect(screen.queryByText('申請外籍幫傭')).not.toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    await user.click(screen.getByRole('button', { name: '送出報名' }));

    await waitFor(() => {
      expect(screen.getByText('請輸入申請人大名')).toBeInTheDocument();
    });
  });

  it('renders title radio options', () => {
    render(<ApplicationForm />);

    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('renders familyStatus checkbox options', () => {
    render(<ApplicationForm />);

    expect(screen.getByText('都沒有')).toBeInTheDocument();
    expect(screen.getByText(/罕見疾病/)).toBeInTheDocument();
  });

  it('shows success message after valid submit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ApplicationForm onSubmit={onSubmit} />);

    // Fill required text fields
    await user.type(screen.getByLabelText(/申請人大名/), '王大明');

    // Select title radio - click the label for '父'
    const radioButtons = screen.getAllByRole('radio');
    await user.click(radioButtons[0]); // first radio = '父'

    // Fill birthday (date input)
    const birthdayInput = screen.getByLabelText(/第 1 位小朋友出生年月日/);
    await user.type(birthdayInput, '2020-01-01');

    // Check familyStatus - '都沒有'
    await user.click(screen.getByText('都沒有'));

    // Fill address
    await user.type(screen.getByLabelText(/戶籍所在地/), '台北市信義區');

    // Check nationality - '不指定'
    await user.click(screen.getByText('不指定'));

    // Fill phone
    await user.type(screen.getByLabelText(/手機號碼/), '0912345678');

    // Fill email
    await user.type(screen.getByLabelText(/Email/), 'test@example.com');

    // Fill company
    await user.type(screen.getByLabelText(/服務單位/), '測試公司');

    // Fill jobTitle
    await user.type(screen.getByLabelText(/職稱/), '工程師');

    // Check contactTime - click on label text
    await user.click(screen.getByText(/平日上午/));

    await user.click(screen.getByRole('button', { name: '送出報名' }));

    await waitFor(() => {
      expect(screen.getByText('表單送出成功')).toBeInTheDocument();
    });
  });
});
