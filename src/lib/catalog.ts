// Sample catalog data for the homepage. Images are from Unsplash.
import type { Product } from "@/types/product";
import { getProductsByCode } from "@/lib/products";
import { unsplash } from "@/lib/unsplash";

export type Editorial = {
  eyebrow: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  cta: string;
};

export const hero: Editorial = {
  eyebrow: "Autumn / Winter",
  title: "The quiet season",
  description: "Layered textures, warm neutrals, pieces made to last.",
  imageUrl: unsplash("1445205170230-053b83016050"),
  imageAlt: "Warm-toned garments hanging in a softly lit boutique",
  href: "/shop",
  cta: "Discover the collection",
};

export const featuredCollections: Editorial[] = [
  {
    eyebrow: "Collection",
    title: "Outerwear",
    imageUrl: unsplash("1485968579580-b6d095142e6e"),
    imageAlt: "Woman in a long checked coat on a city street",
    href: "/shop/women",
    cta: "Shop outerwear",
  },
  {
    eyebrow: "Collection",
    title: "Leather",
    imageUrl: unsplash("1520975954732-35dd22299614"),
    imageAlt: "Man in a black leather jacket against a brick wall",
    href: "/shop/men",
    cta: "Shop leather",
  },
];

export function getNewArrivals(): Promise<Product[]> {
  return getProductsByCode([
    "P-001", "P-002", "P-003", "P-004", "P-005", "P-006", "P-007", "P-008",
  ]);
}

export const editorialBanner: Editorial = {
  eyebrow: "The edit",
  title: "A wardrobe, considered",
  description:
    "Fewer, better pieces: tailored coats and soft knits chosen to wear for years.",
  imageUrl: unsplash("1551232864-3f0890e580d9"),
  imageAlt: "A minimal clothing rail with coats and knitwear",
  href: "/shop",
  cta: "Read the edit",
};

export const categories: Editorial[] = [
  {
    eyebrow: "Ready-to-wear",
    title: "Women",
    imageUrl: unsplash("1539109136881-3be0616acf4b"),
    imageAlt: "Woman in a pale blue coat in a cathedral square",
    href: "/shop/women",
    cta: "Shop women",
  },
  {
    eyebrow: "Ready-to-wear",
    title: "Men",
    imageUrl: unsplash("1487222477894-8943e31ef7b2"),
    imageAlt: "Man in a brown leather jacket and sunglasses",
    href: "/shop/men",
    cta: "Shop men",
  },
  {
    eyebrow: "Leather goods",
    title: "Bags",
    imageUrl: unsplash("1591561954557-26941169b49e"),
    imageAlt: "Printed leather handbag on display",
    href: "/shop/bags",
    cta: "Shop bags",
  },
  {
    eyebrow: "Gold and stones",
    title: "Jewelry",
    imageUrl: unsplash("1535632066927-ab7c9ab60908"),
    imageAlt: "Pair of jewelled drop earrings on a green leaf",
    href: "/shop/jewelry",
    cta: "Shop jewelry",
  },
];

export const story: Editorial = {
  eyebrow: "Our craft",
  title: "Made slowly, by hand",
  description:
    "Every piece is produced in small runs by independent workshops, in natural materials chosen for how they age.",
  imageUrl: unsplash("1558769132-cb1aea458c5e"),
  imageAlt: "Knitwear in natural tones hanging on a wooden rail",
  href: "/",
  cta: "About Atelier",
};

export const services = [
  {
    title: "Complimentary shipping",
    description: "On every order, delivered in signature packaging.",
  },
  {
    title: "Returns within 30 days",
    description: "Free collection from your door.",
  },
  {
    title: "Book an appointment",
    description: "Private styling, in store or by video.",
  },
] as const;
