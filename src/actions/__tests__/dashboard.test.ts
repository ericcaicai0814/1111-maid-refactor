import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockCount = vi.fn();

vi.mock('@/lib/prisma', () => ({
  prisma: {
    application: {
      count: (...args: unknown[]) => mockCount(...args),
    },
  },
}));

import { getDashboardStats } from '../dashboard';

describe('getDashboardStats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('應回傳所有狀態的統計數據', async () => {
    // 依序回傳 PENDING, CONTACTED, PROCESSING, COMPLETED, CANCELLED
    mockCount
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(1);

    const result = await getDashboardStats();

    expect(result).toEqual({
      pending: 5,
      contacted: 3,
      processing: 2,
      completed: 10,
      cancelled: 1,
      total: 21,
    });
  });

  it('應對每個狀態呼叫 prisma.application.count', async () => {
    mockCount.mockResolvedValue(0);

    await getDashboardStats();

    expect(mockCount).toHaveBeenCalledTimes(5);
    expect(mockCount).toHaveBeenCalledWith({ where: { status: 'PENDING' } });
    expect(mockCount).toHaveBeenCalledWith({ where: { status: 'CONTACTED' } });
    expect(mockCount).toHaveBeenCalledWith({ where: { status: 'PROCESSING' } });
    expect(mockCount).toHaveBeenCalledWith({ where: { status: 'COMPLETED' } });
    expect(mockCount).toHaveBeenCalledWith({ where: { status: 'CANCELLED' } });
  });

  it('全部為 0 時 total 也應為 0', async () => {
    mockCount.mockResolvedValue(0);

    const result = await getDashboardStats();

    expect(result.total).toBe(0);
  });
});
