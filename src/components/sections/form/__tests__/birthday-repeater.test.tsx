import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@/test-utils';
import { useForm, FormProvider } from 'react-hook-form';
import type { ApplicationFormData } from '@/data/form/schema';
import { BirthdayRepeater } from '../birthday-repeater';

function Wrapper({
  count,
  defaultBirthdays = [''],
}: {
  count: number;
  defaultBirthdays?: string[];
}) {
  const methods = useForm<ApplicationFormData>({
    defaultValues: {
      childBirthdays: defaultBirthdays,
      childrenCount: count,
    },
  });

  return (
    <FormProvider {...methods}>
      <BirthdayRepeater count={count} />
    </FormProvider>
  );
}

describe('BirthdayRepeater', () => {
  it('renders the correct number of date inputs', async () => {
    render(<Wrapper count={2} defaultBirthdays={['', '']} />);

    await waitFor(() => {
      expect(
        screen.getByLabelText(/第 1 位小朋友出生年月日/),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/第 2 位小朋友出生年月日/),
      ).toBeInTheDocument();
    });
  });

  it('renders one input by default', () => {
    render(<Wrapper count={1} />);

    expect(
      screen.getByLabelText(/第 1 位小朋友出生年月日/),
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/第 2 位小朋友出生年月日/),
    ).not.toBeInTheDocument();
  });

  it('adds inputs when count increases', async () => {
    const { rerender } = render(
      <Wrapper count={1} defaultBirthdays={['']} />,
    );

    expect(
      screen.getByLabelText(/第 1 位小朋友出生年月日/),
    ).toBeInTheDocument();

    rerender(<Wrapper count={3} defaultBirthdays={['', '', '']} />);

    await waitFor(() => {
      expect(
        screen.getByLabelText(/第 3 位小朋友出生年月日/),
      ).toBeInTheDocument();
    });
  });
});
