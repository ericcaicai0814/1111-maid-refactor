import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJWT, AUTH_COOKIE_NAME } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Auth guard (defense-in-depth, primary guard is middleware)
  // Verify JWT from cookie; redirect to login if invalid.
  // Note: the login page is a child of this layout, so we must allow
  // rendering when there is no valid token (login page needs to load).
  // The middleware already prevents access to other /admin/* pages without a cookie.
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (token && !verifyJWT(token)) {
    // Token exists but is invalid/expired — clear it and redirect to login
    redirect('/foreign-domestic-helper-under-12/admin/login');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <h2 className="text-lg font-bold">管理後台</h2>
        {/* TODO: Sidebar navigation + PENDING badge */}
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
