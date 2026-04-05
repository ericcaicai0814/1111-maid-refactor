import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Prisma
const mockCreate = vi.fn();
const mockFindMany = vi.fn();
const mockFindUnique = vi.fn();
const mockCount = vi.fn();
const mockUpdate = vi.fn();

vi.mock('@/lib/prisma', () => ({
  prisma: {
    application: {
      create: (...args: unknown[]) => mockCreate(...args),
      findMany: (...args: unknown[]) => mockFindMany(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
      count: (...args: unknown[]) => mockCount(...args),
      update: (...args: unknown[]) => mockUpdate(...args),
    },
  },
}));

import {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
} from '../application';

/** 有效的測試資料 */
const validData = {
  name: '王小明',
  title: '父' as const,
  childrenCount: 1,
  childAge: 3,
  childBirthdays: ['2023-01-15'],
  familyStatus: ['雙薪家庭'],
  address: '台北市大安區信義路三段100號',
  nationalityPreference: ['菲律賓'],
  phone: '0912345678',
  email: 'test@example.com',
  company: '台灣科技公司',
  jobTitle: '工程師',
  contactTime: ['上午 9:00-12:00'],
};

describe('submitApplication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('有效資料應回傳 success', async () => {
    mockCreate.mockResolvedValue({ id: 'test-id', ...validData });

    const result = await submitApplication(validData);

    expect(result).toEqual({ success: true });
    expect(mockCreate).toHaveBeenCalledOnce();
    expect(mockCreate).toHaveBeenCalledWith({ data: validData });
  });

  it('無效資料（缺少 name）應回傳 error', async () => {
    const invalidData = { ...validData, name: '' };

    const result = await submitApplication(invalidData);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('無效手機號碼應回傳 error', async () => {
    const invalidData = { ...validData, phone: '1234' };

    const result = await submitApplication(invalidData);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('Prisma 錯誤應回傳 error', async () => {
    mockCreate.mockRejectedValue(new Error('DB connection failed'));

    const result = await submitApplication(validData);

    expect(result.success).toBe(false);
    expect(result.error).toBe('DB connection failed');
  });
});

describe('getApplications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('預設分頁：page=1, pageSize=20', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    const result = await getApplications({});

    expect(result).toEqual({ applications: [], total: 0, totalPages: 0 });
    expect(mockFindMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: 20,
    });
  });

  it('指定分頁參數應正確計算 skip', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(50);

    const result = await getApplications({ page: 3, pageSize: 10 });

    expect(result.totalPages).toBe(5);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 20, take: 10 }),
    );
  });

  it('status 篩選應加入 where 條件', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    await getApplications({ status: 'PENDING' });

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: 'PENDING' } }),
    );
    expect(mockCount).toHaveBeenCalledWith({ where: { status: 'PENDING' } });
  });

  it('totalPages 應無條件進位', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(21);

    const result = await getApplications({ pageSize: 20 });

    expect(result.totalPages).toBe(2);
  });
});

describe('getApplicationById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('找到時回傳 Application', async () => {
    const mockApp = { id: 'test-id', name: '王小明' };
    mockFindUnique.mockResolvedValue(mockApp);

    const result = await getApplicationById('test-id');

    expect(result).toEqual(mockApp);
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 'test-id' } });
  });

  it('找不到時回傳 null', async () => {
    mockFindUnique.mockResolvedValue(null);

    const result = await getApplicationById('nonexistent');

    expect(result).toBeNull();
  });
});

describe('updateApplicationStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('有效狀態應更新成功', async () => {
    mockUpdate.mockResolvedValue({ id: 'test-id', status: 'CONTACTED' });

    const result = await updateApplicationStatus('test-id', 'CONTACTED');

    expect(result).toEqual({ success: true });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'test-id' },
      data: { status: 'CONTACTED' },
    });
  });

  it('無效狀態應回傳 error', async () => {
    const result = await updateApplicationStatus(
      'test-id',
      'INVALID' as never,
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('無效的狀態值');
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('Prisma 錯誤應回傳 error', async () => {
    mockUpdate.mockRejectedValue(new Error('Record not found'));

    const result = await updateApplicationStatus('nonexistent', 'PENDING');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Record not found');
  });
});
