'use client';

import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useLockBodyScroll } from 'react-use';

type ProductDisplayProps = {
  product?: Product;
  className?: string;
};

export const ProductDisplay: React.FC<ProductDisplayProps> = ({
  product,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  useLockBodyScroll(zoomed);
  const controls = useAnimation();

  if (product === undefined) return null;

  const handleSwipe = (direction: number) => {
    const newIndex =
      (selectedImage + direction + product.images!.length) %
      product.images!.length;
    setSelectedImage(newIndex);
  };

  return (
    <>
      <div
        className={cn(
          'flex h-full flex-1 flex-col items-center gap-5',
          className,
        )}
        id="product-display"
        data-testid="product-display"
      >
        <motion.div
          className="relative h-[400px] w-[400px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x;

            if (swipe < -50) {
              handleSwipe(1);
            } else if (swipe > 50) {
              handleSwipe(-1);
            }
          }}
        >
          <Image
            src={product.images?.[selectedImage] ?? '/img/placeholder.webp'}
            alt={product.title}
            fill
            priority
            quality={100}
            className="cursor-zoom-in object-contain"
            onClick={() => setZoomed(true)}
          />
        </motion.div>

        <div
          className="flex w-full items-center justify-start gap-2"
          id="other-images"
        >
          {product.images?.map((image, i) => (
            <div
              className={cn(
                'group relative h-16 w-16 cursor-pointer overflow-clip rounded-md border transition-all duration-300 ease-in-out',
                selectedImage === i && 'ring ring-blue-500',
              )}
              key={i}
              onClick={() => setSelectedImage(i)}
              onMouseOver={() => setSelectedImage(i)}
            >
              <Image
                className="object-contain"
                src={image}
                alt={product.title}
                fill
              />
            </div>
          ))}
        </div>
      </div>
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-lg"
          onClick={() => setZoomed(false)}
        >
          <div className="relative h-[800px] w-[800px]">
            <Image
              src={product.images?.[selectedImage] ?? '/img/placeholder.webp'}
              alt={product.title}
              fill
              priority
              quality={100}
              className="cursor-zoom-out object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
