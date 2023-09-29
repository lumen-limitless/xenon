'use client'
import useCartStore from '@/lib/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Container } from './ui/container'
import { Section } from './ui/section'
import { toast } from './ui/use-toast'
import { Product } from '@prisma/client'

type ProductDetailsProps = {
  product: Product
}

const ProductDetails:React.FC<ProductDetailsProps> = ({ product }) =>  {
  const { addItem } = useCartStore()
  const router = useRouter()

  return (
    <Section className="py-10">
      <Container className="container flex flex-col items-center gap-20 lg:flex-row">
        <div className="flex h-full flex-1 items-center justify-center">
          <Image
            className="h-auto w-auto"
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            priority
            quality={100}
          />
        </div>
        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-bold">Product {product.title}</h1>
          <p className="prose text-2xl">{product.description}</p>
          <p className="text-2xl font-bold">${product.price}</p>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={() => {
                addItem(product)
                toast({
                  title: 'Added to cart',
                  description: `${product.title} was added to your cart`,
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
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ProductDetails