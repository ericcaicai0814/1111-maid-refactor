'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';
const COOKIE_NAME = 'admin-token';

/** 管理員登入 */
export async function loginAction(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  if (!email || !password) {
    return { success: false, error: '請輸入帳號和密碼' };
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return { success: false, error: '帳號或密碼錯誤' };
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return { success: false, error: '帳號或密碼錯誤' };
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' },
    );

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : '登入失敗';
    return { success: false, error: message };
  }
}

/** 管理員登出 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect('/admin/login');
}
