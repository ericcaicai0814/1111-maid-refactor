import Image from 'next/image';
import Link from 'next/link';
import { publicPaths } from '@/lib/paths';

const quickLinks = [
  { label: '國人家庭幫傭申請資格總整理', href: '#policy' },
  { label: '外籍家庭幫傭申請流程圖', href: '#process' },
  { label: '申請文件', href: '#documents' },
  { label: '申請問答', href: '#faq' },
];

export function HeroBanner() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold leading-tight text-brand-dark md:text-3xl lg:text-4xl">
          2026政府放寬新制！家有12歲以下如何申請(外勞)外籍幫傭？
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

        {/* 快速連結卡片 */}
        <nav
          className="mt-6 overflow-hidden rounded-xl border border-[#eae8fa]"
          aria-label="快速連結"
        >
          <div className="bg-[var(--primary-light)] px-4 py-2">
            <h5 className="text-sm font-semibold text-brand-dark">快速連結</h5>
          </div>
          <div className="px-5 py-3">
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand underline underline-offset-2 hover:text-brand-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
}
