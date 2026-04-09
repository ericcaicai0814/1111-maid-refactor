'use client';

import { useState, useCallback, useMemo } from 'react';
import { newPolicyItems } from '@/data/home/policy';
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

export function PolicyHighlightSection() {
  const [values, setValues] = useState<Map<string, number>>(() => {
    const map = new Map<string, number>();
    for (const item of [...childItems, ...extraItems]) {
      map.set(item.id, 0);
    }
    return map;
  });

  const result = useMemo(() => calculateEligibility(values), [values]);

  const handleChange = useCallback((id: string, value: number) => {
    setValues((prev) => {
      const next = new Map(prev);
      next.set(id, Math.max(0, value));
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setValues(() => {
      const next = new Map<string, number>();
      for (const item of [...childItems, ...extraItems]) {
        next.set(item.id, 0);
      }
      return next;
    });
  }, []);

  return (
    <section id="policy" className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        {/* 區塊標題 */}
        <h2 className="text-center text-2xl font-bold text-brand-dark md:text-3xl">
          國人家庭幫傭申請資格總整理
        </h2>
        <p className="mt-3 text-center text-text-mid">
          行政院拍板！大幅放寬申請門檻，快來看看您是否符合最新資格。
        </p>

        {/* 水平並排：政策卡片(40%) + 計算機(60%) */}
        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-start">

          {/* 政策卡片 — 金邊 */}
          <div
            id="policy-card"
            className="w-full rounded-2xl md:w-[40%]"
            style={{
              background: '#fffcf8',
              border: '2px solid #b88746',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            }}
          >
            <div className="p-5">
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white">
                  2026 政府放寬新制
                </span>
              </div>

              <ul className="space-y-4">
                {newPolicyItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {/* 紅勾 */}
                    <span className="mt-0.5 shrink-0 text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm text-text-dark">{item.text}</p>
                      <p
                        className="mt-1 text-sm font-black text-red-600"
                        style={{
                          backgroundImage:
                            'linear-gradient(to bottom, transparent 60%, #fde68a 60%)',
                          display: 'inline',
                        }}
                      >
                        {item.highlight}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 計算機 */}
          <div
            id="calculator"
            className="w-full md:w-[60%]"
            style={{
              border: '1px solid var(--primary)',
              borderRadius: '20px',
              boxShadow: 'var(--shadow)',
              background: 'white',
              padding: '24px',
            }}
          >
            <h3 className="text-center text-xl font-bold text-brand-dark">
              資格與點數試算
            </h3>

            {/* 小朋友相關項目 */}
            <p className="mb-3 mt-5 font-semibold text-brand-dark">
              【小朋友相關項目】
            </p>
            <div className="space-y-3">
              {childItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-[var(--primary-light)]"
                >
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
            <p className="mb-3 mt-6 font-semibold text-brand-dark">
              【其他加分項目】
            </p>
            <div className="space-y-3">
              {extraItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-[var(--primary-light)]"
                >
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

            {/* 清除按鈕 */}
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={handleReset}
                className="transition-transform hover:-translate-y-1"
              >
                清除重置
              </Button>
            </div>

            {/* 即時結果 — 永遠顯示 */}
            <div
              className={`mt-4 rounded-lg border p-4 text-center ${severityStyles[result.severity]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
                即時試算總得分
              </p>
              <p className="mt-1 text-2xl font-bold">{result.totalPoints} 點</p>
              <p className="mt-1 text-sm">{result.message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
