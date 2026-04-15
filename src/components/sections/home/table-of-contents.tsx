export interface TOCItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <aside
      className="sticky top-28 hidden overflow-hidden rounded-2xl border border-[#eae8fa] bg-white shadow-[0_8px_24px_rgba(61,55,142,0.08)] lg:block"
      aria-label="快速連結"
    >
      <div className="bg-[#ecebf7] px-5 py-3">
        <h2 className="text-lg font-semibold text-[#3d378e]">快速連結</h2>
      </div>
      <nav className="px-5 py-4">
        <ul className="space-y-3 text-base text-[#4f4b71]">
          {items.map((item) => (
            <li key={item.id} className="ml-4 list-disc">
              <a
                href={`#${item.id}`}
                className="underline underline-offset-4 transition-colors hover:text-[#837ccf]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
