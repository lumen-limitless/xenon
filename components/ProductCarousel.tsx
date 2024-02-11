import { Product } from '@prisma/client';
import { ProductCard } from './ProductCard';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

type ProductCarouselProps = {
  products?: Array<Product>;
  title?: string;
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
}) => {
  if (products === undefined || products?.length === 0) return null;

  return (
    <>
      {title ? <h2 className="mb-5 text-3xl font-semibold">{title}</h2> : null}

      <Carousel>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};
