'use client'
import { formatPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AddToCartButton } from './AddToCartButton'
import { Badge } from './ui/badge'

type ProductDetailsProps = {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center gap-20 lg:flex-row">
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
        <Badge className="text-lg">{formatPrice(product.price)}</Badge>
        <p className="prose break-words text-xl">{product.description}</p>

        <div className="w-full">
          <AddToCartButton className="w-full" product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
