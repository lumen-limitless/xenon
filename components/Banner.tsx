'use client'
import { cn } from '@/lib/utils'
import { useBoolean } from 'react-use'
import { Carousel } from './Carousel'

type BannerProps = {}

export const Banner: React.FC<BannerProps> = ({}) => {
  const [hidden, toggle] = useBoolean(false)
  return (
    <div
      className={cn(
        'relative w-full items-center justify-center bg-gradient-to-r from-purple-800 via-blue-800 to-purple-800 px-5 py-2 text-white backdrop-blur',
        hidden ? 'hidden' : 'flex',
      )}
    >
      <Carousel autoScroll>
        <p>This is an example ecommerce web application</p>
        <p>It is built using Next.js, TailwindCSS, and TypeScript</p>
      </Carousel>

      <button className="ml-4" onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
