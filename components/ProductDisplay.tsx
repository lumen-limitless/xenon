'use client'

import { cn } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'

type ProductDisplayProps = {
  product?: Product
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (product === undefined) return null

  return (
    <>
      <div
        className="flex h-full flex-1 flex-col gap-10"
        id="product-display"
        data-testid="product-display"
      >
        <div
          className="flex h-96 w-full items-center justify-center overflow-clip"
          id="main-image"
        >
          <Image
            src={product.images[selectedImage]}
            alt={product.title}
            height={400}
            width={400}
            priority
            quality={100}
          />
        </div>

        <div
          className="flex w-full items-center justify-start gap-2"
          id="other-images"
        >
          {product.images.map((image, i) => (
            <div
              className={cn(
                'group relative h-16 w-16 cursor-pointer rounded-md border transition-all duration-300 ease-in-out hover:border-blue-500',
                selectedImage === i && 'border-2 border-blue-500',
              )}
              key={i}
              onClick={() => setSelectedImage(i)}
            >
              <Image
                className="relative h-auto w-auto object-contain object-center"
                src={image}
                alt={product.title}
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
