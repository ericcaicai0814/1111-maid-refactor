import Image from 'next/image';
import { whyPhilippinesSectionData } from '@/data/domestic-helper';

export function WhyPhilippinesSection() {
  const { title, subtitle, features } = whyPhilippinesSectionData;

  return (
    <section id="why-philippines" className="py-6 md:py-[26px]">
      <div className="mx-auto max-w-[1100px] px-4 md:px-5">
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-semibold text-brand-dark">
            {title}
          </h2>
          <p className="mt-3 text-lg text-brand">{subtitle}</p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col rounded-2xl bg-white p-5"
              style={{ boxShadow: 'rgba(131, 124, 207, 0.18) 0px 4px 20px 0px', gap: '12px' }}
            >
              <div>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={200}
                  height={200}
                  className="mx-auto size-40 rounded-full object-cover"
                />
              </div>
              <h3 className="text-[16.5px] font-bold text-brand">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-mid">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
