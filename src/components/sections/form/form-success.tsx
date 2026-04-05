import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { CircleCheck } from 'lucide-react';

export function FormSuccess() {
  return (
    <Card className="mx-auto max-w-md text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-lg text-green-700">
          <CircleCheck className="size-6" />
          表單送出成功
        </CardTitle>
        <CardDescription>
          感謝您的申請，我們將盡快與您聯繫。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          如有任何問題，歡迎透過電話或 Email 聯繫我們。
        </p>
      </CardContent>
    </Card>
  );
}
