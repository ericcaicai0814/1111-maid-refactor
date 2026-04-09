import { HeroBanner, MiniFAQ } from '@/components/shared';
import {
  PolicyHighlightSection,
  CostTableSection,
  ProcessFlowSection,
  DocumentListSection,
  TableOfContents,
} from '@/components/sections/home';

const tocItems = [
  { id: 'policy', label: '申請資格' },
  { id: 'calculator', label: '資格試算' },
  { id: 'cost', label: '費用表' },
  { id: 'process', label: '申請流程' },
  { id: 'documents', label: '申請文件' },
  { id: 'faq', label: '常見問題' },
];

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <div className="relative mx-auto max-w-7xl lg:flex lg:gap-8">
        <div className="min-w-0 flex-1">
          <PolicyHighlightSection />
          <CostTableSection />
          <ProcessFlowSection />
          <DocumentListSection />
          <MiniFAQ />
        </div>
        <aside className="hidden w-56 shrink-0 py-12 pr-4 lg:block">
          <TableOfContents items={tocItems} />
        </aside>
      </div>
    </>
  );
}
