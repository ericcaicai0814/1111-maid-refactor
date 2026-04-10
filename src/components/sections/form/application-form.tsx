'use client';

import { useState, useTransition } from 'react';
import {
  useForm,
  useFormContext,
  FormProvider,
  Controller,
  type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ApplicationFormSchema,
  type ApplicationFormData,
} from '@/data/form/schema';
import {
  formFields,
  titleOptions,
  familyStatusOptions,
  nationalityOptions,
  contactTimeOptions,
  OTHER_OPTION_VALUE,
  type CheckboxOption,
} from '@/data/form/fields';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { BirthdayRepeater } from './birthday-repeater';
import { FormSuccess } from './form-success';
import { submitApplication } from '@/actions/application';

interface ApplicationFormProps {
  onSubmit?: SubmitHandler<ApplicationFormData>;
}

export function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      name: '',
      title: undefined,
      customTitle: '',
      childrenCount: 1,
      childAge: 0,
      childBirthdays: [''],
      familyStatus: [],
      address: '',
      nationalityPreference: [],
      customNationality: '',
      phone: '',
      email: '',
      company: '',
      jobTitle: '',
      contactTime: [],
      customContactTime: '',
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const childrenCount = watch('childrenCount');
  const titleValue = watch('title');
  const nationalityValue = watch('nationalityPreference');
  const contactTimeValue = watch('contactTime');

  const handleFormSubmit: SubmitHandler<ApplicationFormData> = (data) => {
    setSubmitError(null);
    startTransition(async () => {
      try {
        if (onSubmit) {
          onSubmit(data);
          setSubmitted(true);
          return;
        }
        const result = await submitApplication(data);
        if (result.success) {
          setSubmitted(true);
        } else {
          setSubmitError(result.error ?? '送出失敗，請稍後再試');
        }
      } catch {
        setSubmitError('送出失敗，請稍後再試');
      }
    });
  };

  if (submitted) {
    return <FormSuccess />;
  }

  const renderCheckboxGroup = (
    fieldName: 'familyStatus' | 'nationalityPreference' | 'contactTime',
    options: CheckboxOption[],
    currentValues: string[],
  ) => {
    const isNoneSelected =
      fieldName === 'familyStatus' && currentValues.includes('none');

    return (
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <div className="space-y-2">
            {options.map((option) => {
              const isChecked = field.value?.includes(option.value) ?? false;
              const isDisabled =
                fieldName === 'familyStatus' &&
                option.value !== 'none' &&
                isNoneSelected;

              return (
                <div key={option.value}>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id={`${fieldName}-${option.value}`}
                      checked={isChecked}
                      disabled={isDisabled}
                      onCheckedChange={(checked) => {
                        let newValues: string[];
                        if (
                          fieldName === 'familyStatus' &&
                          option.value === 'none'
                        ) {
                          // "none" is exclusive: clear everything else
                          newValues = checked ? ['none'] : [];
                        } else {
                          if (checked) {
                            newValues = [
                              ...field.value.filter((v: string) => v !== 'none'),
                              option.value,
                            ];
                          } else {
                            newValues = field.value.filter(
                              (v: string) => v !== option.value,
                            );
                          }
                        }
                        field.onChange(newValues);
                      }}
                    />
                    <Label
                      htmlFor={`${fieldName}-${option.value}`}
                      className="leading-normal font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                  {option.hasCustomInput &&
                    isChecked &&
                    fieldName !== 'familyStatus' && (
                      <CustomInput fieldName={fieldName} />
                    )}
                </div>
              );
            })}
          </div>
        )}
      />
    );
  };

  /** Render a single field's input area */
  const renderFieldInput = (field: (typeof formFields)[number]) => {
    const error = errors[field.name as keyof ApplicationFormData];

    return (
      <>
        {/* text / email / tel fields */}
        {['text', 'email', 'tel'].includes(field.type) && (
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name as keyof ApplicationFormData)}
          />
        )}

        {/* number field */}
        {field.type === 'number' && (
          <Input
            id={field.name}
            type="number"
            min={0}
            {...register(field.name as keyof ApplicationFormData, {
              valueAsNumber: true,
            })}
          />
        )}

        {/* radio field (title) */}
        {field.type === 'radio' && field.name === 'title' && (
          <Controller
            control={control}
            name="title"
            render={({ field: radioField }) => (
              <RadioGroup
                value={radioField.value}
                onValueChange={radioField.onChange}
              >
                {titleOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center gap-2"
                  >
                    <RadioGroupItem
                      id={`title-${option.value}`}
                      value={option.value}
                    />
                    <Label
                      htmlFor={`title-${option.value}`}
                      className="font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
                {titleValue === OTHER_OPTION_VALUE && (
                  <Input
                    placeholder="請輸入稱謂"
                    {...register('customTitle')}
                  />
                )}
              </RadioGroup>
            )}
          />
        )}

        {/* checkbox: familyStatus */}
        {field.type === 'checkbox' &&
          field.name === 'familyStatus' &&
          renderCheckboxGroup(
            'familyStatus',
            familyStatusOptions,
            watch('familyStatus') ?? [],
          )}

        {/* checkbox: nationalityPreference */}
        {field.type === 'checkbox' &&
          field.name === 'nationalityPreference' &&
          renderCheckboxGroup(
            'nationalityPreference',
            nationalityOptions,
            nationalityValue ?? [],
          )}

        {/* checkbox: contactTime */}
        {field.type === 'checkbox' &&
          field.name === 'contactTime' &&
          renderCheckboxGroup(
            'contactTime',
            contactTimeOptions,
            contactTimeValue ?? [],
          )}

        {/* date: childBirthdays repeater */}
        {field.type === 'date' && field.name === 'childBirthdays' && (
          <BirthdayRepeater count={childrenCount || 1} />
        )}

        {/* field error */}
        {error && 'message' in error && error.message && (
          <p className="text-sm text-red-500">{error.message as string}</p>
        )}
        {/* customTitle error */}
        {field.name === 'title' && errors.customTitle && (
          <p className="text-sm text-red-500">{errors.customTitle.message}</p>
        )}
        {/* customNationality error */}
        {field.name === 'nationalityPreference' &&
          errors.customNationality && (
            <p className="text-sm text-red-500">
              {errors.customNationality.message}
            </p>
          )}
        {/* customContactTime error */}
        {field.name === 'contactTime' && errors.customContactTime && (
          <p className="text-sm text-red-500">
            {errors.customContactTime.message}
          </p>
        )}
      </>
    );
  };

  // Split formFields into logical groups for layout
  const nameField = formFields.find((f) => f.name === 'name')!;
  const titleField = formFields.find((f) => f.name === 'title')!;
  const childrenCountField = formFields.find((f) => f.name === 'childrenCount')!;
  const childAgeField = formFields.find((f) => f.name === 'childAge')!;
  const childBirthdaysField = formFields.find((f) => f.name === 'childBirthdays')!;
  const familyStatusField = formFields.find((f) => f.name === 'familyStatus')!;
  const addressField = formFields.find((f) => f.name === 'address')!;
  const nationalityField = formFields.find((f) => f.name === 'nationalityPreference')!;
  const phoneField = formFields.find((f) => f.name === 'phone')!;
  const emailField = formFields.find((f) => f.name === 'email')!;
  const companyField = formFields.find((f) => f.name === 'company')!;
  const jobTitleField = formFields.find((f) => f.name === 'jobTitle')!;
  const contactTimeField = formFields.find((f) => f.name === 'contactTime')!;

  const renderLabeledField = (field: (typeof formFields)[number]) => (
    <div key={field.name} className="space-y-2">
      <Label htmlFor={field.name}>
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </Label>
      {renderFieldInput(field)}
    </div>
  );

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-2xl">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Row: 申請人大名 (50%) + 申請人身份 (50%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderLabeledField(nameField)}
            {renderLabeledField(titleField)}
          </div>

          {/* 小朋友人數 */}
          {renderLabeledField(childrenCountField)}

          {/* 小朋友年齡 */}
          {renderLabeledField(childAgeField)}

          {/* 小朋友出生年月日 repeater */}
          {renderLabeledField(childBirthdaysField)}

          {/* 您是否有以下特殊資格 */}
          {renderLabeledField(familyStatusField)}

          {/* 地址 */}
          {renderLabeledField(addressField)}

          {/* 是否有指定的外傭國籍 */}
          {renderLabeledField(nationalityField)}

          {/* 聯絡方式 section divider (#7) */}
          <h2 className="text-lg font-semibold border-b pb-2">聯絡方式</h2>

          {/* Row: 手機號碼 (50%) + Email (50%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderLabeledField(phoneField)}
            {renderLabeledField(emailField)}
          </div>

          {/* Row: 服務單位 (50%) + 職稱 (50%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderLabeledField(companyField)}
            {renderLabeledField(jobTitleField)}
          </div>

          {/* 可聯絡時間 */}
          {renderLabeledField(contactTimeField)}

          {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}

          {/* Submit button: rounded-full, #0056b3, centered, not full-width (#10) */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="rounded-full bg-[#0056b3] hover:bg-[#004494] px-8 py-2"
              disabled={isPending}
            >
              {isPending ? '報名中...' : '送出報名'}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

/** Helper: custom text input for "其他" options */
function CustomInput({
  fieldName,
}: {
  fieldName: 'nationalityPreference' | 'contactTime';
}) {
  const { register } = useFormContext<ApplicationFormData>();

  const customField =
    fieldName === 'nationalityPreference'
      ? ('customNationality' as const)
      : ('customContactTime' as const);

  const placeholder =
    fieldName === 'nationalityPreference' ? '請輸入國籍' : '請輸入聯絡時段';

  return (
    <div className="mt-1 ml-6">
      <Input placeholder={placeholder} {...register(customField)} />
    </div>
  );
}
