import type { NavItem } from './types';
import { publicPaths } from '@/lib/paths';

export const navItems: NavItem[] = [
  {
    label: '幫傭專案',
    href: publicPaths.domesticHelper,
  },
  {
    label: '申請資格',
    href: publicPaths.home,
  },
  {
    label: '報名表單',
    href: publicPaths.form,
  },
  {
    label: '常見問題',
    href: publicPaths.faq,
  },
];
