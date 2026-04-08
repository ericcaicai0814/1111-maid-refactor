import Image from 'next/image';
import Link from 'next/link';
import { heroData, domesticHelperLogos } from '@/data/domestic-helper';

export function HeroSection() {
  const { eyebrow, title, description, highlight, primaryCTA, secondaryCTA, image } = heroData;

  const descriptionParts = description.split(highlight);

  return (
    <section
      className="relative"
      style={{
        background:
          'linear-gradient(rgb(177, 172, 230), rgb(236, 235, 247) 70%, rgba(255, 255, 255, 0))',
      }}
    >
      {/* 背景圖層（覆蓋在 gradient 上）+ 半透明遮罩 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/domestic-helper/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
        }}
      />
      <div className="relative mx-auto max-w-[1100px] px-4 py-8 md:px-10 md:py-12">
        <div className="grid gap-7 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <div className="mb-4 flex items-center gap-3 max-md:justify-center">
              <Image
                src={domesticHelperLogos.secondary.src}
                alt={domesticHelperLogos.secondary.alt}
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-[52px] font-extrabold text-text-dark">
                幫傭專案
              </span>
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <p className="text-2xl font-bold text-brand-dark">
                {eyebrow}
              </p>
              <div
                className="inline-block origin-center rounded-lg px-3 py-1"
                style={{
                  transform: 'rotateZ(4deg)',
                  background: 'linear-gradient(45deg, rgb(171, 135, 9), rgb(245, 200, 66))',
                }}
              >
                <h2 className="text-[31.5px] font-bold leading-[44.1px] text-white">
                  {title}
                </h2>
              </div>
            </div>
            <p className="mb-8 text-lg leading-[30.6px] text-text-dark">
              {descriptionParts[0]}
              <strong className="font-bold text-text-dark">{highlight}</strong>
              {descriptionParts[1]}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:items-start">
              <Link
                href={primaryCTA.href}
                className="rounded-2xl px-[18px] py-2 text-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: 'rgb(131, 124, 207)' }}
              >
                {primaryCTA.label}
              </Link>
              <Link
                href={secondaryCTA.href}
                className="rounded-2xl px-[18px] py-2 text-lg font-semibold text-white transition hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, rgb(131,124,207), rgb(61,55,142))',
                }}
              >
                {secondaryCTA.label}
              </Link>
            </div>
          </div>

          <div>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="rounded-2xl object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
