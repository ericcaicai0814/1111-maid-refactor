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
    <section id="cost" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        {/* 標題欄 — 僅標題列有背景色 */}
        <div
          className="rounded-t-lg px-6 py-3"
          style={{ background: 'var(--primary-light)' }}
        >
          <h2 className="text-center text-2xl font-bold text-brand-dark md:text-3xl">
            外籍家庭幫傭月薪薪資及費用
          </h2>
        </div>

        {/* 雇主每月費用 */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-brand-dark">
            雇主需支付(每月)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg bg-white text-sm shadow-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="px-3 py-2 text-left">基本薪資</th>
                  <th className="px-3 py-2 text-left">健保費</th>
                  <th className="px-3 py-2 text-left">職災保費</th>
                  <th className="px-3 py-2 text-left">就業安定費</th>
                  <th className="px-3 py-2 text-left">基本負擔</th>
                  <th className="px-3 py-2 text-left">加班費 (4天 / 5天)</th>
                  <th className="px-3 py-2 text-left">總薪資 (4天 / 5天)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-t px-3 py-2">
                    {formatCurrency(cost.baseSalary)}
                  </td>
                  <td className="border-t px-3 py-2">
                    {formatCurrency(cost.healthInsurance)}
                  </td>
                  <td className="border-t px-3 py-2">
                    {formatCurrency(cost.occupationalInsurance)}
                  </td>
                  <td className="border-t px-3 py-2">
                    {formatCurrency(cost.employmentStabilizationFee)}
                  </td>
                  <td className="border-t px-3 py-2">
                    {formatCurrency(cost.basicBurden)}
                  </td>
                  <td className="border-t px-3 py-2">
                    4天：{formatCurrency(cost.overtime.fourDays)}
                    <br />
                    5天：{formatCurrency(cost.overtime.fiveDays)}
                  </td>
                  <td className="border-t px-3 py-2">
                    4天：{formatCurrency(cost.totalSalary.fourDays)}
                    <br />
                    5天：{formatCurrency(cost.totalSalary.fiveDays)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-text-light">
            ※115年1月1日起因基本工資與勞保費率調整，勞健保負擔級距也會有所調整。
            ※正確費用級距請以政府單位公佈為之
          </p>
        </div>

        {/* 外籍幫傭自付額 */}
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-brand-dark">
            外籍幫傭自付額
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg bg-white text-sm shadow-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="px-3 py-2 text-left">項目</th>
                  <th className="px-3 py-2 text-left">費用</th>
                  <th className="px-3 py-2 text-left">說明文字</th>
                </tr>
              </thead>
              <tbody>
                {maidSelfPayItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-t px-3 py-2 font-medium">
                      {item.item}
                    </td>
                    <td className="border-t px-3 py-2">{item.cost}</td>
                    <td className="border-t px-3 py-2 text-text-mid">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-text-light">
            ※ 正確費用級距請以政府單位公佈為主。
          </p>
        </div>

        {/* 備註事項 */}
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-brand-dark">
            備註事項
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg bg-white text-sm shadow-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="px-3 py-2 text-left">項目</th>
                  <th className="px-3 py-2 text-left">金額 / 標準</th>
                  <th className="px-3 py-2 text-left">詳細說明</th>
                </tr>
              </thead>
              <tbody>
                {remarksItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-t px-3 py-2 font-medium">
                      {item.item}
                    </td>
                    <td className="border-t px-3 py-2">{item.amount}</td>
                    <td className="border-t px-3 py-2 text-text-mid">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
