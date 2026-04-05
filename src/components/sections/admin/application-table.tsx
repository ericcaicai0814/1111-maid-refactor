import Link from 'next/link';
import type { Application } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from './status-badge';

interface ApplicationTableProps {
  applications: Application[];
  total: number;
  page: number;
  pageSize: number;
}

export function ApplicationTable({
  applications,
  total,
  page,
  pageSize,
}: ApplicationTableProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>申請人</TableHead>
            <TableHead>稱謂</TableHead>
            <TableHead>電話</TableHead>
            <TableHead>狀態</TableHead>
            <TableHead>建立時間</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                尚無申請資料
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>
                  <Link
                    href={`/admin/applications/${app.id}`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {app.name}
                  </Link>
                </TableCell>
                <TableCell>{app.title}</TableCell>
                <TableCell>{app.phone}</TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell>
                  {new Date(app.createdAt).toLocaleDateString('zh-TW')}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            共 {total} 筆，第 {page} / {totalPages} 頁
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}`}
                className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
              >
                上一頁
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?page=${page + 1}`}
                className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
              >
                下一頁
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
