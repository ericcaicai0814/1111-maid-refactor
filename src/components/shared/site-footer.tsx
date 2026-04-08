import { serviceHours, servicePhones } from '@/data/contact';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-6 text-sm sm:grid-cols-2">
          {/* 服務時間 */}
          <div>
            <h3 className="mb-2 font-bold text-text-dark">服務時間</h3>
            <ul className="space-y-1 text-text-mid">
              {serviceHours.map((item) => (
                <li key={item.label}>
                  {item.label}：{item.hours}
                </li>
              ))}
            </ul>
          </div>

          {/* 服務電話 */}
          <div>
            <h3 className="mb-2 font-bold text-text-dark">服務電話</h3>
            <ul className="space-y-1 text-text-mid">
              {servicePhones.map((item) => (
                <li key={item.region}>
                  {item.region}：
                  <a
                    href={`tel:${item.number.replace(/-/g, '')}`}
                    className="text-brand hover:underline"
                  >
                    {item.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          © {year} 1111人力銀行 幫傭專案
        </p>
      </div>
    </footer>
  );
}
