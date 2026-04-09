import { SiteHeader, SiteFooter, ServiceInfoCard, FooterCTA, BackToTop } from '@/components/shared';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {/* mobile: logo row only (56px), desktop: logo + nav (56+52=108px) */}
      <main className="pt-14 sm:pt-[112px]">{children}</main>
      <ServiceInfoCard />
      <SiteFooter />
      <FooterCTA />
      <BackToTop />
    </>
  );
}
