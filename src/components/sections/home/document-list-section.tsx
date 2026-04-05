import { requiredDocuments } from '@/data/home/documents';
import { FileText } from 'lucide-react';

export function DocumentListSection() {
  return (
    <section id="documents" className="bg-brand-bg py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center text-2xl font-bold text-brand-dark md:text-3xl">
          申請文件
        </h2>

        <div className="mt-8 space-y-4">
          {requiredDocuments.map((doc, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-semibold text-brand-dark">
                    {doc.category}
                  </h3>
                  {doc.content && (
                    <p className="mt-1 text-sm text-text-mid">{doc.content}</p>
                  )}
                  {doc.subItems && (
                    <ul className="mt-2 space-y-1">
                      {doc.subItems.map((sub, subIndex) => (
                        <li
                          key={subIndex}
                          className="text-sm text-text-mid before:mr-2 before:content-['•']"
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
