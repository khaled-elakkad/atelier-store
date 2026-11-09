import type { Metadata } from "next";
import { ProductListing } from "@/components/listing/product-listing";

export const metadata: Metadata = {
  title: "Shop",
  description: "The full collection, across every category.",
};

export default function ShopPage({ searchParams }: PageProps<"/shop">) {
  return <ProductListing category={null} searchParams={searchParams} />;
}
