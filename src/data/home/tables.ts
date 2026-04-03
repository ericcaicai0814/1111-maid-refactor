/** 雇主每月費用 */
export interface EmployerMonthlyCost {
  baseSalary: number;
  healthInsurance: number;
  occupationalInsurance: number;
  employmentStabilizationFee: number;
  basicBurden: number;
  overtime: { fourDays: number; fiveDays: number };
  totalSalary: { fourDays: number; fiveDays: number };
}

/** 外籍幫傭自付項目 */
export interface MaidSelfPayItem {
  item: string;
  cost: string;
  description: string;
}

/** 備註項目 */
export interface RemarksItem {
  item: string;
  amount: string;
  description: string;
}

/**
 * 雇主每月費用資料
 * 注意：原站顯示 basicBurden=$26,482、totalSalary 4天=$29,152 / 5天=$29,819
 * 與各項加總略有差異（可能含未列出的微小費用），此處以原站數據為準。
 */
export const employerMonthlyCost: EmployerMonthlyCost = (() => {
  const base = {
    baseSalary: 20000,
    healthInsurance: 1428,
    occupationalInsurance: 56,
    employmentStabilizationFee: 5000,
  } as const;
  const basicBurden = 26482; // 原站數據
  const overtime = { fourDays: 2668, fiveDays: 3335 };
  return {
    ...base,
    basicBurden,
    overtime,
    totalSalary: {
      fourDays: basicBurden + overtime.fourDays,
      fiveDays: basicBurden + overtime.fiveDays,
    },
  };
})();

/** 外籍幫傭自付額資料（8 筆） */
export const maidSelfPayItems: MaidSelfPayItem[] = [
  {
    item: '健保費',
    cost: '$458元',
    description: '115 年 1 月 1 日起因基本工資調整，負擔級距也會調整。',
  },
  {
    item: '體檢費',
    cost: '$2,000元 ~ $3,500元',
    description: '依照醫院規定收費。',
  },
  {
    item: '居留證規費',
    cost: '$3,000元',
    description: '3年期規費。',
  },
  {
    item: '服務費',
    cost: '每月 $1,500元 ~ $1,800元',
    description:
      '第一年 $1,800、第二年 $1,700、第三年 $1,500。續聘同雇主則為 $1,500。',
  },
  {
    item: '護照處理費',
    cost: '依辦事處規定',
    description:
      '含延期、換發、遺失補發。印尼約 $1,100 ~ $2,500 (依地區而異)。',
  },
  {
    item: '回程機票費',
    cost: '約 $8,700元 ~ $10,000元',
    description: '離境單程機票，依時價計算。雇主需支付三年滿期機票。',
  },
  {
    item: '重入境機票費',
    cost: '約 $14,000元 ~ $18,000元',
    description: '來回機票費用。',
  },
  {
    item: '重入境接機費',
    cost: '$800元 ~ $2,000元',
    description: '單程 $800，來回 $2,000，偏遠地方另計車資。',
  },
];

/** 備註事項資料（6 筆） */
export const remarksItems: RemarksItem[] = [
  {
    item: '基本薪資調整',
    amount: '每月 20,000元',
    description:
      '自 2022 年 8 月 10 日起，適用於新招募、承接或續（轉）聘之家庭移工。',
  },
  {
    item: '職業災害保險費',
    amount: '約 56元 / 月',
    description:
      '費率 0.19%，配合 115 年基本工資投保薪資 $29,500 計算，按季與就安費併收。',
  },
  {
    item: '服務費',
    amount: '每月 1,500元',
    description:
      '適用於受聘工作兩年以上，期滿後再入國並受聘於「同一雇主」之情況。',
  },
  {
    item: '護照費用',
    amount: '依各國辦事處規定',
    description: '包含延期、換發、遺失補發等規費。',
  },
  {
    item: '機票費用',
    amount: '雇主支付三年期滿機票',
    description: '其餘時間回國機票由移工本人負擔，費用依當時市價辦理。',
  },
  {
    item: '重入境接機費',
    amount: '依地區報價',
    description: '偏遠地區需依實際距離另計車資。',
  },
];
