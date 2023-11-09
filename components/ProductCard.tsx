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
  className?: string
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  if (!product) return null

  return (
    <Card className={className}>
      <CardContent>
        <Link href={`/products/${product.slug}`}>
          <Image
            className="h-32 w-full object-contain object-center"
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw"
          />
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
