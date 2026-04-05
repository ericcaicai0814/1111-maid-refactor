'use client';

import type { Application, ApplicationStatus } from '@prisma/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusBadge, statusConfig } from './status-badge';

interface ApplicationDetailProps {
  application: Application;
}

const fieldLabels: { key: keyof Application; label: string }[] = [
  { key: 'name', label: '申請人' },
  { key: 'title', label: '稱謂' },
  { key: 'customTitle', label: '自訂稱謂' },
  { key: 'phone', label: '電話' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: '公司' },
  { key: 'jobTitle', label: '職稱' },
  { key: 'address', label: '地址' },
  { key: 'childrenCount', label: '子女人數' },
  { key: 'childAge', label: '最小子女年齡' },
  { key: 'childBirthdays', label: '子女生日' },
  { key: 'familyStatus', label: '家庭狀況' },
  { key: 'nationalityPreference', label: '國籍偏好' },
  { key: 'customNationality', label: '自訂國籍' },
  { key: 'contactTime', label: '聯繫時段' },
  { key: 'customContactTime', label: '自訂聯繫時段' },
];

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (Array.isArray(value)) return value.length > 0 ? value.join('、') : '—';
  return String(value);
}

const allStatuses: ApplicationStatus[] = [
  'PENDING',
  'CONTACTED',
  'PROCESSING',
  'COMPLETED',
  'CANCELLED',
];

export function ApplicationDetail({ application }: ApplicationDetailProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span>申請詳情</span>
            <StatusBadge status={application.status} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fieldLabels.map(({ key, label }) => (
              <div key={key}>
                <dt className="text-sm font-medium text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1">{formatValue(application[key])}</dd>
              </div>
            ))}
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                建立時間
              </dt>
              <dd className="mt-1">
                {new Date(application.createdAt).toLocaleString('zh-TW')}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                更新時間
              </dt>
              <dd className="mt-1">
                {new Date(application.updatedAt).toLocaleString('zh-TW')}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>更新狀態</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            defaultValue={application.status}
            onValueChange={(value: string) => {
              // TODO: Server Action to update status
              console.log('update status', value);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="選擇狀態" />
            </SelectTrigger>
            <SelectContent>
              {allStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {statusConfig[s].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
