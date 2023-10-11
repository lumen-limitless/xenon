'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

type CarouselProps = {
  children?: React.ReactNode
  autoScroll?: boolean
  controls?: boolean
}

// The main component
export const Carousel: React.FC<CarouselProps> = ({ children, autoScroll }) => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const slides = React.Children.toArray(children)

  // Thresholds
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  // Swipe handlers
  const paginate = (newDirection: number) => {
    setCurrent(
      (current) => (current + newDirection + slides.length) % slides.length,
    )
    setDirection(newDirection)
  }

  useEffect(() => {
    if (!autoScroll) return
    const timer = setInterval(() => {
      paginate(1) // go to the next slide
    }, 8000)

    return () => {
      clearInterval(timer) // clear the interval when the component is unmounted
    }
  }, [current, direction, autoScroll]) // re-run the effect when the `current` or `direction` state changes

  return (
    <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.div
        className="relative h-full w-full"
        key={current}
        custom={direction}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: 'easeInOut',
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
        {React.Children.toArray(children)[current]}
        <div className="absolute bottom-0"></div>
      </motion.div>
    </AnimatePresence>
  )
}
