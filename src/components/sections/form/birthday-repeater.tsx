'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ApplicationFormData } from '@/data/form/schema';

interface BirthdayRepeaterProps {
  count: number;
}

export function BirthdayRepeater({ count }: BirthdayRepeaterProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();

  const currentBirthdays = watch('childBirthdays');

  useEffect(() => {
    const safeCount = Math.max(1, count);
    const current = currentBirthdays ?? [''];
    if (current.length !== safeCount) {
      const next = Array.from({ length: safeCount }, (_, i) => current[i] ?? '');
      setValue('childBirthdays', next, { shouldValidate: false });
    }
  }, [count, currentBirthdays, setValue]);

  const safeCount = Math.max(1, count);
  const indices = Array.from({ length: safeCount }, (_, i) => i);

  return (
    <div className="space-y-2">
      {indices.map((index) => (
        <div key={index}>
          <Label htmlFor={`childBirthdays.${index}`}>
            第 {index + 1} 位小朋友出生年月日
          </Label>
          <Input
            id={`childBirthdays.${index}`}
            type="date"
            {...register(`childBirthdays.${index}`)}
          />
          <p className="text-xs text-muted-foreground mt-1">請選擇出生年月日</p>
          {errors.childBirthdays?.[index] && (
            <p className="mt-1 text-sm text-red-500">
              {typeof errors.childBirthdays[index] === 'object' &&
              'message' in errors.childBirthdays[index]
                ? (errors.childBirthdays[index].message as string)
                : '請選擇出生年月日'}
            </p>
          )}
        </div>
      ))}
      {errors.childBirthdays?.message && (
        <p className="mt-1 text-sm text-red-500">
          {errors.childBirthdays.message}
        </p>
      )}
    </div>
  );
}
