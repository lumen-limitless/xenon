import { ProductCarousel } from '@/components/product-carousel';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/drizzle';
import { productTable, reviewTable } from '@/schema';
import { desc, eq, not } from 'drizzle-orm';
import { type Metadata, type ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { ProductDetails } from './product-details';
import { ProductDisplay } from './product-display';
import { ProductReviews } from './product-reviews';

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
      images: product.images?.[0],
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
          <ProductDisplay product={product} className="lg:sticky lg:top-20" />
          <ProductDetails product={product} />
        </div>
      </section>
      <Separator />
      <section className="py-10" id="reviews">
        <div className="container">
          {product.reviews.length > 0 ? (
            <ProductReviews reviews={product.reviews} />
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </section>
      <Separator />
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
