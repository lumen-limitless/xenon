'use client';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { calculatePercentageDifference, formatDollars } from '@/lib/utils';
import { Product } from '@/types';
import { useMemo, useState } from 'react';
import { ProductDescription } from './product-description';

type ProductDetailsProps = {
  product: Product;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  const hasVariants = Boolean(product.variants);

  const attributes = useMemo(() => {
    const allAttributes: Record<string, Set<string>> = {};
    product.variants.forEach((variant) => {
      Object.entries(variant.attributes).forEach(([key, value]) => {
        if (!allAttributes[key]) allAttributes[key] = new Set();
        allAttributes[key].add(value);
      });
    });
    return Object.entries(allAttributes).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  }, [product.variants]);

  const availableVariants = useMemo(() => {
    return product.variants.filter((variant) =>
      Object.entries(selectedAttributes).every(
        ([key, value]) => variant.attributes[key] === value,
      ),
    );
  }, [product.variants, selectedAttributes]);

  const handleAttributeChange = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const selectedVariant =
    availableVariants.length === 1 ? availableVariants[0] : null;

  return (
    <>
      <div className="flex-1 space-y-5" id="product-details">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <div className="flex items-center gap-1">
          {Boolean(product.salePrice) && (
            <Badge variant="secondary" className="text-lg">
              {calculatePercentageDifference(product.price, product.salePrice!)}
              % OFF
            </Badge>
          )}
          <Badge
            variant={
              product.stock === null || product.stock > 0
                ? 'default'
                : 'destructive'
            }
            className={'text-lg'}
          >
            {product.stock === null || product.stock > 0
              ? 'In Stock'
              : 'Sold Out'}
          </Badge>
        </div>

        {Boolean(product.note) && (
          <p className="prose break-words text-sm text-muted-foreground">
            Note: {product.note}
          </p>
        )}

        <div className="flex gap-5">
          {attributes.map((attribute) => (
            <div key={attribute.name}>
              <h3 className="text-lg font-bold">{attribute.name}</h3>
              <ToggleGroup
                type="single"
                value={selectedAttributes[attribute.name]}
                onValueChange={(value) =>
                  handleAttributeChange(attribute.name, value)
                }
              >
                {attribute.values.map((value) => {
                  return (
                    <ToggleGroupItem key={value} value={value}>
                      {value}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </div>
          ))}
        </div>

        {selectedVariant ? (
          <span className="text-3xl font-semibold">
            {formatDollars(
              selectedVariant.customPrice ?? product.salePrice ?? product.price,
            )}
          </span>
        ) : product.salePrice ? (
          <span className="text-3xl font-semibold">
            {formatDollars(product.salePrice)}
          </span>
        ) : (
          <span className="text-3xl font-semibold">
            {formatDollars(product.price)}
          </span>
        )}
        <div className="sticky bottom-0 w-full bg-background p-5 md:relative lg:p-0">
          <AddToCartButton
            className="mx-auto w-full"
            product={product}
            variantId={!!selectedVariant ? selectedVariant.id : undefined}
            size={'lg'}
          />
        </div>

        <ProductDescription description={product?.productDescription || ''} />
      </div>
    </>
  );
};
