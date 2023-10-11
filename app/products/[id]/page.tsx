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
  params: { id: string }
  searchParams: Record<string, string | Array<string> | undefined>
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
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
  const product = await getProduct(params.id)

  return {
    title: product?.title || '',
    openGraph: {
      images: [product?.image || ''],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const product = await getProduct(params.id)

  if (product === null) notFound()

  return (
    <Section className="py-20">
      <div className="container flex flex-col items-center justify-center gap-20 lg:flex-row">
        <div className="flex h-full flex-1 items-center justify-center">
          <Image
            className="h-auto w-auto"
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            priority
            quality={100}
          />
        </div>
        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-bold">Product {product.title}</h1>

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
