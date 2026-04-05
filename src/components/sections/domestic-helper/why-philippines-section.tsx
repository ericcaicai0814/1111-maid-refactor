import Image from 'next/image';
import { whyPhilippinesSectionData } from '@/data/domestic-helper';

export function WhyPhilippinesSection() {
  const { title, subtitle, features } = whyPhilippinesSectionData;

  return (
    <section id="why-philippines" className="bg-brand-bg py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-text-mid">{subtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md"
            >
              <div className="mb-4">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={200}
                  height={200}
                  className="mx-auto size-40 rounded-full object-cover"
                />
              </div>
              <h3 className="mb-2 font-bold text-brand-dark">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-mid">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
