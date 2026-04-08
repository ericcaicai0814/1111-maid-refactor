import { serviceHours, servicePhones } from '@/data/contact';

export function ServiceInfoCard() {
  return (
    <section className="mt-5">
      <div
        className="mx-auto flex max-w-[1060px] gap-10 rounded-2xl border-2 bg-white px-[60px] py-5"
        style={{
          borderColor: 'rgb(236, 235, 247)',
          boxShadow: 'rgba(131, 124, 207, 0.18) 0px 4px 20px 0px',
        }}
      >
        {/* 服務時間 */}
        <div className="flex-1">
          <h3 className="mb-2 border-l-4 border-brand pl-3 text-[19.5px] font-bold text-brand-dark">
            服務時間
          </h3>
          <ul className="space-y-1">
            {serviceHours.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
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
          <h3 className="mb-2 border-l-4 border-brand pl-3 text-[19.5px] font-bold text-brand-dark">
            服務電話
          </h3>
          <ul className="space-y-2">
            {servicePhones.map((item) => (
              <li key={item.region} className="flex items-center gap-2">
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
    </section>
  );
}
