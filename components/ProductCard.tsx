import { formatPrice, truncateText } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from './AddToCartButton'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'

type ProductCardProps = {
  product?: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  if (!product) return null

  return (
    <Card className="h-full">
      <CardContent>
        {' '}
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-32 md:h-64">
            <Image
              className="h-auto w-auto object-contain object-center"
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw"
            />
          </div>
        </Link>
      </CardContent>

      <CardFooter className="flex-col gap-1">
        <h2 className="text-left text-sm md:text-base">
          {truncateText(product.title, 50)}
        </h2>
        <Badge className="mr-auto">{formatPrice(product.price)}</Badge>
        {product.stock > 0 ? (
          <AddToCartButton className="w-full" product={product} />
        ) : (
          <Button variant={'secondary'} className="w-full" disabled>
            Out of Stock
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
