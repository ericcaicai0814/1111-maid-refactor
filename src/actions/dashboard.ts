'use server';

import { prisma } from '@/lib/prisma';

/** 取得後台儀表板統計資料 */
export async function getDashboardStats(): Promise<{
  pending: number;
  contacted: number;
  processing: number;
  completed: number;
  cancelled: number;
  total: number;
}> {
  const [pending, contacted, processing, completed, cancelled] = await Promise.all([
    prisma.application.count({ where: { status: 'PENDING' } }),
    prisma.application.count({ where: { status: 'CONTACTED' } }),
    prisma.application.count({ where: { status: 'PROCESSING' } }),
    prisma.application.count({ where: { status: 'COMPLETED' } }),
    prisma.application.count({ where: { status: 'CANCELLED' } }),
  ]);

  return {
    pending,
    contacted,
    processing,
    completed,
    cancelled,
    total: pending + contacted + processing + completed + cancelled,
  };
}
