'use client';
import { calculatePercentageDifference, cn, formatDollars } from '@/lib/utils';
import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';

type ProductCardProps = {
  product?: Product;
  className?: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  if (!product) return null;

  const primaryImage = product.images?.[0] ?? '/img/placeholder.webp';

  return (
    <div
      className={cn('flex h-full flex-col', className)}
      id={product.id}
      data-testid={'product-card'}
    >
      <Link
        href={`/products/${product.slug}`}
        className="rounded-md bg-muted p-5"
      >
        <Image
          className="h-32 w-full object-contain object-center"
          src={primaryImage}
          alt={product.title}
          width={100}
          height={100}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw"
        />
      </Link>
      <h2 className="mt-2 truncate text-left text-sm md:text-base">
        {product.title}
      </h2>
      <div>
        {product.salePrice && (
          <Badge variant={'secondary'}>
            {calculatePercentageDifference(product.price, product.salePrice)}%
            OFF
          </Badge>
        )}
      </div>

      <div className="mt-2 flex gap-1">
        {product.salePrice && (
          <p className="font-semibold text-primary">
            {formatDollars(product.salePrice)}
          </p>
        )}
        <p
          className={cn(
            product.salePrice
              ? 'text-gray-500 line-through'
              : 'font-semibold text-primary',
          )}
        >
          {formatDollars(product.price)}
        </p>
      </div>

      {/* <div className="mt-auto">
        {product.stock === null || product.stock > 0 ? (
          <AddToCartButton className="w-full" product={product} />
        ) : (
          <Button variant={'secondary'} className="w-full" disabled>
            Out of Stock
          </Button>
        )}
      </div> */}
    </div>
  );
};
