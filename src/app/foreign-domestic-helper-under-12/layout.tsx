import { SiteHeader, SiteFooter, ServiceInfoCard, FooterCTA, BackToTop } from '@/components/shared';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {/* mobile: logo row only (py-3 + h-10 = 64px), desktop: logo + nav (64+52=116px) */}
      <main className="pt-16 sm:pt-[116px]">{children}</main>
      <ServiceInfoCard />
      <SiteFooter />
      <FooterCTA />
      <BackToTop />
    </>
  );
}
