import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/home/section-heading";
import { AddToBag } from "@/components/product/add-to-bag";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { StockStatus } from "@/components/product/stock-status";
import { services } from "@/lib/catalog";
import { COLOR_OPTIONS } from "@/lib/listing";
import {
  getCategory,
  getProduct,
  getProductSlugs,
  getRelatedProducts,
} from "@/lib/products";
import { getStockState } from "@/lib/stock";
import { formatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.imageUrl] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const category = (await getCategory(product.category))!;
  const color = COLOR_OPTIONS.find((c) => c.value === product.color)!;
  const soldOut = getStockState(product).status === "sold-out";
  const related = await getRelatedProducts(product);

  return (
    <>
      <div className="grid md:grid-cols-12">
        {/* Imagery: edge to edge, the larger share of the page */}
        <div className="md:col-span-7">
          <ProductGallery
            images={[
              { src: product.imageUrl, alt: product.name },
              { src: product.imageUrl, alt: `${product.name}, detail`, detail: true },
            ]}
          />
        </div>

        {/* Product information: sticks beside the gallery on larger screens */}
        <div className="md:col-span-5">
          <div className="flex flex-col gap-8 px-gutter py-8 md:sticky md:top-header md:px-10 md:py-12 lg:px-16">
            <nav aria-label="Breadcrumb" className="text-caption text-muted-foreground">
              <ol className="flex gap-2">
                <li>
                  <Link href="/shop" className="hover:text-foreground">Shop</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`/shop/${category.slug}`} className="hover:text-foreground">
                    {category.title}
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="flex flex-col gap-3">
              {product.badge && (
                <p className="eyebrow text-muted-foreground">{product.badge}</p>
              )}
              <h1 className="text-headline">{product.name}</h1>
              <p className="price text-lead">{formatPrice(product.price)}</p>
            </div>

            <p className="max-w-md text-lead text-muted-foreground">{product.description}</p>

            <dl className="grid grid-cols-[6rem_1fr] gap-y-3 border-t pt-6">
              <dt className="eyebrow">Color</dt>
              <dd className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-3 rounded-full border border-foreground/15"
                  style={{ background: color.swatch }}
                />
                {color.label}
              </dd>
              <dt className="eyebrow">Category</dt>
              <dd>
                <Link href={`/shop/${category.slug}`} className="link">
                  {category.title}
                </Link>
              </dd>
              <dt className="eyebrow">Availability</dt>
              <dd>
                <StockStatus product={product} />
              </dd>
            </dl>

            <AddToBag soldOut={soldOut} />

            <div className="border-t">
              <Disclosure title="Details">
                <p>{product.description}</p>
                <p>Product code {product.code}</p>
              </Disclosure>
              <Disclosure title="Delivery and returns">
                {services.slice(0, 2).map((s) => (
                  <p key={s.title}>
                    <span className="text-foreground">{s.title}.</span> {s.description}
                  </p>
                ))}
              </Disclosure>
              <Disclosure title="Care">
                <p>Store away from direct light. Clean with a soft, dry cloth, or have it professionally cleaned.</p>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="pt-section pb-section">
          <SectionHeading id="related" eyebrow={category.title} title="You may also like" />
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/** Collapsible row built on native <details>. */
function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b">
      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden className="text-lead font-normal transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="flex flex-col gap-2 pb-5 text-muted-foreground">{children}</div>
    </details>
  );
}
