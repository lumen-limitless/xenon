import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
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
      <Hero />
      <ProductGrid products={products} />
    </>
  )
}
