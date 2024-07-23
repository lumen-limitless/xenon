import { db } from '@/lib/drizzle';
import { cache } from 'react';
import { AddProductForm } from './add-product-form';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const runtime = 'nodejs';

export const revalidate = 0;

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'New Product',
};

const getCategories = cache(async () => {
  try {
    const categories = await db.query.categoryTable.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
});

export default async function Page({}: PageProps) {
  const categories = await getCategories();
  return (
    <>
      <section>
        <div className="container">
          <AddProductForm categories={categories} />
        </div>
      </section>
    </>
  );
}
