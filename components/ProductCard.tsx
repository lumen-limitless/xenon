'use client'

import { formatPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AddToCartButton } from './AddToCartButton'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'

type ProductCardProps = {
  product?: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter()

  if (!product) return null

  return (
    <Card className="flex w-full flex-col">
      <CardContent className="flex-grow">
        <div className="relative h-48">
          <Image
            className="h-auto w-auto object-contain object-center"
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <h2 className="text-left">{product.title}</h2>
        <Badge className="mr-auto">{formatPrice(product.price)}</Badge>

        <AddToCartButton className="w-full" product={product} />
        <Button
          variant={'secondary'}
          className="w-full"
          onClick={() => {
            router.push(`/products/${product.id}`)
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
