import Carousel from '@/components/Carousel'
import ProductGrid from '@/components/ProductGrid'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import carousel1IMG from '@/public/carousel-1.png'
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
      <Section className="h-[60vh] bg-muted">
        <Carousel slides={[carousel1IMG, carousel1IMG, carousel1IMG]} />
      </Section>
      <ProductGrid products={products} />
    </>
  )
}
