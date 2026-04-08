import Image from 'next/image';
import { allianceSectionData } from '@/data/domestic-helper';

export function AllianceSection() {
  const { title, description, features } = allianceSectionData;

  return (
    <section id="alliance" className="py-6 md:py-[26px]">
      <div className="mx-auto max-w-[1100px] px-4 md:px-5">
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-semibold text-brand-dark">
            {title}
          </h2>
          <p className="mt-3 text-lg text-brand">{description}</p>
        </div>

        <div className="grid items-start gap-5 md:grid-cols-2">
          {/* 左側大圖 */}
          <div
            className="overflow-hidden rounded-2xl"
            style={{ boxShadow: 'rgba(131, 124, 207, 0.18) 0px 4px 20px 0px' }}
          >
            <Image
              src="/images/domestic-helper/alliance-hero.png"
              alt="跨海嚴選菲律賓幫傭"
              width={600}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* 右側 3 個特色 */}
          <ul className="space-y-5">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="flex gap-5 rounded-2xl bg-white p-5"
                style={{ boxShadow: 'rgba(131, 124, 207, 0.18) 0px 4px 20px 0px' }}
              >
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
                  <h3 className="mb-1 text-[16.5px] font-bold text-brand-dark">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-mid">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
