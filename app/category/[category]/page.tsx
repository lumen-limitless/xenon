import { ProductGrid } from '@/components/ProductGrid'
import { SearchParamPagination } from '@/components/SearchParamPagination'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { capitalize } from '@/lib/utils'
import { Product } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'

type PageProps = {
  params: { category: string }
  searchParams: Record<string, string | undefined>
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: capitalize(params?.category) || '',
  }
}

async function getCategoryProducts(category: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        categories: {
          some: {
            title: category,
          },
        },
      },
    })
    return products ?? []
  } catch (error) {
    console.error(error)
    return []
  }
}

const ITEMS_PER_PAGE = 12

export default async function Page({ params, searchParams }: PageProps) {
  const products = await getCategoryProducts(params.category)

  const currentPage = parseInt(searchParams['page'] || '1')
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <>
      <Section className="flex-grow flex-col py-20">
        <div className="container">
          <h1 className="mb-10 text-center text-3xl">
            {capitalize(params.category)} Products
          </h1>

          <ProductGrid products={currentProducts} />
        </div>

        <div className="mt-auto">
          <SearchParamPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </Section>
    </>
  )
}
