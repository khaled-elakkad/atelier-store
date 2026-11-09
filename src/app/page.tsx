import Image from "next/image";
import Link from "next/link";
import { EditorialTile } from "@/components/home/editorial-tile";
import { Hero } from "@/components/home/hero";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard } from "@/components/product/product-card";
import {
  categories,
  editorialBanner,
  featuredCollections,
  getNewArrivals,
  hero,
  services,
  story,
} from "@/lib/catalog";

export default async function Home() {
  const newArrivals = await getNewArrivals();

  return (
    <>
      <Hero item={hero} />

      {/* One spacing rhythm: every section below sits `gap-section` apart. */}
      <div className="flex flex-col gap-section pt-section">
        {/* Opening statement: label column + offset text, not a centered blurb */}
        <section className="container-page grid gap-4 md:grid-cols-12 md:gap-8">
          <p className="eyebrow text-muted-foreground md:col-span-3">The house</p>
          <div className="flex flex-col items-start gap-6 md:col-span-8 md:col-start-5">
            <p className="text-headline">
              Clothing and objects in natural materials, made in small runs by
              people who know their craft.
            </p>
            <Link href={story.href} className="link">
              {story.cta}
            </Link>
          </div>
        </section>

        {/* Featured collections: two-up, edge to edge */}
        <section aria-label="Featured collections" className="grid gap-[4px] md:grid-cols-2 md:gap-[2px]">
          {featuredCollections.map((item) => (
            <EditorialTile
              key={item.title}
              item={item}
              sizes="(min-width: 768px) 50vw, 100vw"
              frameClassName="aspect-[4/5] md:aspect-[3/4]"
            />
          ))}
        </section>

        {/* New arrivals */}
        <section aria-labelledby="new-arrivals" className="scroll-mt-header">
          <SectionHeading
            id="new-arrivals"
            eyebrow="Just in"
            title="New arrivals"
            aside={`${newArrivals.length} pieces`}
          />
          <div className="product-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Editorial banner: copy on the photo from md; below it on phones */}
        <section className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={editorialBanner.imageUrl}
              alt={editorialBanner.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 hidden bg-linear-to-r from-black/60 via-black/20 to-transparent md:block" />
          </div>
          <div className="container-page flex flex-col items-start gap-4 pt-8 md:absolute md:inset-y-0 md:left-0 md:justify-center md:pt-0 md:text-white">
            <p className="eyebrow text-muted-foreground md:text-white">{editorialBanner.eyebrow}</p>
            <h2 className="max-w-[12ch] text-display">{editorialBanner.title}</h2>
            <p className="max-w-sm text-lead text-muted-foreground md:text-white/90">
              {editorialBanner.description}
            </p>
            <Link href={editorialBanner.href} className="btn btn-secondary mt-2 md:btn-on-media">
              {editorialBanner.cta}
            </Link>
          </div>
        </section>

        {/* Shop by category: catalogue tiles, title under the image */}
        <section aria-labelledby="categories">
          <SectionHeading id="categories" eyebrow="Browse" title="Shop by category" />
          <div className="grid grid-cols-2 gap-[4px] md:gap-[2px] lg:grid-cols-4">
            {categories.map((item) => (
              <EditorialTile
                key={item.title}
                item={item}
                variant="caption"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            ))}
          </div>
        </section>

        {/* Brand story: full-bleed split, image edge to edge */}
        <section className="grid md:grid-cols-2">
          <div className="media-frame aspect-[4/5] md:aspect-auto md:min-h-[44rem]">
            <Image src={story.imageUrl} alt={story.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="flex flex-col items-start justify-center gap-5 bg-surface px-gutter py-section md:px-16 lg:px-24">
            <p className="eyebrow text-muted-foreground">{story.eyebrow}</p>
            <h2 className="max-w-[14ch] text-display">{story.title}</h2>
            <p className="max-w-md text-lead text-muted-foreground">{story.description}</p>
            <Link href={story.href} className="btn btn-secondary mt-2">
              {story.cta}
            </Link>
          </div>
        </section>

        {/* Services */}
        <section aria-label="Services" className="container-page pb-section">
          <ul className="grid gap-8 border-t pt-10 md:grid-cols-3 md:gap-12">
            {services.map((service) => (
              <li key={service.title} className="flex flex-col gap-2">
                <h3 className="eyebrow">{service.title}</h3>
                <p className="max-w-[28ch] text-muted-foreground">{service.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
