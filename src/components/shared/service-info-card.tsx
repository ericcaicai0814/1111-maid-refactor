import { serviceHours, servicePhones } from '@/data/contact';

export function ServiceInfoCard() {
  return (
    <section className="mt-5">
      <div
        className="mx-auto max-w-[1060px] rounded-2xl border-2 bg-white px-[60px] py-5"
        style={{
          borderColor: 'rgb(236, 235, 247)',
          boxShadow: 'rgba(131, 124, 207, 0.45) 0px 3px 12px 0px',
        }}
      >
        {/* 免費諮詢專線 header */}
        <div className="mb-4 border-b border-gray-200 pb-4 text-center">
          <p className="text-[22px] font-bold text-brand-dark">
            免費諮詢專線{' '}
            <a
              href="tel:08003211111"
              className="text-red-600 hover:underline"
            >
              0800-32-1111
            </a>
          </p>
        </div>

        <div className="flex gap-10">
        {/* 服務時間 */}
        <div className="flex-1">
          <h3 className="mb-4 border-l-4 border-brand pl-3 text-[19.5px] font-bold text-brand-dark">
            服務時間
          </h3>
          <ul className="divide-y divide-gray-200">
            {serviceHours.map((item) => (
              <li key={item.label} className="flex items-center justify-between py-3">
                <span className="text-[16.5px] font-bold text-text-dark">{item.label}</span>
                <span className="text-[16.5px] font-bold text-red-600">
                  {item.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 服務電話 */}
        <div className="flex-1">
          <h3 className="mb-4 border-l-4 border-brand pl-3 text-[19.5px] font-bold text-brand-dark">
            服務電話
          </h3>
          <ul className="divide-y divide-gray-200">
            {servicePhones.map((item) => (
              <li key={item.region} className="flex items-center justify-between py-3">
                <span className="text-[16.5px] font-bold text-text-dark">{item.region}</span>
                <a
                  href={`tel:${item.number.replace(/-/g, '')}`}
                  className="rounded-xl bg-[rgb(124,164,207)] px-[15px] py-2 text-[15px] font-semibold text-white transition hover:opacity-90"
                >
                  {item.number}
                </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </section>
  );
}
