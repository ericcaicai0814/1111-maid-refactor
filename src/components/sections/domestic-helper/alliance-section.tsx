import Image from 'next/image';
import { allianceSectionData } from '@/data/domestic-helper';

export function AllianceSection() {
  const { title, description, features } = allianceSectionData;

  return (
    <section id="alliance" className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-text-mid">{description}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-md"
            >
              <div className="mb-4 overflow-hidden rounded-xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={260}
                  className="h-44 w-full object-cover"
                />
              </div>
              <h3 className="mb-2 text-lg font-bold text-brand-dark">
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
