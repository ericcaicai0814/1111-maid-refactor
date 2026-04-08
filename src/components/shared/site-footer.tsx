export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark py-6 text-center">
      <p className="text-sm text-white/70">
        © {year} 1111人力銀行 幫傭專案
      </p>
    </footer>
  );
}
