import { Product } from '@prisma/client'
import ProductCard from './ProductCard'
import { Container } from './ui/container'
import { Section } from './ui/section'

type ProductGridProps = {
  products?: Product[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <Section className="flex-col py-10 md:flex-row">
      <Container>
        <div className="container mt-5 grid w-full grid-cols-12 gap-5">
          {products ? (
            products.map((product) => (
              <div
                className="col-span-12 flex place-content-center md:col-span-6 lg:col-span-3"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-12">
              <p>No products found.</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}

export default ProductGrid
