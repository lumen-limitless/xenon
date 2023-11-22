import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from './Carousel'

type HeroCarouselProps = {
  content?: Array<{
    title: string
    subtitle: string
    link: string
    image: string
  }>
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ content }) => {
  return (
    <>
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
              <div className="absolute bottom-10 left-5">
                <h2 className="text-3xl font-bold text-white ">{item.title}</h2>
                <p className="text-lg text-muted">{item.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </>
  )
}
