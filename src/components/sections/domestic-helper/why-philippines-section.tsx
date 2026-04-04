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

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md sm:flex-row"
            >
              <div className="shrink-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={200}
                  height={200}
                  className="h-48 w-full object-cover sm:h-full sm:w-40"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-brand-dark">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-mid">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
