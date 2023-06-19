import ProductDetails from '@/components/ProductDetails'
import { Section } from '@/components/ui/section'

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  const json = await res.json()
  return json
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  return (
    <Section>
      <ProductDetails product={product} />
    </Section>
  )
}
