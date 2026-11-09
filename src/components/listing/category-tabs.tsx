import Link from "next/link";
import { getCategories } from "@/lib/products";
import type { CategorySlug } from "@/types/product";

/** Category tab row. Scrolls sideways on small screens. */
export async function CategoryTabs({ active }: { active: CategorySlug | null }) {
  const categories = await getCategories();
  const tabs = [
    { href: "/shop", label: "All", current: active === null },
    ...categories.map((c) => ({
      href: `/shop/${c.slug}`,
      label: c.title,
      current: c.slug === active,
    })),
  ];

  return (
    <nav aria-label="Categories" className="border-b">
      <ul className="container-bleed scroll-row gap-6 md:gap-8">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link
              href={tab.href}
              aria-current={tab.current ? "page" : undefined}
              className="link-tab block py-4"
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
