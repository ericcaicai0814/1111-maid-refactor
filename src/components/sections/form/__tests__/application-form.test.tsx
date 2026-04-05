import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { ApplicationForm } from '../application-form';

describe('ApplicationForm', () => {
  it('renders the form with all field labels', () => {
    render(<ApplicationForm />);

    expect(screen.getByText('申請人大名')).toBeInTheDocument();
    expect(screen.getByText('稱謂')).toBeInTheDocument();
    expect(screen.getByText(/12歲以下小朋友/)).toBeInTheDocument();
    expect(screen.getByText('小朋友的年齡')).toBeInTheDocument();
    expect(screen.getByText('小朋友出生年月日')).toBeInTheDocument();
    expect(screen.getByText('家庭狀況')).toBeInTheDocument();
    expect(screen.getByText(/戶籍所在地/)).toBeInTheDocument();
    expect(screen.getByText('幫傭國籍偏好')).toBeInTheDocument();
    expect(screen.getByText('手機號碼')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('服務單位')).toBeInTheDocument();
    expect(screen.getByText('職稱')).toBeInTheDocument();
    expect(screen.getByText('方便聯絡時段')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ApplicationForm />);
    expect(
      screen.getByRole('button', { name: '送出申請' }),
    ).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    await user.click(screen.getByRole('button', { name: '送出申請' }));

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

    await user.click(screen.getByRole('button', { name: '送出申請' }));

    await waitFor(() => {
      expect(screen.getByText('表單送出成功')).toBeInTheDocument();
    });
  });
});
