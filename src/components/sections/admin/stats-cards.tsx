import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  pending: number;
  contacted: number;
  processing: number;
  completed: number;
  cancelled: number;
}

const statsConfig = [
  { key: 'pending' as const, label: '待處理', color: 'text-yellow-600' },
  { key: 'contacted' as const, label: '已聯繫', color: 'text-blue-600' },
  { key: 'processing' as const, label: '處理中', color: 'text-purple-600' },
  { key: 'completed' as const, label: '已完成', color: 'text-green-600' },
  { key: 'cancelled' as const, label: '已取消', color: 'text-gray-600' },
];

export function StatsCards(props: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {statsConfig.map(({ key, label, color }) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${color}`}>{props[key]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
