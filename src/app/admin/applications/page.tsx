import Link from 'next/link';
import type { ApplicationStatus } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { ApplicationTable } from '@/components/sections/admin';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 20;

const statusFilters: { label: string; value: ApplicationStatus | 'ALL' }[] = [
  { label: '全部', value: 'ALL' },
  { label: '待處理', value: 'PENDING' },
  { label: '已聯繫', value: 'CONTACTED' },
  { label: '處理中', value: 'PROCESSING' },
  { label: '已完成', value: 'COMPLETED' },
  { label: '已取消', value: 'CANCELLED' },
];

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status as ApplicationStatus | undefined;
  const page = Math.max(1, Number(params.page) || 1);

  const where = statusFilter ? { status: statusFilter } : {};

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.application.count({ where }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">申請列表</h1>

      <div className="flex gap-2">
        {statusFilters.map(({ label, value }) => {
          const isActive =
            value === 'ALL' ? !statusFilter : statusFilter === value;
          const href =
            value === 'ALL'
              ? '/admin/applications'
              : `/admin/applications?status=${value}`;
          return (
            <Link
              key={value}
              href={href}
              className={cn(
                'rounded-md border px-3 py-1 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <ApplicationTable
        applications={applications}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
