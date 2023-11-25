import { ProductWithReviews } from '@/@types'
import { AddToCartButton } from '@/components/AddToCartButton'
import { ProductDisplay } from '@/components/ProductDisplay'
import { ProductScroller } from '@/components/ProductScroller'
import { Badge } from '@/components/ui/badge'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { formatDollars } from '@/lib/utils'
import { Product } from '@prisma/client'
import { type Metadata, type ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type PageProps = {
  params: { slug: string }
  searchParams: Record<string, string | Array<string> | undefined>
}

async function getProduct(slug: string): Promise<ProductWithReviews | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        reviews: true,
      },
    })
    return product
  } catch (error) {
    console.error(error)
    return null
  }
}

async function getSimilarProducts(slug: string): Promise<Array<Product>> {
  try {
    const products = await prisma.product.findMany({
      where: {
        slug: {
          not: slug,
        },
      },

      take: 10,
    })
    return products
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const product = await getProduct(params.slug)

  if (product === null) return notFound()

  return {
    title: product.title,
    openGraph: {
      images: product.images,
      type: 'website',
    },
    description: product.description,
  }
}

export default async function Page({ params }: PageProps) {
  const [product, similarProducts] = await Promise.all([
    getProduct(params.slug),
    getSimilarProducts(params.slug),
  ])

  if (product === null) notFound()

  return (
    <>
      <Section className="py-20">
        <div className="container flex flex-col gap-20 lg:flex-row">
          <ProductDisplay product={product} />

          <div className="flex-1 space-y-5" id="product-details">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-1">
              <Badge className="text-lg">{formatDollars(product.price)}</Badge>
              <Badge
                variant={product.stock > 0 ? 'outline' : 'destructive'}
                className={'text-lg'}
              >
                {product.stock > 0 ? 'In Stock' : 'Sold Out'}
              </Badge>
            </div>
            <p className="prose break-words text-xl">{product.description}</p>
            <div className="sticky bottom-0 w-full bg-background p-5 md:relative">
              {product.stock > 0 && (
                <AddToCartButton
                  className="mx-auto w-full"
                  product={product}
                  size={'lg'}
                />
              )}
            </div>
          </div>
        </div>
      </Section>
      <Section className="py-20">
        <div className="container">{product.reviews.length > 0 && <></>}</div>
      </Section>
      <Section className="pb-48 pt-10">
        <div className="container">
          <ProductScroller
            title="Similar Products"
            products={similarProducts}
          />
        </div>
      </Section>
    </>
  )
}
