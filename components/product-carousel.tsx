import type { Product } from '@/types';
import { ProductCard } from './product-card';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

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
    <>
      {title ? <h2 className="mb-5 text-3xl font-semibold">{title}</h2> : null}

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
      </Carousel>
    </>
  );
};
