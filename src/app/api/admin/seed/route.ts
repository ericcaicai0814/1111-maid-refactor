import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const existing = await prisma.admin.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (existing) {
    return NextResponse.json({ message: 'Admin already exists', id: existing.id });
  }

  const hashedPassword = await hashPassword('admin123');

  const admin = await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: '管理員',
    },
  });

  return NextResponse.json({ message: 'Admin created', id: admin.id }, { status: 201 });
}
