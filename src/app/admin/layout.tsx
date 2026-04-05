import { prisma } from '@/lib/prisma';
import { SidebarNav } from '@/components/sections/admin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: JWT auth guard — verify cookie → jwt.verify() → redirect if invalid

  const pendingCount = await prisma.application.count({
    where: { status: 'PENDING' },
  });

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <SidebarNav pendingCount={pendingCount} />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
