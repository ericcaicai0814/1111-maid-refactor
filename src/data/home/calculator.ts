/** 計算器項目 */
export interface CalculatorItem {
  id: string;
  label: string;
  weight: number;
  category: 'child' | 'extra';
  min: number;
}

/** 計算結果 */
export interface CalculationResult {
  totalPoints: number;
  eligible: boolean;
  stabilizationFee: number | null;
  message: string;
  severity: 'success' | 'warning' | 'error';
}

/** 小朋友相關項目 */
export const childItems: CalculatorItem[] = [
  {
    id: 'child-6-to-12',
    label: '滿 6 歲，未滿 12 歲',
    weight: 4,
    category: 'child',
    min: 0,
  },
  {
    id: 'child-under-6',
    label: '未滿 6 歲',
    weight: 6,
    category: 'child',
    min: 0,
  },
  {
    id: 'child-special',
    label: '未滿 6 歲遲緩/12 歲以下身障/罕病/特境',
    weight: 10,
    category: 'child',
    min: 0,
  },
];

/** 其他加分項目 */
export const extraItems: CalculatorItem[] = [
  {
    id: 'single-parent',
    label: '單親/無親/父母一方身障',
    weight: 3,
    category: 'extra',
    min: 0,
  },
  {
    id: 'elder-75-80',
    label: '長者滿 75，未滿 80 歲',
    weight: 1,
    category: 'extra',
    min: 0,
  },
  {
    id: 'elder-80-plus',
    label: '長者滿 80 歲以上',
    weight: 2,
    category: 'extra',
    min: 0,
  },
];

/** 預先計算的常數（避免每次呼叫都分配新陣列） */
const allItems: CalculatorItem[] = [...childItems, ...extraItems];
/**
 * 計算申請資格與就業安定費
 *
 * 商業規則（3 層判定）：
 * 1. 基礎門檻：至少一項 child-item 的數量 > 0
 * 2. 特境（single-parent > 0）或總分 ≥ 10 → 安定費 $2,000
 * 3. 總分 ≥ 4 → 安定費 $5,000
 * 4. 有小朋友但總分 < 4 → 不符合
 */
export function calculateEligibility(
  values: Map<string, number>,
): CalculationResult {
  // 檢查基礎門檻
  const hasChild = childItems.some(
    (item) => (values.get(item.id) ?? 0) > 0,
  );

  if (!hasChild) {
    return {
      totalPoints: 0,
      eligible: false,
      stabilizationFee: null,
      message: '不符合申請資格 (需至少符合一項小朋友現狀)',
      severity: 'error',
    };
  }

  // 計算總分
  let totalPoints = 0;
  for (const item of allItems) {
    const val = values.get(item.id) ?? 0;
    if (val > 0) {
      totalPoints += val * item.weight;
    }
  }

  // 檢查特境
  const isSpecialCase = (values.get('single-parent') ?? 0) > 0;

  if (isSpecialCase || totalPoints >= 10) {
    return {
      totalPoints,
      eligible: true,
      stabilizationFee: 2000,
      message: '就業安定費：$2,000',
      severity: 'success',
    };
  }

  if (totalPoints >= 4) {
    return {
      totalPoints,
      eligible: true,
      stabilizationFee: 5000,
      message: '就業安定費：$5,000',
      severity: 'warning',
    };
  }

  return {
    totalPoints,
    eligible: false,
    stabilizationFee: null,
    message: '不符合申請資格',
    severity: 'error',
  };
}
