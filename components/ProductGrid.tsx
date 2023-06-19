import { Product } from '@/lib/types'
import ProductCard from './ProductCard'
import { Section } from './ui/section'

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Section className="flex-col py-20">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="container mt-5 grid w-full grid-cols-12 gap-5">
        {products?.map((product) => (
          <div
            className="col-span-12 flex justify-center sm:col-span-6 lg:col-span-3"
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Section>
  )
}
