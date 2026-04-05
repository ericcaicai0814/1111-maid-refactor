'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signJWT, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function loginAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: '請輸入 Email 和密碼' };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return { success: false, error: 'Email 或密碼錯誤' };
  }

  const valid = await verifyPassword(password, admin.password);

  if (!valid) {
    return { success: false, error: 'Email 或密碼錯誤' };
  }

  const token = signJWT({
    adminId: admin.id,
    email: admin.email,
    role: admin.role,
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return { success: true };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect('/foreign-domestic-helper-under-12/admin/login');
}
