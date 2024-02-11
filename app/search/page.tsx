import { ProductGrid } from '@/components/ProductGrid';
import { SearchParamPagination } from '@/components/SearchParamPagination';
import { prisma } from '@/lib/prisma';
import { Product } from '@prisma/client';

type PageProps = {
  params: {};
  searchParams: Record<string, string | undefined>;
};

export const metadata = {
  title: 'Search Results',
};

async function getProductsFromQuery(
  query: string | undefined,
): Promise<Array<Product>> {
  try {
    if (query === undefined) return [];
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query as string,
          mode: 'insensitive',
        },
      },
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
          {products.length === 0 ? (
            <p className="">No results found</p>
          ) : (
            <p className="">{products.length} results found</p>
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
