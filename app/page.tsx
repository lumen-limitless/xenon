import Carousel from '@/components/Carousel'
import ProductGrid from '@/components/ProductGrid'
import { Section } from '@/components/ui/section'
import { Product } from '@/lib/types'

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  const json = await res.json()
  return json as Product[]
}

export default async function Page() {
  const products = await getProducts()

  return (
    <>
      <Section className="h-[60vh] bg-muted">
        <Carousel products={products} />
      </Section>
      <ProductGrid products={products} />
    </>
  )
}
