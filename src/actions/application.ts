'use server';

import { ApplicationFormSchema, type ApplicationFormData } from '@/data/form/schema';
import { prisma } from '@/lib/prisma';
import type { Application, ApplicationStatus } from '@prisma/client';

const VALID_STATUSES: ApplicationStatus[] = [
  'PENDING',
  'CONTACTED',
  'PROCESSING',
  'COMPLETED',
  'CANCELLED',
];

/** 表單送出 */
export async function submitApplication(
  data: ApplicationFormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const validated = ApplicationFormSchema.parse(data);
    await prisma.application.create({ data: validated });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : '送出失敗，請稍後再試';
    return { success: false, error: message };
  }
}

/** 取得申請列表（分頁 + 篩選） */
export async function getApplications(params: {
  page?: number;
  pageSize?: number;
  status?: string;
}): Promise<{
  applications: Application[];
  total: number;
  totalPages: number;
}> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;

  const where = params.status ? { status: params.status as ApplicationStatus } : {};

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.application.count({ where }),
  ]);

  return {
    applications,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}

/** 取得單一申請 */
export async function getApplicationById(id: string): Promise<Application | null> {
  return prisma.application.findUnique({ where: { id } });
}

/** 更新申請狀態 */
export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<{ success: boolean; error?: string }> {
  if (!VALID_STATUSES.includes(status)) {
    return { success: false, error: '無效的狀態值' };
  }

  try {
    await prisma.application.update({
      where: { id },
      data: { status },
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : '更新失敗';
    return { success: false, error: message };
  }
}
