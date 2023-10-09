import ProductGrid from '@/components/ProductGrid'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { Product } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'

type PageProps = {
  params: { category: string }
  searchParams: Record<string, string | Array<string> | undefined>
}

async function getCategoryProducts(category: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany()
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
    title: params?.category || '',
  }
}

export default async function Page({ params }: PageProps) {
  const products = await getCategoryProducts(params.category)
  console.log(products)
  return (
    <>
      <Section className="py-20">
        <div className="container">
          <h1 className="mb-5 text-center text-3xl">{params.category}</h1>

          <ProductGrid products={products} />
        </div>
      </Section>
    </>
  )
}
