import { HeroBanner, MiniFAQ } from '@/components/shared';
import {
  PolicyHighlightSection,
  CostTableSection,
  ProcessFlowSection,
  DocumentListSection,
  TableOfContents,
} from '@/components/sections/home';

const tocItems = [
  { id: 'policy', label: '申請資格總整理' },
  { id: 'cost', label: '薪資費用' },
  { id: 'process', label: '申請流程' },
  { id: 'documents', label: '申請文件' },
  { id: 'faq', label: '申請問答' },
];

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <div className="relative mx-auto max-w-7xl px-4 lg:flex lg:gap-8 lg:px-0">
        <div className="min-w-0 flex-1">
          <PolicyHighlightSection />
          <CostTableSection />
          <ProcessFlowSection />
          <DocumentListSection />
          <MiniFAQ />
        </div>
        <div className="hidden w-56 shrink-0 py-12 pr-4 lg:block">
          <TableOfContents items={tocItems} />
        </div>
      </div>
    </>
  );
}
