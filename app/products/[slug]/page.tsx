import { AddToCartButton } from '@/components/AddToCartButton'
import { Badge } from '@/components/ui/badge'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import { type Metadata, type ResolvingMetadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type PageProps = {
  params: { slug: string }
  searchParams: Record<string, string | Array<string> | undefined>
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
    })
    return product
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product?.title || '',
    openGraph: {
      images: [product?.images[0] || ''],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const product = await getProduct(params.slug)

  if (product === null) notFound()

  return (
    <Section className="py-20">
      <div className="container flex flex-col gap-20 lg:flex-row">
        <div
          className="flex h-full flex-1 flex-col items-center justify-center"
          id="product-images"
        >
          <Image
            className="h-auto w-auto"
            src={product.images[0]}
            alt={product.title}
            width={200}
            height={200}
            priority
            quality={100}
          />
        </div>

        <div className="flex-1 space-y-5" id="product-details">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-1">
            <Badge className="text-lg">{formatPrice(product.price)}</Badge>
            <Badge
              variant={product.stock > 0 ? 'outline' : 'destructive'}
              className={'text-lg'}
            >
              {product.stock > 0 ? 'In Stock' : 'Sold Out'}
            </Badge>
          </div>

          <p className="prose break-words text-xl">{product.description}</p>

          <div className="w-full">
            {product.stock > 0 && (
              <AddToCartButton className="w-full" product={product} />
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
