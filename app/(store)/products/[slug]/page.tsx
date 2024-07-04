import { AddToCartButton } from '@/components/AddToCartButton';
import { ProductCarousel } from '@/components/ProductCarousel';
import { ProductDisplay } from '@/components/ProductDisplay';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/drizzle';
import { calculatePercentageDifference, formatDollars } from '@/lib/utils';
import { productTable, reviewTable } from '@/schema';
import { desc, eq, not } from 'drizzle-orm';
import { type Metadata, type ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type PageProps = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

const getProduct = cache(async (slug: string) => {
  try {
    const product = await db.query.productTable.findFirst({
      where: eq(productTable.slug, slug),

      with: {
        reviews: {
          orderBy: desc(reviewTable.createdAt),
          limit: 100,
        },
        variants: {
          with: {
            variantValues: {
              with: {
                attributeValue: {
                  with: {
                    attribute: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return product ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
});

const getSimilarProducts = cache(async (slug: string) => {
  try {
    const products = await db.query.productTable.findMany({
      where: not(eq(productTable.slug, slug)),

      limit: 10,
    });

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
});

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (product === null) return notFound();

  return {
    title: product.title,
    openGraph: {
      images: product.images ?? [],
      type: 'website',
    },
    description: product.shortDescription,
  };
}

export default async function Page({ params }: PageProps) {
  const [product, similarProducts] = await Promise.all([
    getProduct(params.slug),
    getSimilarProducts(params.slug),
  ]);

  if (product === null) notFound();

  return (
    <>
      <section className="py-20">
        <div className="container flex flex-col gap-20 lg:flex-row">
          <ProductDisplay product={product} />

          <div className="flex-1 space-y-5" id="product-details">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <h2 className="text-sm text-muted-foreground">
              Item No. {product.sku}
            </h2>
            <div className="flex items-center gap-1">
              {product.salePrice ? (
                <Badge className="text-lg">
                  {formatDollars(product.salePrice)}
                </Badge>
              ) : (
                <Badge className="text-lg">
                  {formatDollars(product.regularPrice)}
                </Badge>
              )}
              {Boolean(product.salePrice) && (
                <Badge variant="secondary" className="text-lg">
                  {calculatePercentageDifference(
                    product.regularPrice,
                    product.salePrice!,
                  )}
                  % OFF
                </Badge>
              )}
              <Badge
                variant={
                  product.stock === null || product.stock > 0
                    ? 'outline'
                    : 'destructive'
                }
                className={'text-lg'}
              >
                {product.stock === null || product.stock > 0
                  ? 'In Stock'
                  : 'Sold Out'}
              </Badge>
            </div>
            <p className="prose break-words text-xl">
              {product.productDescription}
            </p>

            {Boolean(product.note) && (
              <p className="prose break-words text-sm text-muted-foreground">
                Note: {product.note}
              </p>
            )}

            <div className="flex gap-5">
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  <h3 className="text-lg font-bold">{variant.id}</h3>
                  <div className="flex gap-5">
                    {variant.variantValues.map((value) => (
                      <div key={value.id}>
                        <h4 className="text-lg font-bold">
                          {value.attributeValue?.attribute?.attributeName}
                        </h4>
                        <p className="text-lg">
                          {value.attributeValue?.attribute?.attributeName}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 w-full bg-background p-5 md:relative">
              {product.stock === null ||
                (product.stock > 0 && (
                  <AddToCartButton
                    className="mx-auto w-full"
                    product={product}
                    size={'lg'}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20" id="reviews">
        <div className="container">{product.reviews.length > 0 && <></>}</div>
      </section>
      <section className="pb-48 pt-10">
        <div className="container">
          <ProductCarousel
            products={similarProducts}
            title="Similar Products"
          />
        </div>
      </section>
    </>
  );
}
