import type { Product } from '@/types';
import { ProductCard } from './product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

type ProductCarouselProps = {
  products?: Array<Product>;
  title?: string;
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
}) => {
  if (!products) return null;

  return (
    <div className="flex flex-col">
      {title ? <h2 className="mb-5 text-3xl font-semibold">{title}</h2> : null}

      <div className="relative">
        <Carousel>
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:flex" />
          <CarouselNext className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:flex" />
        </Carousel>
      </div>
    </div>
  );
};
