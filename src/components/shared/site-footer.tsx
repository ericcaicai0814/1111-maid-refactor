export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted py-6 text-center text-sm text-muted-foreground">
      <p>© {year} 1111人力銀行 版權所有</p>
    </footer>
  );
}
