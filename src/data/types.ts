// 共用型別定義 — 所有資料檔案的基礎

/** 導覽項目 */
export interface NavItem {
  label: string;
  href: string;
}

/** 響應式圖片 */
export interface ResponsiveImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcSet?: string;
}

/** CTA 按鈕 */
export interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

/** Section 標題 */
export interface SectionHeading {
  title: string;
  subtitle?: string;
}

/** FAQ 項目 */
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

/** FAQ 分組 */
export interface FAQGroup {
  id: string;
  label: string;
  items: FAQItem[];
}

/** 頁面 SEO metadata */
export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogImage: string;
  ogSiteName: string;
  ogLocale: string;
  twitterCard: string;
  twitterTitle: string;
  robots: string;
}
