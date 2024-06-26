import { productTable } from '@/schema';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products?: Array<typeof productTable.$inferSelect>;
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
