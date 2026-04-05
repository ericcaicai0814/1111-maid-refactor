import { newPolicyItems } from '@/data/home/policy';
import { CheckCircle, Clock } from 'lucide-react';

const iconMap = {
  check: CheckCircle,
  clock: Clock,
} as const;

export function PolicyHighlightSection() {
  return (
    <section id="policy" className="bg-brand-bg py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center text-2xl font-bold text-brand-dark md:text-3xl">
          國人家庭幫傭申請資格總整理
        </h2>
        <p className="mt-3 text-center text-text-mid">
          行政院拍板！大幅放寬申請門檻，快來看看您是否符合最新資格。
        </p>

        <div className="mt-4 mb-8 text-center">
          <span className="inline-block rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white">
            2026 政府放寬新制
          </span>
        </div>

        <ul className="space-y-4">
          {newPolicyItems.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <li
                key={index}
                className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <p className="text-text-dark">{item.text}</p>
                  <p className="mt-1 text-sm font-bold text-brand">
                    {item.highlight}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
