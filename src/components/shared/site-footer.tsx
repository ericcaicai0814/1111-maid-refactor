export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark px-5 py-5 text-center">
      <p className="text-sm text-white/70">
        © {year} 1111人力銀行
      </p>
    </footer>
  );
}
