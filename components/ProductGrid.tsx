import { Product } from '@prisma/client'
import { ProductCard } from './ProductCard'

type ProductGridProps = {
  products?: Product[]
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid w-full grid-cols-12 place-content-center gap-1">
      {products ? (
        products.map((product) => (
          <div
            className="col-span-6 md:col-span-4 lg:col-span-3"
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
  )
}
