'use client'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

type ProductDetailsProps = {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addItem } = useCartStore()
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
          <Button
            className="w-full"
            onClick={() => {
              addItem(product)
              toast({
                title: 'Added to bag',
                description: `${product.title} was added to your shopping bag`,
                action: (
                  <Button
                    className="w-32 whitespace-nowrap"
                    onClick={() => {
                      router.push('/cart')
                    }}
                  >
                    View Bag
                  </Button>
                ),
              })
            }}
          >
            Add to bag
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
