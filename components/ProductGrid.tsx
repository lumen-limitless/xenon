import { Product } from '@prisma/client'
import ProductCard from './ProductCard'
import { Container } from './ui/container'
import { Section } from './ui/section'

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Section className="flex-col py-10">
      <Container>
        <h1 className="text-center text-3xl font-bold">Products</h1>

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
      </Container>
    </Section>
  )
}
