export interface TOCItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav
      className="sticky top-20 hidden max-h-[calc(100vh-6rem)] lg:block"
      aria-label="目錄"
    >
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-light">
          快速導覽
        </p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block text-sm text-text-mid transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
