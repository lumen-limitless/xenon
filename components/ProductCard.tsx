'use client'

import useCartStore from '@/lib/store'
import { truncateText } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { useToast } from './ui/use-toast'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const { toast } = useToast()
  const router = useRouter()
  return (
    <>
      <Card className="flex w-80 flex-col">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-col gap-5">
            <Image
              className="mx-auto h-auto w-auto"
              src={product.image}
              alt={product.title}
              quality={100}
              height={100}
              width={100}
            />

            <p className="prose break-words">
              {truncateText(product.description, 200)}
            </p>
            <span className="font-semibold">${product.price}</span>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
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
    </>
  )
}
