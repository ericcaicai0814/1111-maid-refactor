import Image from 'next/image';
import Link from 'next/link';
import { publicPaths } from '@/lib/paths';

export function HeroBanner() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold leading-tight text-brand-dark md:text-3xl lg:text-4xl">
          2026政府放寬新制！家有12歲以下如何申請外籍幫傭？
        </h1>

        <div className="mt-6">
          <Link href={publicPaths.form} aria-label="立即申請">
            <Image
              src="/images/250326_家庭幫傭.jpg"
              alt="家庭幫傭申請"
              width={1100}
              height={305}
              className="w-full rounded-lg transition-transform duration-300 hover:scale-[1.008]"
              priority
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
