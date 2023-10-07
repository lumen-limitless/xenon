import Carousel from '@/components/Carousel'
import ProductGrid from '@/components/ProductGrid'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import carousel1IMG from '@/public/carousel-1.png'
import carousel2IMG from '@/public/carousel-2.jpeg'
import { Product } from '@prisma/client'

async function getProducts(): Promise<Array<Product>> {
  try {
    const products = await prisma.product.findMany()
    return products
  } catch (err) {
    console.error(err)
    return []
  }
}

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export default async function Page({}: PageProps) {
  const products = await getProducts()

  return (
    <>
      <Section className="h-[25rem] bg-muted">
        <Carousel slides={[carousel1IMG, carousel2IMG]} />
      </Section>
      <ProductGrid products={products} />
    </>
  )
}
