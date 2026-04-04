import Image from 'next/image';
import Link from 'next/link';
import { heroData, domesticHelperLogos } from '@/data/domestic-helper';

export function HeroSection() {
  const { eyebrow, title, description, highlight, primaryCTA, secondaryCTA, image } = heroData;

  const descriptionParts = description.split(highlight);

  return (
    <section className="bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div className="text-center md:text-left">
            <div className="mb-4 flex items-center gap-3 max-md:justify-center">
              <Image
                src={domesticHelperLogos.secondary.src}
                alt={domesticHelperLogos.secondary.alt}
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold md:text-3xl">幫傭專案</span>
            </div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-brand-light opacity-80">
              {eyebrow}
            </p>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              {title}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/80">
              {descriptionParts[0]}
              <span className="font-bold text-brand-accent">{highlight}</span>
              {descriptionParts[1]}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:items-start">
              <Link
                href={primaryCTA.href}
                className="rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-brand-dark"
              >
                {primaryCTA.label}
              </Link>
              <Link
                href={secondaryCTA.href}
                className="rounded-full bg-brand-accent px-6 py-3 font-semibold text-brand-dark transition hover:opacity-90"
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
