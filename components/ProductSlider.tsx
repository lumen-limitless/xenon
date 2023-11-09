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
}

export const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const { x } = useScroll(sliderRef)

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
          'absolute left-2 top-1/2 hidden -translate-y-1/2 md:inline-flex',
          x > 0 ? '' : 'pointer-events-none opacity-0',
        )}
        size={'icon'}
        variant={'secondary'}
        onClick={() => {
          if (!sliderRef.current) return
          sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth
        }}
      >
        <ChevronLeft />
      </Button>
      <Button
        id="scroll-right"
        className={cn(
          'absolute right-2 top-1/2 hidden -translate-y-1/2 md:inline-flex',
          x + sliderRef.current?.offsetWidth! >= sliderRef.current?.scrollWidth!
            ? 'pointer-events-none opacity-0'
            : '',
        )}
        size={'icon'}
        variant={'secondary'}
        onClick={() => {
          if (!sliderRef.current) return
          sliderRef.current.scrollLeft += sliderRef.current.offsetWidth
        }}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
