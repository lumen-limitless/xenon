import { ProductGrid } from '@/components/ProductGrid';
import { SearchParamPagination } from '@/components/SearchParamPagination';
import { db } from '@/lib/drizzle';
import { capitalize } from '@/lib/utils';
import { categoryTable, productToCategoryTable } from '@/schema';
import { eq } from 'drizzle-orm';
import _ from 'lodash';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type PageProps = {
  params: { categoryTitle: string };
  searchParams: Record<string, string | undefined>;
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: capitalize(params?.categoryTitle) + ' Products' || '',
  };
}

const getCategory = cache(async (categoryTitle: string) => {
  try {
    const category = await db.query.categoryTable.findFirst({
      where: eq(categoryTable.title, categoryTitle),
    });

    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
});

const getCategoryProducts = cache(async (categoryId: string) => {
  try {
    const products = await db.query.productToCategoryTable.findMany({
      where: eq(productToCategoryTable.categoryId, categoryId),
      with: {
        product: true,
      },
    });

    return _.flatMap(products, (p) => p.product);
  } catch (error) {
    console.error(error);
    return [];
  }
});

const ITEMS_PER_PAGE = 12;

export default async function Page({ params, searchParams }: PageProps) {
  const category = await getCategory(params.categoryTitle);

  if (!category) {
    return notFound();
  }

  const products = await getCategoryProducts(category.id);

  const currentPage = parseInt(searchParams['page'] || '1');

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <section className="flex flex-grow flex-col pb-48 pt-10">
        <div className="container">
          <h1 className="mb-5 text-center text-3xl">
            {capitalize(params.categoryTitle)} Products
          </h1>
          {products.length === 0 && (
            <p className="text-center">No products found.</p>
          )}
          <ProductGrid products={currentProducts} />
        </div>

        <div className="py-10">
          <SearchParamPagination totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
