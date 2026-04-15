import { requiredDocuments } from '@/data/home/documents';

export function DocumentListSection() {
  // 扁平化：每個 document 的 content 或 subItems 都展開成單行 bullet
  const bulletItems: string[] = [];
  for (const doc of requiredDocuments) {
    if (doc.content) {
      bulletItems.push(doc.content);
    }
    if (doc.subItems) {
      for (const sub of doc.subItems) {
        bulletItems.push(sub);
      }
    }
  }

  return (
    <section id="documents-guide" className="scroll-mt-32">
      <div className="mx-auto max-w-5xl px-4">
        {/* 區塊標題 — 淡紫 hero pill */}
        <div className="mb-7 rounded-2xl bg-[#ecebf7] px-6 py-4 text-center">
          <h2 className="text-[1.55rem] font-semibold tracking-[-0.02em] text-[#3d378e] md:text-[1.8rem]">
            申請文件
          </h2>
        </div>

        {/* 單卡片扁平 bullet 列表 */}
        <div className="rounded-2xl border border-[#ddd8f2] bg-white p-6 shadow-[0_10px_30px_rgba(61,55,142,0.08)]">
          <ul className="space-y-4">
            {bulletItems.map((text, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm leading-7 text-[#5b5778]"
              >
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#837ccf]" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
