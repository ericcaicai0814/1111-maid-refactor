import type { ApplicationStatus } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusConfig: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: '待處理',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  CONTACTED: {
    label: '已聯繫',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  PROCESSING: {
    label: '處理中',
    className: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  COMPLETED: {
    label: '已完成',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  CANCELLED: {
    label: '已取消',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}

export { statusConfig };
