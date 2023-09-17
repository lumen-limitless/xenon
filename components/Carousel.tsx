'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/lib/types'
import Image from 'next/image'
import ExampleIMG from '@/public/carousel-1.png'

const images = [ExampleIMG]
type CarouselProps = {
  products: Product[]
}
// The main component
const Carousel: React.FC<CarouselProps> = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  // Thresholds
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  // Swipe handlers
  const paginate = (newDirection: number) => {
    setCurrent(
      (current) => (current + newDirection + images.length) % images.length
    )
    setDirection(newDirection)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1) // go to the next slide
    }, 8000)

    return () => {
      clearInterval(timer) // clear the interval when the component is unmounted
    }
  }, [current, direction]) // re-run the effect when the `current` or `direction` state changes

  return (
    <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.div
        className="relative h-full w-full"
        key={current}
        custom={direction}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 12 }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          duration: 0.5,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x)

          if (swipe < -swipeConfidenceThreshold) {
            paginate(1)
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1)
          }
        }}
      >
        <Image
          src={images[current]}
          fill
          alt=""
          className="object-cover object-center"
          quality={100}
          placeholder="blur"
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default Carousel
