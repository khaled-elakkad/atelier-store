import Image from "next/image";
import Link from "next/link";
import type { Editorial } from "@/lib/catalog";

export function Hero({ item }: { item: Editorial }) {
  return (
    <section className="media-hero">
      <Image src={item.imageUrl} alt={item.imageAlt} fill preload sizes="100vw" />
      <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 via-45% to-transparent" />
      <div className="container-page absolute inset-x-0 bottom-0 flex flex-col gap-6 pb-10 text-white md:flex-row md:items-end md:justify-between md:gap-16 md:pb-16">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">{item.eyebrow}</p>
          <h1 className="max-w-[11ch] text-display">{item.title}</h1>
        </div>
        <div className="flex flex-col items-start gap-5 md:max-w-xs">
          {item.description && <p className="text-lead opacity-90">{item.description}</p>}
          <Link href={item.href} className="btn btn-on-media">
            {item.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
