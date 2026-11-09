import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListing } from "@/components/listing/product-listing";
import { getCategories, getCategory } from "@/lib/products";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[category]">): Promise<Metadata> {
  const category = await getCategory((await params).category);
  return category ? { title: category.title, description: category.description } : {};
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/shop/[category]">) {
  const category = await getCategory((await params).category);
  if (!category) notFound();

  return <ProductListing category={category} searchParams={searchParams} />;
}
