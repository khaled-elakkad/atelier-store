import Image from "next/image";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
  /** Zoomed crop of the same photo, standing in for a detail shot. */
  detail?: boolean;
};

/**
 * Product imagery. Phones: horizontal swipe with snap points.
 * From md: images stacked in a column beside the sticky product info.
 */
export function ProductGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="flex snap-x snap-mandatory gap-[4px] overflow-x-auto [scrollbar-width:none] md:snap-none md:flex-col md:gap-[2px] md:overflow-visible">
      {images.map((image, index) => (
        <div
          key={index}
          className="media-frame aspect-[4/5] w-full shrink-0 snap-start md:aspect-[3/4]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 0}
            // Landscape sources cropped into a portrait frame need ~2x the
            // frame width; the detail crop needs 1.4x on top of that. 1.4x is
            // as far as the 2400px sources go before visibly softening.
            sizes={image.detail ? "(min-width: 768px) 162vw, 280vw" : "(min-width: 768px) 116vw, 200vw"}
            className={cn(image.detail && "scale-[1.4]")}
          />
          <span className="absolute right-3 bottom-3 bg-background/80 px-2 py-1 text-caption md:hidden">
            {index + 1} / {images.length}
          </span>
        </div>
      ))}
    </div>
  );
}
