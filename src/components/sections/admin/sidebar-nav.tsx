'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { adminNavItems } from '@/data/admin/navigation';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
};

interface SidebarNavProps {
  pendingCount: number;
}

export function SidebarNav({ pendingCount }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-6 text-lg font-bold">管理後台</h2>
      <nav className="flex flex-1 flex-col gap-1">
        {adminNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {Icon && <Icon className="size-4" />}
              <span className="flex-1">{item.label}</span>
              {item.href === '/admin/applications' && pendingCount > 0 && (
                <Badge variant="default" className="bg-yellow-500 text-white">
                  {pendingCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
      <Button
        variant="ghost"
        className="mt-auto justify-start gap-2"
        onClick={() => console.log('logout')}
      >
        <LogOut className="size-4" />
        登出
      </Button>
    </div>
  );
}
