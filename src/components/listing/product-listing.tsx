import { Suspense } from "react";
import { CategoryTabs } from "@/components/listing/category-tabs";
import { ListingResults } from "@/components/listing/listing-results";
import { ListingSkeleton } from "@/components/listing/listing-skeleton";
import {
  categories as categoryTiles,
  editorialBanner,
  featuredCollections,
  type Editorial,
} from "@/lib/catalog";
import type { Category, CategorySlug } from "@/types/product";

/** Campaign tile shown inside the grid, per listing. Shoes and accessories
 *  have too few products to break up. */
const features: Partial<Record<CategorySlug, Editorial>> = {
  all: featuredCollections[0],
  women: editorialBanner,
  men: featuredCollections[1],
  bags: categoryTiles.find((c) => c.title === "Jewelry"),
  jewelry: categoryTiles.find((c) => c.title === "Bags"),
};

/**
 * Product listing page body. The heading and tabs are static; the results
 * read `searchParams`, so they stream in inside a Suspense boundary.
 */
export function ProductListing({
  category,
  searchParams,
}: {
  category: Category | null;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const basePath = category ? `/shop/${category.slug}` : "/shop";

  return (
    <>
      <header className="container-bleed flex flex-col gap-3 pt-10 pb-8 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-16 md:pb-10">
        <div className="flex flex-col gap-2">
          <p className="eyebrow text-muted-foreground">Shop</p>
          <h1 className="text-headline">{category?.title ?? "All pieces"}</h1>
        </div>
        <p className="max-w-sm text-muted-foreground md:pb-1 md:text-right">
          {category?.description ?? "The full collection, across every category."}
        </p>
      </header>

      <CategoryTabs active={category?.slug ?? null} />

      <Suspense fallback={<ListingSkeleton />}>
        <ListingResults
          category={category?.slug ?? null}
          basePath={basePath}
          searchParams={searchParams}
          feature={features[category?.slug ?? "all"]}
        />
      </Suspense>

      <div className="h-section" />
    </>
  );
}
