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

        <div className="grid items-start gap-8 md:grid-cols-2">
          {/* 左側大圖 */}
          <div className="overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/domestic-helper/alliance-hero.png"
              alt="跨海嚴選菲律賓幫傭"
              width={600}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* 右側 3 個特色 */}
          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="shrink-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={80}
                    height={80}
                    className="size-16 rounded-lg object-contain"
                  />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-brand-dark">
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
      </div>
    </section>
  );
}
