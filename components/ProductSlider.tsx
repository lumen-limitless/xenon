'use client'
import { Product } from '@prisma/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { ProductCard } from './ProductCard'
import { Button } from './ui/button'

type ProductSliderProps = {
  products?: Array<Product>
}

export const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full">
      <div
        className="flex h-full w-full gap-5 overflow-y-hidden overflow-x-scroll scroll-smooth py-5 scrollbar-hide"
        ref={sliderRef}
      >
        {products?.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} className="h-full w-48 md:w-64" />
          </div>
        ))}
      </div>
      <Button
        className="absolute left-2 top-1/2 -translate-y-1/2"
        size={'icon'}
        variant={'secondary'}
        onClick={() => {
          if (!sliderRef.current) return
          sliderRef.current.scrollLeft -= 500
        }}
      >
        <ChevronLeft />
      </Button>
      <Button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        size={'icon'}
        variant={'secondary'}
        onClick={() => {
          if (!sliderRef.current) return
          sliderRef.current.scrollLeft += 500
        }}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
