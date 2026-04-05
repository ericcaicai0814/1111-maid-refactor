import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJWT, AUTH_COOKIE_NAME } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SidebarNav } from '@/components/sections/admin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth guard (defense-in-depth, primary guard is middleware)
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (token && !verifyJWT(token)) {
    redirect('/foreign-domestic-helper-under-12/admin/login');
  }

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
