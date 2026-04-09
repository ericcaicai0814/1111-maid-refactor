import { describe, it, expect } from 'vitest';
import { calculateEligibility, childItems, extraItems } from '../calculator';

function makeValues(entries: Record<string, number>): Map<string, number> {
  return new Map(Object.entries(entries));
}

describe('calculateEligibility', () => {
  describe('基礎門檻：至少一項 child-item > 0', () => {
    it('空值 → 不符合', () => {
      const result = calculateEligibility(new Map());
      expect(result.eligible).toBe(false);
      expect(result.totalPoints).toBe(0);
      expect(result.severity).toBe('error');
    });

    it('只有 extra-item → 不符合', () => {
      const result = calculateEligibility(makeValues({ 'single-parent': 1 }));
      expect(result.eligible).toBe(false);
      expect(result.totalPoints).toBe(0);
    });
  });

  describe('標準費率：總分 ≥ 4 → 安定費 $5,000', () => {
    it('1 名 6-12 歲 (6分) → $5,000', () => {
      const result = calculateEligibility(makeValues({ 'child-6-to-12': 1 }));
      expect(result.eligible).toBe(true);
      expect(result.totalPoints).toBe(6);
      expect(result.stabilizationFee).toBe(5000);
      expect(result.severity).toBe('warning');
    });

    it('1 名未滿 6 歲 (10分) → $2,000（總分 ≥ 10）', () => {
      const result = calculateEligibility(makeValues({ 'child-under-6': 1 }));
      expect(result.eligible).toBe(true);
      expect(result.totalPoints).toBe(10);
      expect(result.stabilizationFee).toBe(2000);
    });
  });

  describe('特境減免：特境或總分 ≥ 10 → 安定費 $2,000', () => {
    it('1 名特殊兒童 (4分) → $5,000', () => {
      const result = calculateEligibility(makeValues({ 'child-special': 1 }));
      expect(result.eligible).toBe(true);
      expect(result.totalPoints).toBe(4);
      expect(result.stabilizationFee).toBe(5000);
      expect(result.severity).toBe('warning');
    });

    it('單親 + 1 名 6-12 歲 → $2,000（特境優先，single-parent weight=1）', () => {
      const result = calculateEligibility(
        makeValues({ 'child-6-to-12': 1, 'single-parent': 1 }),
      );
      expect(result.eligible).toBe(true);
      expect(result.totalPoints).toBe(7); // 6 + 1
      expect(result.stabilizationFee).toBe(2000);
      expect(result.severity).toBe('success');
    });

    it('2 名未滿 6 歲 (20分) → $2,000（總分 ≥ 10）', () => {
      const result = calculateEligibility(makeValues({ 'child-under-6': 2 }));
      expect(result.eligible).toBe(true);
      expect(result.totalPoints).toBe(20);
      expect(result.stabilizationFee).toBe(2000);
    });
  });

  describe('邊界情況', () => {
    it('多項目複合計分', () => {
      const result = calculateEligibility(
        makeValues({
          'child-6-to-12': 2,
          'child-under-6': 1,
          'elder-80-plus': 1,
        }),
      );
      // 2*6 + 1*10 + 1*3 = 25
      expect(result.totalPoints).toBe(25);
      expect(result.stabilizationFee).toBe(2000);
    });

    it('所有項目都設定值', () => {
      const result = calculateEligibility(
        makeValues({
          'child-6-to-12': 1,
          'child-under-6': 1,
          'child-special': 1,
          'single-parent': 1,
          'elder-75-80': 1,
          'elder-80-plus': 1,
        }),
      );
      // 6 + 10 + 4 + 1 + 2 + 3 = 26
      expect(result.totalPoints).toBe(26);
      expect(result.stabilizationFee).toBe(2000);
    });
  });

  describe('資料完整性', () => {
    it('childItems 有 3 項', () => {
      expect(childItems).toHaveLength(3);
    });

    it('extraItems 有 3 項', () => {
      expect(extraItems).toHaveLength(3);
    });

    it('每項都有必要欄位', () => {
      for (const item of [...childItems, ...extraItems]) {
        expect(item.id).toBeTruthy();
        expect(item.label).toBeTruthy();
        expect(item.weight).toBeGreaterThan(0);
        expect(item.category).toMatch(/^(child|extra)$/);
      }
    });
  });
});
