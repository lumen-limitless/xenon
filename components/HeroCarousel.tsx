import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from './Carousel'

type HeroCarouselProps = {
  content?: Array<{
    title: string
    link: string
    image: string
  }>
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ content }) => {
  if (content === undefined) return null

  return (
    <Carousel autoScroll>
      {content?.map((item) => (
        <Link key={item.title} href={item.link}>
          <div className="relative h-full w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
              priority
              className="object-cover object-center md:rounded-md"
            />
          </div>
        </Link>
      ))}
    </Carousel>
  )
}
