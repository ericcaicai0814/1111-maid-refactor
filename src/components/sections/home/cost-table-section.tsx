import {
  employerMonthlyCost,
  maidSelfPayItems,
  remarksItems,
} from '@/data/home/tables';

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('zh-TW')}元`;
}

export function CostTableSection() {
  const cost = employerMonthlyCost;

  return (
    <section id="costs-guide" className="scroll-mt-32">
      <div className="mx-auto max-w-5xl px-4">
        {/* 區塊標題 — 淡紫 hero pill */}
        <div className="mb-7 rounded-2xl bg-[#ecebf7] px-6 py-4 text-center">
          <h2 className="text-[1.55rem] font-semibold tracking-[-0.02em] text-[#3d378e] md:text-[1.8rem]">
            外籍家庭幫傭月薪薪資及費用
          </h2>
          <p className="mt-2 text-sm text-[#6d66a0] md:text-base">
            雇主每月負擔、加班費與總薪資一次看清楚。
          </p>
        </div>

        <div className="space-y-8">
          {/* ── 雇主需支付(每月) ── */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#1e293b]">
              雇主需支付(每月)
            </h3>

            {/* Mobile: divide-y 卡片 */}
            <div className="rounded-2xl border border-[#d8d3f0] bg-white shadow-[0_10px_30px_rgba(61,55,142,0.08)] md:hidden">
              <div className="divide-y divide-[#ece8fb]">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-[#3d378e]">基本薪資</span>
                  <span className="text-sm text-[#3c4160]">
                    {formatCurrency(cost.baseSalary)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-[#3d378e]">健保費</span>
                  <span className="text-sm text-[#3c4160]">
                    {formatCurrency(cost.healthInsurance)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-[#3d378e]">職災保費</span>
                  <span className="text-sm text-[#3c4160]">
                    {formatCurrency(cost.occupationalInsurance)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-[#3d378e]">就業安定費</span>
                  <span className="text-sm text-[#3c4160]">
                    {formatCurrency(cost.employmentStabilizationFee)}元或(
                    <span className="font-bold text-red-600">$2,000元</span>)
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-[#3d378e]">基本負擔</span>
                  <span className="text-sm font-semibold text-[#3c4160]">
                    {formatCurrency(cost.basicBurden)}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <div className="text-sm font-medium text-[#3d378e]">加班費 (4天 或 5天)</div>
                  <div className="mt-1.5 space-y-1">
                    <div className="flex justify-between text-sm text-[#3c4160]">
                      <span>4天</span>
                      <span>{formatCurrency(cost.overtime.fourDays)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#3c4160]">
                      <span>5天</span>
                      <span>{formatCurrency(cost.overtime.fiveDays)}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-sm font-medium text-[#3d378e]">總薪資 (4天 或 5天)</div>
                  <div className="mt-1.5 space-y-1">
                    <div className="flex justify-between text-sm font-semibold text-[#3c4160]">
                      <span>4天</span>
                      <span>{formatCurrency(cost.totalSalary.fourDays)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#3c4160]">
                      <span>5天</span>
                      <span>{formatCurrency(cost.totalSalary.fiveDays)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: styled table */}
            <div className="hidden overflow-x-auto rounded-2xl border border-[#d8d3f0] bg-white shadow-[0_10px_30px_rgba(61,55,142,0.08)] md:block">
              <table className="w-full border-separate border-spacing-0 text-left text-sm text-[#3c4160]">
                <thead>
                  <tr className="bg-[#3d378e] text-white">
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold last:border-r-0">基本薪資</th>
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold last:border-r-0">健保費</th>
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold last:border-r-0">職災保費</th>
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold last:border-r-0">就業安定費</th>
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold last:border-r-0">基本負擔</th>
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold last:border-r-0">加班費 (4天 或 5天)</th>
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold last:border-r-0">總薪資 (4天 或 5天)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-t border-r border-[#ece8fb] px-4 py-4">
                      {formatCurrency(cost.baseSalary)}
                    </td>
                    <td className="border-t border-r border-[#ece8fb] px-4 py-4">
                      {formatCurrency(cost.healthInsurance)}
                    </td>
                    <td className="border-t border-r border-[#ece8fb] px-4 py-4">
                      {formatCurrency(cost.occupationalInsurance)}
                    </td>
                    <td className="border-t border-r border-[#ece8fb] px-4 py-4">
                      {formatCurrency(cost.employmentStabilizationFee)}元或(
                      <span className="font-bold text-red-600">$2,000元</span>)
                    </td>
                    <td className="border-t border-r border-[#ece8fb] px-4 py-4">
                      {formatCurrency(cost.basicBurden)}
                    </td>
                    <td className="border-t border-r border-[#ece8fb] px-4 py-4">
                      <div>4天：{formatCurrency(cost.overtime.fourDays)}</div>
                      <div>5天：{formatCurrency(cost.overtime.fiveDays)}</div>
                    </td>
                    <td className="border-t border-[#ece8fb] px-4 py-4">
                      <div>4天：{formatCurrency(cost.totalSalary.fourDays)}</div>
                      <div>5天：{formatCurrency(cost.totalSalary.fiveDays)}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#6d66a0]">
              ※115年1月1日起因基本工資與勞保費率調整，勞健保負擔級距也會有所調整。
              ※正確費用級距請以政府單位公佈為之
            </p>
          </div>

          {/* ── 外籍幫傭自付額 ── */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#1e293b]">
              外籍幫傭自付額
            </h3>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {maidSelfPayItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#d8d3f0] bg-white p-4 shadow-[0_4px_12px_rgba(61,55,142,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-medium text-[#3d378e]">{item.item}</span>
                    <span className="shrink-0 text-sm font-semibold text-[#3c4160]">
                      {item.cost}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#6d66a0]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto rounded-2xl border border-[#d8d3f0] bg-white shadow-[0_10px_30px_rgba(61,55,142,0.08)] md:block">
              <table className="w-full border-separate border-spacing-0 text-left text-sm text-[#3c4160]">
                <thead>
                  <tr className="bg-[#3d378e] text-white">
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold">項目</th>
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold">費用</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">說明文字</th>
                  </tr>
                </thead>
                <tbody>
                  {maidSelfPayItems.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="border-t border-r border-[#ece8fb] px-4 py-4 font-medium">
                        {item.item}
                      </td>
                      <td className="border-t border-r border-[#ece8fb] px-4 py-4">
                        {item.cost}
                      </td>
                      <td className="border-t border-[#ece8fb] px-4 py-4 text-[#6d66a0]">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#6d66a0]">
              ※ 正確費用級距請以政府單位公佈為主。
            </p>
          </div>

          {/* ── 備註事項 ── */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#1e293b]">
              備註事項
            </h3>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {remarksItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#d8d3f0] bg-white p-4 shadow-[0_4px_12px_rgba(61,55,142,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-medium text-[#3d378e]">{item.item}</span>
                    <span className="shrink-0 text-sm font-semibold text-[#3c4160]">
                      {item.amount}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#6d66a0]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto rounded-2xl border border-[#d8d3f0] bg-white shadow-[0_10px_30px_rgba(61,55,142,0.08)] md:block">
              <table className="w-full border-separate border-spacing-0 text-left text-sm text-[#3c4160]">
                <thead>
                  <tr className="bg-[#3d378e] text-white">
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold">項目</th>
                    <th className="whitespace-nowrap border-r border-[#665ec0] px-4 py-3 font-semibold">金額 / 標準</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">詳細說明</th>
                  </tr>
                </thead>
                <tbody>
                  {remarksItems.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="border-t border-r border-[#ece8fb] px-4 py-4 font-medium">
                        {item.item}
                      </td>
                      <td className="border-t border-r border-[#ece8fb] px-4 py-4">
                        {item.amount}
                      </td>
                      <td className="border-t border-[#ece8fb] px-4 py-4 text-[#6d66a0]">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
