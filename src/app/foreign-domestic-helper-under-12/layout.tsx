import { SiteHeader, SiteFooter, FooterCTA, BackToTop } from '@/components/shared';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="pt-14">{children}</main>
      <SiteFooter />
      <FooterCTA />
      <BackToTop />
    </>
  );
}
