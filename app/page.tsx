import { Carousel } from '@/components/Carousel'
import { ProductSlider } from '@/components/ProductSlider'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { capitalize, shuffle, truncateText } from '@/lib/utils'
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
            <Link className="h-full w-full" href="">
              <Image
                src={carousel1IMG}
                alt="carousel-1"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
                priority
                placeholder="blur"
                className="object-cover object-center"
              />
              <h2 className="absolute bottom-5 left-5 text-3xl font-bold text-white">
                Shop All Categories
              </h2>
            </Link>

            <Link className="h-full w-full" href="/category/electronics">
              <Image
                src={carousel2IMG}
                alt="carousel-1"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
                priority
                placeholder="blur"
                className="object-cover object-center"
              />
              <h2 className="absolute bottom-5 left-5 text-3xl font-bold text-white ">
                Shop Electronics
              </h2>
            </Link>

            <Link className="h-full w-full" href="/category/clothing">
              <Image
                src={carousel3IMG}
                alt="carousel-1"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
                priority
                placeholder="blur"
                className="object-cover object-center"
              />
              <h2 className="absolute bottom-5 left-5 text-3xl font-bold text-white ">
                Shop Clothing
              </h2>
            </Link>
          </Carousel>
        </div>
      </Section>
      <Section className="py-10" id="shop-categories">
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

      <Section className="py-10" id="shop-featured">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-semibold">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 place-content-stretch gap-5">
            {shuffle(products)
              .slice(0, 4)
              .map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  className="flex h-72 flex-col items-center justify-center gap-5 bg-muted p-1"
                >
                  <Image
                    className="h-auto w-auto"
                    src={product.image}
                    width={100}
                    height={100}
                    alt={product.title}
                  />
                  <h3 className="text-lg">
                    {capitalize(truncateText(product.title, 50))}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </Section>

      <Section className="py-20" id="shop-trending">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-semibold">
            Trending Now
          </h2>
          <ProductSlider products={shuffle(products)} />
        </div>
      </Section>

      <Section className="py-20" id="shop-recommended">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-semibold">
            Recommended For You
          </h2>
          <ProductSlider products={shuffle(products)} />
        </div>
      </Section>
    </>
  )
}
