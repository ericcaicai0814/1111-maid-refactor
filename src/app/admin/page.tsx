import { prisma } from '@/lib/prisma';
import { StatsCards } from '@/components/sections/admin';

export default async function AdminDashboard() {
  const [pending, contacted, processing, completed, cancelled] =
    await Promise.all([
      prisma.application.count({ where: { status: 'PENDING' } }),
      prisma.application.count({ where: { status: 'CONTACTED' } }),
      prisma.application.count({ where: { status: 'PROCESSING' } }),
      prisma.application.count({ where: { status: 'COMPLETED' } }),
      prisma.application.count({ where: { status: 'CANCELLED' } }),
    ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">儀表板</h1>
      <StatsCards
        pending={pending}
        contacted={contacted}
        processing={processing}
        completed={completed}
        cancelled={cancelled}
      />
    </div>
  );
}
