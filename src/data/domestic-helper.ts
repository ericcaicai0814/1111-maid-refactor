import type { CTAButton, ResponsiveImage } from './types';
import { publicPaths } from '@/lib/paths';

/** 特色項目（Alliance 與 WhyPhilippines 共用） */
export interface FeatureItem {
  title: string;
  description: string;
  image: string;
}

/** Hero 區塊資料 */
export interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
  image: ResponsiveImage;
}

/** Alliance Section 資料 */
export interface AllianceSectionData {
  title: string;
  description: string;
  features: FeatureItem[];
}

/** Why Philippines Section 資料 */
export interface WhyPhilippinesSectionData {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

/** Quote CTA 資料 */
export interface QuoteCTAData {
  quote: string;
  cta: CTAButton;
}

// ── Logo 資料 ──

export const domesticHelperLogos: {
  readonly primary: ResponsiveImage;
  readonly secondary: Pick<ResponsiveImage, 'src' | 'alt'>;
} = {
  primary: {
    src: '/images/1111LOGO.png',
    alt: '1111人力銀行',
    width: 1424,
    height: 380,
    srcSet: '/images/1111LOGO-1024x273.png 1024w, /images/1111LOGO-300x80.png 300w, /images/1111LOGO-768x205.png 768w, /images/1111LOGO.png 1424w',
  },
  secondary: {
    src: '/images/domestic-helper/1111logo_number.svg',
    alt: '1111',
  },
};

// ── 靜態資料 ──

export const heroData: HeroData = {
  eyebrow: '給孩子一個英語環境的',
  title: '育兒神隊友',
  description:
    '2026政府新制放寬！只要1名12歲以下子女即可申請。嚴選菲律賓頂尖人才，具英語優勢與醫護背景，給孩子最安心的成長陪伴。',
  highlight: '只要1名12歲以下子女',
  primaryCTA: {
    label: '查看申請資格',
    href: publicPaths.home,
    variant: 'secondary',
  },
  secondaryCTA: {
    label: '立即報名',
    href: publicPaths.form,
    variant: 'primary',
  },
  image: {
    src: '/images/domestic-helper/家庭幫傭做菜.png',
    alt: '菲律賓幫傭在廚房烹飪',
    width: 1536,
    height: 1024,
    srcSet:
      '/images/domestic-helper/家庭幫傭做菜-1024x683.png 1024w, /images/domestic-helper/家庭幫傭做菜-300x200.png 300w, /images/domestic-helper/家庭幫傭做菜-768x512.png 768w, /images/domestic-helper/家庭幫傭做菜.png 1536w',
  },
};

export const allianceSectionData: AllianceSectionData = {
  title: '跨海嚴選：與菲律賓頂尖仲介戰略結盟',
  description:
    '1111 幫傭專案，為您從源頭把關。我們直接對接菲律賓政府認證之優質大型仲介，確保人才素質與來源合法清白。',
  features: [
    {
      title: '菲律賓官方認證仲介',
      description:
        '直接對接菲律賓政府認證之大型仲介，確保人才來源合法清白，絕無非法層層轉介之疑慮，讓雇主聘僱更安心。',
      image: '/images/domestic-helper/官方認證.png',
    },
    {
      title: '雙重安全審核',
      description:
        '嚴格要求每一位幫傭具備「無犯罪紀錄證明（良民證）」並通過高標準健檢，堅守您家庭的安全與健康底線。',
      image: '/images/domestic-helper/雙重審核.png',
    },
    {
      title: '1111 實地考察把關',
      description:
        '專案團隊親赴菲律賓實地考察培訓設施，確保每一位來台人才皆經過標準化「育兒與家事」實作考核，具備實質工作能力。',
      image: '/images/domestic-helper/1111實地.png',
    },
  ],
};

export const whyPhilippinesSectionData: WhyPhilippinesSectionData = {
  title: '為什麼選擇菲律賓幫傭？打造高品質育兒生活',
  subtitle:
    '英語系國家背景，結合高度專業素養，給孩子最自然的語言啟蒙與細心照顧。',
  features: [
    {
      title: '全天候英語啟蒙環境',
      description:
        '菲律賓為英語系國家，幫傭具備流利口說能力。在日常陪伴中，為孩子營造最自然的英語互動空間，讓語言學習融入生活點滴。',
      image: '/images/domestic-helper/全天英文2.png',
    },
    {
      title: '高比例醫護教保資歷',
      description:
        '許多菲籍人才擁有護理或教保相關學歷，具備紮實的育兒知識。對於 12 歲以下孩童的照護與習慣養成，更加專業細心。',
      image: '/images/domestic-helper/家庭幫傭_顧小孩.png',
    },
    {
      title: '溝通高效 品質感一致',
      description:
        '菲籍人才普遍受過良好教育，理解力高、溝通效率快。能精準執行家長對居家環境、烹飪健康與作息管理的標準要求。',
      image: '/images/domestic-helper/家庭幫傭_老人對話.png',
    },
    {
      title: '熱情耐心 融入家庭',
      description:
        '菲律賓文化極度重視家庭，天生具備高度親和力與耐心。在長期陪伴中，能溫暖融入家庭，成為孩子信賴的成長夥伴。',
      image: '/images/domestic-helper/融入家庭2.png',
    },
  ],
};

export const quoteCTAData: QuoteCTAData = {
  quote:
    '讓家務回歸專業，讓陪伴回歸高品質。1111 幫傭專案，為您引進最懂家庭需求的菲籍人才。',
  cta: {
    label: '點我立即報名',
    href: publicPaths.form,
    variant: 'primary',
  },
};
