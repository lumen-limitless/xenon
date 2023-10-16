import { Carousel } from '@/components/Carousel'
import { ProductGrid } from '@/components/ProductGrid'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { capitalize } from '@/lib/utils'
import carousel1IMG from '@/public/carousel-1.webp'
import carousel2IMG from '@/public/carousel-2.webp'
import carousel3IMG from '@/public/carousel-3.webp'
import { Category, Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

async function getProducts(): Promise<Array<Product>> {
  try {
    const products = await prisma.product.findMany()
    return products
  } catch (err) {
    console.error(err)
    return []
  }
}

async function getCategories(): Promise<Array<Category>> {
  try {
    const categories = await prisma.category.findMany()
    return categories
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
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <>
      <Section className={'h-[25rem] md:mx-0 md:pt-10'}>
        <div className="w-full md:container">
          <Carousel autoScroll>
            <Image
              src={carousel1IMG}
              alt="carousel-1"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
              priority
              placeholder="blur"
              className="object-cover object-center"
            />
            <Image
              src={carousel2IMG}
              alt="carousel-1"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
              priority
              placeholder="blur"
              className="object-cover object-center"
            />
            <Image
              src={carousel3IMG}
              alt="carousel-1"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
              priority
              placeholder="blur"
              className="object-cover object-center"
            />
          </Carousel>
        </div>
      </Section>
      <Section className="py-10">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-semibold">
            Shop Categories
          </h2>
          <div className="grid w-full grid-cols-2 place-content-center gap-5">
            {categories.map((category) => (
              <Button
                asChild
                key={category.id}
                variant={'outline'}
                id={category.title}
                title={category.title}
                className="h-full w-full flex-col items-center justify-center"
              >
                <Link href={`/category/${category.title}`}>
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={category.image} />
                  </Avatar>
                  <h3 className="text-lg">{capitalize(category.title)}</h3>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-20">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-semibold">
            Featured Products
          </h2>
          <ProductGrid products={products} />
        </div>
      </Section>
    </>
  )
}
