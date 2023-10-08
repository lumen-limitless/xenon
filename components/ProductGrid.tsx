import { Product } from '@prisma/client'
import ProductCard from './ProductCard'

type ProductGridProps = {
  products?: Product[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid w-full grid-cols-12 place-content-center gap-5">
      {products ? (
        products.map((product) => (
          <div
            className="col-span-12 flex md:col-span-6 lg:col-span-3"
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

export default ProductGrid
