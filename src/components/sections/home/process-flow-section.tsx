import { applicationSteps } from '@/data/home/process';

export function ProcessFlowSection() {
  return (
    <section id="process-guide" className="scroll-mt-32">
      <div className="mx-auto max-w-5xl px-4">
        {/* 區塊標題 — 淡紫 hero pill */}
        <div className="mb-7 rounded-2xl bg-[#ecebf7] px-6 py-4 text-center">
          <h2 className="text-[1.55rem] font-semibold tracking-[-0.02em] text-[#3d378e] md:text-[1.8rem]">
            外籍家庭幫傭申請流程圖
          </h2>
          <p className="mt-2 text-sm text-[#6d66a0] md:text-base">
            依序完成以下六個步驟，申請節奏會更清楚。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {applicationSteps.map((step) => (
            <article
              key={step.step}
              className="rounded-2xl border border-[#ddd8f2] bg-white p-5 shadow-[0_10px_30px_rgba(61,55,142,0.08)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#837ccf] text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold text-[#3d378e]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#5b5778] whitespace-pre-line">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
