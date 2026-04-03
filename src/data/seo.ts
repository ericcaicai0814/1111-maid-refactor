import type { PageSEO } from './types';

export type PageKey = 'home' | 'domestic-helper' | 'faq' | 'form';

const CANONICAL_BASE =
  'https://campaign.1111.com.tw/foreign-domestic-helper-under-12';

const DEFAULT_DESCRIPTION =
  '分擔育兒壓力，為孩子找個好玩伴！專門針對12歲以下孩童家庭，提供精選外籍幫傭申請服務。嚴格篩選具備照護經驗的人選，簡化繁瑣流程，讓家長輕鬆申請，給予孩子最溫暖的陪伴。';

const BASE_SEO = {
  ogSiteName: '1111人力銀行 活動讚',
  ogLocale: 'zh_TW',
  ogType: 'article',
  twitterCard: 'summary_large_image',
  robots:
    'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
} as const satisfies Partial<PageSEO>;

/** 建立 PageSEO，ogTitle/twitterTitle 預設等同 title，ogDescription 預設等同 description */
function makeSEO(
  fields: Omit<
    PageSEO,
    | keyof typeof BASE_SEO
    | 'ogDescription'
    | 'ogTitle'
    | 'twitterTitle'
  > & {
    ogDescription?: string;
    ogTitle?: string;
    twitterTitle?: string;
  },
): PageSEO {
  return {
    ...BASE_SEO,
    ogDescription: fields.description,
    ogTitle: fields.title,
    twitterTitle: fields.title,
    ...fields,
  };
}

/** 首頁 SEO */
export const homeSEO: PageSEO = makeSEO({
  title:
    '育兒好幫手：12歲以下請(外勞)外傭申請指南｜給家長最安心支援 - 1111人力銀行',
  description: DEFAULT_DESCRIPTION,
  canonical: `${CANONICAL_BASE}/`,
  ogUrl: `${CANONICAL_BASE}/`,
  ogImage: '', // TODO: 需產生 og:image
});

/** 幫傭專案頁 SEO */
export const domesticHelperSEO: PageSEO = makeSEO({
  title:
    '1111幫傭專案｜2026政府新制放寬：12歲以下家庭即可申請外籍幫傭 - 1111人力銀行',
  description:
    '【1111人力銀行官方推薦】配合2026政府外傭申請新制，只要家中有1名未滿12歲兒童即可申請！提供專業菲傭介紹、透明薪資試算、申請條件總整理，專業代辦流程讓您省時省力，減輕育兒負擔，給家人最安心的照護支援。',
  canonical: `${CANONICAL_BASE}/domestic-helper/`,
  ogUrl: `${CANONICAL_BASE}/domestic-helper/`,
  ogImage:
    'https://campaign.1111.com.tw/wp-content/uploads/2026/04/家庭幫傭做菜-1024x683.png',
});

/** FAQ 頁 SEO */
export const faqSEO: PageSEO = makeSEO({
  title: '12歲以下外傭申請問答 - 1111人力銀行',
  description: DEFAULT_DESCRIPTION,
  canonical: `${CANONICAL_BASE}/faq/`,
  ogUrl: `${CANONICAL_BASE}/faq/`,
  ogImage: '', // TODO: 需產生 og:image
});

/** 表單頁 SEO */
export const formSEO: PageSEO = makeSEO({
  title: '12歲以下外傭申請諮詢表單 - 1111人力銀行',
  description: DEFAULT_DESCRIPTION,
  canonical: `${CANONICAL_BASE}/foreign-domestic-form/`,
  ogUrl: `${CANONICAL_BASE}/foreign-domestic-form/`,
  ogImage: '', // TODO: 需產生 og:image
});

/** 所有頁面 SEO 映射 */
export const pageSEOMap: Record<PageKey, PageSEO> = {
  home: homeSEO,
  'domestic-helper': domesticHelperSEO,
  faq: faqSEO,
  form: formSEO,
};
