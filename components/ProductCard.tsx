'use client'

import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import { useToast } from './ui/use-toast'

type ProductCardProps = {
  product?: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore()
  const { toast } = useToast()
  const router = useRouter()

  if (!product) return null

  return (
    <Card className="flex w-full flex-col">
      <CardContent className="flex-grow">
        <div className="relative h-48">
          <Image
            className="object-contain object-center"
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

        <Button
          className="w-full"
          onClick={() => {
            addItem(product)
            toast({
              title: 'Added to cart',
              description: `${product.title} was added to your cart.`,
              action: (
                <Button
                  className="w-32 whitespace-nowrap"
                  onClick={() => {
                    router.push('/cart')
                  }}
                >
                  View Cart
                </Button>
              ),
            })
          }}
        >
          Add to cart
        </Button>
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
