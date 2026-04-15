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

        {/* Desktop: horizontal zigzag — Mobile: vertical stack */}
        <div className="mt-10 hidden md:block">
          <div className="relative">
            {/* 中心水平連接線 */}
            <div
              className="absolute left-0 right-0"
              style={{ top: '50%', height: '2px', background: 'var(--primary-light)', transform: 'translateY(-50%)' }}
            />

            <div className="relative flex items-center justify-between">
              {applicationSteps.map((step, index) => {
                const isAbove = index % 2 === 0;
                return (
                  <div
                    key={step.step}
                    className="group relative flex flex-col items-center"
                    style={{ width: `${100 / applicationSteps.length}%` }}
                  >
                    {/* Card above the line */}
                    {isAbove && (
                      <div
                        className="mb-3 w-full max-w-[140px] rounded-2xl bg-white p-3 text-center shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                      >
                        <p className="text-xs font-semibold text-text-dark leading-snug">
                          {step.title}
                        </p>
                        {step.emphasis && (
                          <span className="mt-1 inline-block rounded bg-brand-light px-1.5 py-0.5 text-[10px] font-semibold text-brand-dark">
                            {step.emphasis}
                          </span>
                        )}
                        <p className="mt-1 text-[10px] text-text-mid whitespace-pre-line leading-tight">
                          {step.description}
                        </p>
                      </div>
                    )}

                    {/* Spacer for cards below the line */}
                    {!isAbove && (
                      <div
                        className="mb-3 w-full max-w-[140px]"
                        style={{ visibility: 'hidden', minHeight: '80px' }}
                      />
                    )}

                    {/* Step badge (sits on the line) */}
                    <div
                      className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--primary), var(--primary-dark, #5b21b6))',
                      }}
                    >
                      {step.step}
                    </div>

                    {/* Card below the line */}
                    {!isAbove && (
                      <div
                        className="mt-3 w-full max-w-[140px] rounded-2xl bg-white p-3 text-center shadow-md transition-all duration-300 group-hover:translate-y-1 group-hover:shadow-lg"
                      >
                        <p className="text-xs font-semibold text-text-dark leading-snug">
                          {step.title}
                        </p>
                        {step.emphasis && (
                          <span className="mt-1 inline-block rounded bg-brand-light px-1.5 py-0.5 text-[10px] font-semibold text-brand-dark">
                            {step.emphasis}
                          </span>
                        )}
                        <p className="mt-1 text-[10px] text-text-mid whitespace-pre-line leading-tight">
                          {step.description}
                        </p>
                      </div>
                    )}

                    {/* Spacer for above cards (below-line side) */}
                    {isAbove && (
                      <div
                        className="mt-3 w-full max-w-[140px]"
                        style={{ visibility: 'hidden', minHeight: '80px' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="mt-10 space-y-0 md:hidden">
          {applicationSteps.map((step, index) => (
            <div key={step.step} className="relative flex gap-4">
              {/* 連接線 */}
              {index < applicationSteps.length - 1 && (
                <div className="absolute left-5 top-12 h-full w-0.5 bg-brand-light" />
              )}

              {/* 步驟圓圈 */}
              <div
                className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary), var(--primary-dark, #5b21b6))',
                }}
              >
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
