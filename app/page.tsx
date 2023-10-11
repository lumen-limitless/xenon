import Carousel from '@/components/Carousel'
import ProductGrid from '@/components/ProductGrid'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import carousel1IMG from '@/public/carousel-1.webp'
import carousel2IMG from '@/public/carousel-2.webp'
import carousel3IMG from '@/public/carousel-3.webp'
import { Product } from '@prisma/client'
import Image from 'next/image'

async function getProducts(): Promise<Array<Product>> {
  try {
    const products = await prisma.product.findMany()
    return products
  } catch (err) {
    console.error(err)
    return []
  }
}

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export default async function Page({}: PageProps) {
  const products = await getProducts()

  return (
    <>
      <Section className={'h-[25rem] md:mx-0 md:pt-10'}>
        <div className="w-full md:container">
          <Carousel autoScroll>
            <Image
              src={carousel1IMG}
              alt="carousel-1"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
              priority
              placeholder="blur"
              className="object-cover object-center"
            />
            <Image
              src={carousel2IMG}
              alt="carousel-1"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
              priority
              placeholder="blur"
              className="object-cover object-center"
            />
            <Image
              src={carousel3IMG}
              alt="carousel-1"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
              priority
              placeholder="blur"
              className="object-cover object-center"
            />
          </Carousel>
        </div>
      </Section>
      {/* <Section className="py-10">
        <div className="mx-24 -mt-24 grid h-72 w-full grid-cols-12 bg-muted">
          <div className="col-span-3 bg-white p-6">
            <h2 className="text-2xl font-bold">Lorem ipsum dolor sit amet</h2>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatibus, dolorum, voluptatem, quos voluptate voluptatum
              voluptas quas quia quibusdam quod fugit. Quisquam voluptatibus,
              dolorum, voluptatem, quos voluptate voluptatum voluptas quas quia
              quibusdam quod fugit.
            </p>
          </div>
          <div className="col-span-9 bg-gray-200"></div>
        </div>
      </Section> */}

      <Section className="py-20">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-extrabold">
            Featured Products
          </h2>
          <ProductGrid products={products} />
        </div>
      </Section>
    </>
  )
}
