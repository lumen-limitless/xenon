import { cn, formatDollars } from '@/lib/utils';
import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from './AddToCartButton';
import { Button } from './ui/button';

type ProductCardProps = {
  product?: Product;
  className?: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  if (!product) return null;

  return (
    <div
      className={cn('flex h-full flex-col', className)}
      id={product.id}
      data-testid={'product-card'}
    >
      <Link href={`/products/${product.slug}`} className="rounded-md bg-muted">
        <Image
          className="h-32 w-full object-contain object-center"
          src={product.images[0]}
          alt={product.title}
          width={100}
          height={100}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw"
        />
      </Link>
      <h2 className="truncate text-left text-sm md:text-base">
        {product.title}
      </h2>
      <p className="mr-auto">{formatDollars(product.price)}</p>

      <div className="mt-auto">
        {product.stock > 0 ? (
          <AddToCartButton className="w-full" product={product} />
        ) : (
          <Button variant={'secondary'} className="w-full" disabled>
            Out of Stock
          </Button>
        )}
      </div>
    </div>
  );
};
