import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom theme tokens from globals.css. Without
// this it reads `text-label` as a text color, so `cn("text-label",
// "text-muted-foreground")` would silently drop the font size.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["caption", "label", "body", "lead", "headline", "display"],
      color: ["background", "foreground", "surface", "muted-foreground", "border"],
      spacing: ["gutter", "section", "header", "control"],
      container: ["page", "prose"],
      tracking: ["wordmark"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amountInCents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amountInCents / 100,
  );
}
