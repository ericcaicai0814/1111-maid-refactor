import Link from 'next/link';
import { quoteCTAData } from '@/data/domestic-helper';

export function QuoteCTASection() {
  const { quote, cta } = quoteCTAData;

  return (
    <section className="bg-brand py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <blockquote className="mb-8 text-xl font-semibold leading-relaxed text-white md:text-2xl">
          {quote}
        </blockquote>
        <Link
          href={cta.href}
          className="inline-block rounded-full bg-brand-accent px-8 py-4 text-lg font-bold text-brand-dark transition hover:opacity-90"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
