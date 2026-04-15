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
    <>
      <HeroBanner />
      <div className="relative mx-auto max-w-7xl px-4 lg:flex lg:gap-8 lg:px-0">
        <div className="min-w-0 flex-1 py-12">
          <div className="space-y-12">
            <PolicyHighlightSection />
            <CostTableSection />
            <ProcessFlowSection />
            <DocumentListSection />
            <MiniFAQ />
          </div>
        </div>
        <div className="hidden w-56 shrink-0 py-12 pr-4 lg:block">
          <TableOfContents items={tocItems} />
        </div>
      </div>
    </>
  );
}
