'use client'
import { cn } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'
import { useBoolean } from 'react-use'
import { Carousel } from './Carousel'

type BannerProps = {}

export const Banner: React.FC<BannerProps> = ({}) => {
  const [hidden, toggle] = useBoolean(false)
  return (
    <div
      className={cn(
        'relative w-full items-center justify-center bg-foreground px-5 py-2 text-background backdrop-blur',
        hidden ? 'hidden' : 'flex',
      )}
    >
      <Carousel autoScroll>
        <p>This is an example ecommerce web application</p>
        <p>It is built using Next.js, TailwindCSS, and TypeScript</p>
      </Carousel>

      <a className="hidden items-center gap-1 md:flex" href="tel:111-123-4567">
        <MessageSquare className="h-6 stroke-background" />
        <p className="whitespace-nowrap">Chat or Call (111) 123-4567</p>
      </a>
    </div>
  )
}
