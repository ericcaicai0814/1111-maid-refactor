export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // TODO: JWT auth guard — verify cookie → jwt.verify() → redirect if invalid
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
