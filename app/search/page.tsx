import ProductGrid from '@/components/ProductGrid'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { Product } from '@prisma/client'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Search Results',
}

async function getProductsFromQuery(query: string): Promise<Array<Product>> {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query as string,
          mode: 'insensitive',
        },
      },
    })

    return products
  } catch (error) {
    console.error(error)
    return []
  }
}
export default async function Page({ searchParams }: PageProps) {
  const products = await getProductsFromQuery(searchParams['query'] as string)
  return (
    <>
      <Section id="search-results" className="py-10">
        <div className="container">
          {products.length === 0 ? (
            <p className="">No results found</p>
          ) : (
            <p className="">{products.length} results found</p>
          )}
          <ProductGrid products={products} />
        </div>
      </Section>
    </>
  )
}
