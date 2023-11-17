'use client'
import { cn } from '@/lib/utils'
import { Product } from '@prisma/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { useScroll } from 'react-use'
import { ProductCard } from './ProductCard'
import { Button } from './ui/button'

type ProductScrollerProps = {
  products?: Array<Product>
  title?: string
}

export const ProductScroller: React.FC<ProductScrollerProps> = ({
  products,
  title,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { x } = useScroll(scrollerRef)

  if (products?.length === 0) return null

  return (
    <>
      {title ? (
        <h2 className="mb-5 text-center text-3xl font-semibold">{title}</h2>
      ) : null}

      <div className="relative w-full" data-testid="product-scroller">
        <div
          className="flex h-full w-full gap-2 overflow-y-hidden overflow-x-scroll scroll-smooth py-5 scrollbar-hide"
          ref={scrollerRef}
        >
          {products?.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} className="h-full w-48 md:w-64" />
            </div>
          ))}
        </div>
        <Button
          id="scroll-left"
          className={cn(
            'absolute left-2 top-1/2 hidden -translate-y-1/2 md:inline-flex',
            x > 0 ? '' : 'pointer-events-none opacity-0',
          )}
          size={'icon'}
          variant={'secondary'}
          onClick={() => {
            if (!scrollerRef.current) return
            scrollerRef.current.scrollLeft -= scrollerRef.current.offsetWidth
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          id="scroll-right"
          className={cn(
            'absolute right-2 top-1/2 hidden -translate-y-1/2 md:inline-flex',
            x + scrollerRef.current?.offsetWidth! >=
              scrollerRef.current?.scrollWidth!
              ? 'pointer-events-none opacity-0'
              : '',
          )}
          size={'icon'}
          variant={'secondary'}
          onClick={() => {
            if (!scrollerRef.current) return
            scrollerRef.current.scrollLeft += scrollerRef.current.offsetWidth
          }}
        >
          <ChevronRight />
        </Button>
      </div>
    </>
  )
}
