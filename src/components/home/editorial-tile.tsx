import Image from "next/image";
import Link from "next/link";
import type { Editorial } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const zoom = "transition-transform duration-700 group-hover:scale-[1.03]";

/**
 * Linked image tile.
 * - `overlay`: large campaign tile with the title set on the photo.
 * - `caption`: catalogue tile with the title below the photo.
 */
export function EditorialTile({
  item,
  sizes,
  variant = "overlay",
  frameClassName,
}: {
  item: Editorial;
  sizes: string;
  variant?: "overlay" | "caption";
  frameClassName?: string;
}) {
  if (variant === "caption") {
    return (
      <Link href={item.href} className="group block">
        <div className={cn("media-frame", frameClassName)}>
          <Image src={item.imageUrl} alt={item.imageAlt} fill sizes={sizes} className={zoom} />
        </div>
        <div className="card-body">
          <h3 className="eyebrow">{item.title}</h3>
          <p className="text-muted-foreground">{item.eyebrow}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={item.href} className={cn("group media-frame block", frameClassName)}>
      <Image src={item.imageUrl} alt={item.imageAlt} fill sizes={sizes} className={zoom} />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent via-50% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white md:p-8">
        <h3 className="text-headline">{item.title}</h3>
        <span className="eyebrow shrink-0 pb-1 underline decoration-1 underline-offset-[0.4em]">
          {item.cta}
        </span>
      </div>
    </Link>
  );
}
