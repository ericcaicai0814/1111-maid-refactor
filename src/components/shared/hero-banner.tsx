import Image from 'next/image';

const quickLinks = [
  { label: '申請資格', href: '#policy' },
  { label: '資格試算', href: '#calculator' },
  { label: '費用表', href: '#cost' },
  { label: '申請流程', href: '#process' },
  { label: '申請文件', href: '#documents' },
  { label: '常見問題', href: '#faq' },
];

export function HeroBanner() {
  return (
    <section className="relative bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
          2026政府放寬新制！家有12歲以下如何申請(外勞)外籍幫傭？
        </h1>

        <div className="mt-6">
          <Image
            src="/images/250326_家庭幫傭.jpg"
            alt="家庭幫傭申請"
            width={1100}
            height={305}
            className="w-full rounded-lg"
            priority
          />
        </div>

        <nav className="mt-6" aria-label="快速連結">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-accent">
            快速連結
          </p>
          <ul className="flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-sm transition-colors hover:bg-white/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
