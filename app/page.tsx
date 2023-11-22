import { HeroCarousel } from '@/components/HeroCarousel'
import { ProductScroller } from '@/components/ProductScroller'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { sanity } from '@/lib/sanity'
import { capitalize, shuffle } from '@/lib/utils'
import carousel1IMG from '@/public/img/carousel-1.webp'
import { urlForImage } from '@/sanity/lib/image'
import { Category, Product } from '@prisma/client'
import { groq } from 'next-sanity'
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

async function getHeroContent(): Promise<
  Array<{
    title: string
    subtitle: string
    link: string
    image: string
  }>
> {
  try {
    const content = (
      await sanity.fetch(groq`*[_type == "hero"]{
    title,
    subtitle,
    link,
    image
  }`)
    ).map((item: any) => ({
      title: item.title,
      subtitle: item.subtitle,
      link: item.link,
      image: urlForImage(item.image).url(),
    }))

    console.log(content)
    return content
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
  const [products, categories, heroContent] = await Promise.all([
    getProducts(),
    getCategories(),
    getHeroContent(),
  ])

  return (
    <>
      <Section className={'h-[25rem] md:mx-0 md:pt-10'}>
        <div className="w-full md:container">
          <HeroCarousel content={heroContent} />
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

                <h2 className="mt-2 text-lg">
                  {capitalize(category.description)}
                </h2>
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
