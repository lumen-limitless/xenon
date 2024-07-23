import type { Product } from '@/types';
import { ProductCard } from './product-card';

type ProductGridProps = {
  products?: Array<Product>;
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid w-full grid-cols-12 place-content-center gap-2">
      {products ? (
        products.map((product) => (
          <div
            className="col-span-6 md:col-span-4 lg:col-span-3"
            key={product.id}
          >
            <ProductCard product={product} className="h-full" />
          </div>
        ))
      ) : (
        <div className="col-span-12">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};
