import ProductDetails from '@/components/ProductDetails'
import { prisma } from '@/lib/prisma'
import { Product } from '@prisma/client'

async function getProduct(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  })

  return product
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (product === null) {
    return <div>Product not found</div>
  }

  return <ProductDetails product={product} />
}
