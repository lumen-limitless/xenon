import { ProductGrid } from '@/components/ProductGrid'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { capitalize } from '@/lib/utils'
import { Product } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'

type PageProps = {
  params: { category: string }
  searchParams: Record<string, string | Array<string> | undefined>
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

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: capitalize(params?.category) || '',
  }
}

export default async function Page({ params }: PageProps) {
  const products = await getCategoryProducts(params.category)
  return (
    <>
      <Section className="py-20">
        <div className="container">
          <h1 className="mb-10 text-center text-3xl">
            {capitalize(params.category)} Products
          </h1>

          <ProductGrid products={products} />
        </div>
      </Section>
    </>
  )
}
