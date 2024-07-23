import { db } from '@/lib/drizzle';
import { productTable } from '@/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { EditProductForm } from './edit-product-form';

type PageProps = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export const runtime = 'nodejs';

export const revalidate = 0;

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Edit Product',
};

const getProduct = cache(async (slug: string) => {
  try {
    const product = await db.query.productTable.findFirst({
      where: eq(productTable.slug, slug),
    });

    return product ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
});

const getCategories = cache(async () => {
  try {
    const categories = await db.query.categoryTable.findMany({});

    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
});

export default async function Page({ params }: PageProps) {
  const product = await getProduct(params.slug);
  const categories = await getCategories();

  if (!product) {
    return redirect('/manage/products');
  }
  return (
    <>
      <EditProductForm product={product} categories={categories} />
    </>
  );
}
