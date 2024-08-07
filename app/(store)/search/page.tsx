import { ProductGrid } from '@/components/product-grid';
import { SearchParamPagination } from '@/components/search-param-pagination';
import { db } from '@/lib/drizzle';
import { productTable } from '@/schema';
import { sql } from 'drizzle-orm';

type PageProps = {
  params: {};
  searchParams: Record<string, string | undefined>;
};

export const metadata = {
  title: 'Search Results',
};

async function getProductsFromQuery(
  query: string | undefined,
): Promise<Array<typeof productTable.$inferSelect>> {
  try {
    if (query === undefined) return [];
    const products = await db.query.productTable.findMany({
      where: sql`to_tsvector('simple', ${productTable.title}) @@ to_tsquery('simple', ${query})`,
    });

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ITEMS_PER_PAGE = 12;

export default async function Page({ searchParams }: PageProps) {
  const products = await getProductsFromQuery(searchParams['q']);

  const currentPage = parseInt(searchParams['page'] || '1');
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <section id="search-results" className="flex-grow flex-col py-10">
        <div className="container flex h-full flex-grow flex-col">
          <div className="mb-1">
            {products.length === 0 ? (
              <p>No results found</p>
            ) : (
              <p>
                {products.length} result{products.length > 1 ? 's' : null} found
              </p>
            )}
          </div>

          <ProductGrid products={currentProducts} />
        </div>
        <div className="py-10">
          <SearchParamPagination totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
