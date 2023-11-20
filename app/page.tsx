import { Carousel } from '@/components/Carousel'
import { ProductScroller } from '@/components/ProductScroller'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { capitalize, shuffle } from '@/lib/utils'
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
                className="rounded-md object-cover object-center"
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
                className="rounded-md object-cover object-center"
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
                className="rounded-md object-cover object-center"
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
          <div className="grid w-full grid-cols-2 place-content-center gap-2 md:grid-cols-4">
            {categories.map((category) => (
              <Link href={`/category/${category.title}`} key={category.id}>
                <div className="relative h-36 w-full bg-muted transition-all duration-300 hover:brightness-90 md:h-48">
                  <Image
                    className="h-auto w-auto rounded-md object-cover object-center"
                    fill
                    src={carousel1IMG}
                    alt={category.title}
                  />
                </div>

                <h3 className="mt-2 text-xl font-semibold">
                  {capitalize(category.description)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-muted py-10" id="shop-featured">
        <div className="container">
          <h2 className="mb-5 text-3xl font-semibold">Featured Products</h2>
          <div className="grid grid-cols-2 place-content-center gap-2">
            {shuffle(products)
              .slice(0, 4)
              .map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  className="group flex h-72 flex-col items-center justify-center gap-5 rounded-md bg-background p-1"
                >
                  <Image
                    className="h-auto w-auto transition-all duration-300 ease-in-out group-hover:scale-105"
                    src={product.images[0]}
                    width={100}
                    height={100}
                    alt={product.title}
                    key={product.id}
                  />
                </Link>
              ))}
          </div>
        </div>
      </Section>

      <Section className="py-10" id="shop-trending">
        <div className="container">
          <ProductScroller products={products} title="Trending Now" />
        </div>
      </Section>

      <Section className="py-10" id="shop-recommended">
        <div className="container">
          <ProductScroller products={products} title="Recommended for You" />
        </div>
      </Section>
    </>
  )
}
