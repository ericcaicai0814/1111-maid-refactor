'use client';

import { useState, useCallback } from 'react';
import {
  childItems,
  extraItems,
  calculateEligibility,
  type CalculationResult,
} from '@/data/home/calculator';
import { Button } from '@/components/ui/button';

const severityStyles: Record<CalculationResult['severity'], string> = {
  success: 'bg-green-50 border-green-400 text-green-800',
  warning: 'bg-amber-50 border-amber-400 text-amber-800',
  error: 'bg-red-50 border-red-400 text-red-800',
};

export function EligibilityCalculator() {
  const [values, setValues] = useState<Map<string, number>>(() => {
    const map = new Map<string, number>();
    for (const item of [...childItems, ...extraItems]) {
      map.set(item.id, 0);
    }
    return map;
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleChange = useCallback((id: string, value: number) => {
    setValues((prev) => {
      const next = new Map(prev);
      next.set(id, Math.max(0, value));
      return next;
    });
  }, []);

  const handleCalculate = useCallback(() => {
    setResult(calculateEligibility(values));
  }, [values]);

  const handleReset = useCallback(() => {
    setValues((prev) => {
      const next = new Map(prev);
      for (const key of next.keys()) {
        next.set(key, 0);
      }
      return next;
    });
    setResult(null);
  }, []);

  const totalPoints = result?.totalPoints ?? 0;

  return (
    <section id="calculator" className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h3 className="text-center text-xl font-bold text-brand-dark md:text-2xl">
          資格與點數試算
        </h3>

        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          {/* 小朋友相關項目 */}
          <p className="mb-4 font-semibold text-brand-dark">
            【小朋友相關項目】
          </p>
          <div className="space-y-3">
            {childItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <label htmlFor={item.id} className="text-sm text-text-dark">
                  {item.label}
                </label>
                <input
                  id={item.id}
                  type="number"
                  min={0}
                  value={values.get(item.id) ?? 0}
                  onChange={(e) =>
                    handleChange(item.id, parseInt(e.target.value, 10) || 0)
                  }
                  className="w-20 rounded border border-border px-3 py-1.5 text-center text-sm"
                />
              </div>
            ))}
          </div>

          {/* 其他加分項目 */}
          <p className="mb-4 mt-8 font-semibold text-brand-dark">
            【其他加分項目】
          </p>
          <div className="space-y-3">
            {extraItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <label htmlFor={item.id} className="text-sm text-text-dark">
                  {item.label}
                </label>
                <input
                  id={item.id}
                  type="number"
                  min={0}
                  value={values.get(item.id) ?? 0}
                  onChange={(e) =>
                    handleChange(item.id, parseInt(e.target.value, 10) || 0)
                  }
                  className="w-20 rounded border border-border px-3 py-1.5 text-center text-sm"
                />
              </div>
            ))}
          </div>

          {/* 按鈕 */}
          <div className="mt-8 flex gap-3">
            <Button variant="outline" onClick={handleReset}>
              清除重置
            </Button>
            <Button onClick={handleCalculate}>計算總點數</Button>
          </div>

          {/* 結果 */}
          <div
            className={`mt-6 rounded-lg border p-4 text-center ${
              result ? severityStyles[result.severity] : 'border-border bg-muted'
            }`}
          >
            <p className="text-lg font-bold">總得分：{totalPoints}點</p>
            {result && <p className="mt-1 text-sm">{result.message}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
