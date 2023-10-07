import ProductDetails from '@/components/ProductDetails'
import { prisma } from '@/lib/prisma'
import { Product } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type PageProps = {
  params: { id: string }
  searchParams: Record<string, string | Array<string> | undefined>
}

async function getProduct(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  })

  return product
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product?.title,
    openGraph: {
      images: [product?.image || ''],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const product = await getProduct(params.id)

  if (product === null) notFound()

  return <ProductDetails product={product} />
}
