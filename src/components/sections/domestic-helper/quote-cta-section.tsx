import Link from 'next/link';
import { quoteCTAData } from '@/data/domestic-helper';

export function QuoteCTASection() {
  const { quote, cta } = quoteCTAData;

  return (
    <section className="py-6 md:py-[26px]">
      <div className="mx-auto max-w-[1100px] px-4 text-center md:px-5">
        <blockquote
          className="mb-8 text-2xl font-bold leading-[33.6px]"
          style={{
            background:
              '-webkit-linear-gradient(45deg, rgb(131,124,207), rgb(61,55,142), rgb(245,200,66))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          「{quote}」
        </blockquote>
        <Link
          href={cta.href}
          className="inline-block rounded-2xl px-5 py-2 text-xl font-semibold text-white transition hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, rgb(131,124,207), rgb(61,55,142))',
          }}
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
