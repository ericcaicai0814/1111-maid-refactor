import Link from 'next/link';
import { publicPaths } from '@/lib/paths';

const contactPhones = [
  { region: '苗栗以北', number: '02-8787-1111', href: 'tel:0287871111' },
  { region: '中部地區', number: '04-2203-1111', href: 'tel:0422031111' },
  { region: '南部地區', number: '07-958-1111', href: 'tel:079581111' },
];

const quickLinks = [
  { label: '幫傭專案', href: publicPaths.domesticHelper },
  { label: '申請資格', href: publicPaths.home },
  { label: '報名表單', href: publicPaths.form },
  { label: '常見問題', href: publicPaths.faq },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3d378e] text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* 品牌 + 服務時間 */}
          <div>
            <h3 className="text-lg font-bold text-white">1111菲傭專區</h3>
            <p className="mt-2 text-sm leading-relaxed">
              外籍家庭幫傭專業媒合平台，提供合法、安心、專業的外籍幫傭引進服務。
            </p>
            <div className="mt-4 text-sm">
              <p className="font-medium text-[#837ccf]">服務時間</p>
              <p className="mt-1">週一至週五 8:30~21:00</p>
              <p>週六日國定假日 9:00~21:00</p>
            </div>
          </div>

          {/* 聯絡我們 */}
          <div>
            <h4 className="font-semibold text-white">聯絡我們</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {contactPhones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="transition-colors hover:text-[#837ccf]"
                  >
                    {phone.region} {phone.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 快速連結 */}
          <div>
            <h4 className="font-semibold text-white">快速連結</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#837ccf]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          <p>© {year} 1111菲傭專區</p>
          <p className="mt-1">
            本平台提供之資訊僅供參考，實際費用及流程依主管機關公告及仲介公司為準。
          </p>
        </div>
      </div>
    </footer>
  );
}
