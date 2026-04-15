import { HeroBanner, MiniFAQ } from '@/components/shared';
import {
  PolicyHighlightSection,
  CostTableSection,
  ProcessFlowSection,
  DocumentListSection,
  TableOfContents,
} from '@/components/sections/home';

const tocItems = [
  { id: 'eligibility-guide', label: '申請資格總整理' },
  { id: 'costs-guide', label: '薪資費用' },
  { id: 'process-guide', label: '申請流程' },
  { id: 'documents-guide', label: '申請文件' },
  { id: 'faq-guide', label: '申請問答' },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1100px] px-4 pb-16 pt-10 md:pt-12">
        <HeroBanner />

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <TableOfContents items={tocItems} />
          <div className="space-y-12">
            <PolicyHighlightSection />
            <CostTableSection />
            <ProcessFlowSection />
            <DocumentListSection />
            <MiniFAQ />
          </div>
        </div>
      </div>
    </div>
  );
}
