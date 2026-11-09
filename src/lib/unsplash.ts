/**
 * Fixed query string for every Unsplash source image. `next.config.ts`
 * only allows this exact string, and next/image resizes from there.
 */
export const UNSPLASH_PARAMS = "auto=format&fit=crop&w=2400&q=80";

/** Build an Unsplash image URL from a photo id ("1490481651871-ab68de25d43d"). */
export function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?${UNSPLASH_PARAMS}`;
}
