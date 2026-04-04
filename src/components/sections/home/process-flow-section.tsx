import { applicationSteps } from '@/data/home/process';

export function ProcessFlowSection() {
  return (
    <section id="process" className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center text-2xl font-bold text-brand-dark md:text-3xl">
          外籍家庭幫傭申請流程圖
        </h2>
        <p className="mt-3 text-center text-text-mid">
          請依序完成以下六個步驟，確保申請順利進行
        </p>

        <div className="mt-10 space-y-0">
          {applicationSteps.map((step, index) => (
            <div key={step.step} className="relative flex gap-4">
              {/* 連接線 */}
              {index < applicationSteps.length - 1 && (
                <div className="absolute left-5 top-12 h-full w-0.5 bg-brand-light" />
              )}

              {/* 步驟圓圈 */}
              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {step.step}
              </div>

              {/* 內容 */}
              <div className="pb-8">
                <h3 className="font-semibold text-text-dark">{step.title}</h3>
                <p className="mt-1 text-sm text-text-mid whitespace-pre-line">
                  {step.description}
                </p>
                {step.emphasis && (
                  <span className="mt-2 inline-block rounded bg-brand-light px-2 py-0.5 text-xs font-semibold text-brand-dark">
                    {step.emphasis}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
