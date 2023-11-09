'use client'
import { cn } from '@/lib/utils'
import { Product } from '@prisma/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { useScroll } from 'react-use'
import { ProductCard } from './ProductCard'
import { Button } from './ui/button'

type ProductSliderProps = {
  products?: Array<Product>
  scrollDistance?: number
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  scrollDistance = 500,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const { x, y } = useScroll(sliderRef)

  return (
    <div className="relative w-full">
      <div
        className="flex h-full w-full gap-2 overflow-y-hidden overflow-x-scroll scroll-smooth py-5 scrollbar-hide"
        ref={sliderRef}
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
          'absolute left-2 top-1/2 -translate-y-1/2',
          x > 0 ? '' : 'hidden',
        )}
        size={'icon'}
        variant={'secondary'}
        onClick={() => {
          if (!sliderRef.current) return
          sliderRef.current.scrollLeft -= scrollDistance
        }}
      >
        <ChevronLeft />
      </Button>
      <Button
        id="scroll-right"
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2',
          x + sliderRef.current?.offsetWidth! >= sliderRef.current?.scrollWidth!
            ? 'hidden'
            : '',
        )}
        size={'icon'}
        variant={'secondary'}
        onClick={() => {
          if (!sliderRef.current) return
          sliderRef.current.scrollLeft += scrollDistance
        }}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
