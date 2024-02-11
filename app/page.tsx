import { ProductCarousel } from '@/components/ProductCarousel';
import { Slideshow } from '@/components/Slideshow';
import { prisma } from '@/lib/prisma';
import { capitalize, shuffle } from '@/lib/utils';
import { client as sanity } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { Product } from '@prisma/client';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';

const getProducts = cache(async () => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        images: true,
        stock: true,
        price: true,
      },
    });
    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
});

const getCategories = cache(async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
    return categories;
  } catch (err) {
    console.error(err);
    return [];
  }
});

async function getHeroContent(): Promise<
  Array<{
    title: string;
    link: string;
    image: string;
  }>
> {
  try {
    const content = (
      await sanity.fetch(groq`*[_type == "hero"]{
    title,
    link,
    image
  }`)
    ).map((item: any) => ({
      title: item.title,
      subtitle: item.subtitle,
      link: item.link,
      image: urlForImage(item.image).url(),
    }));

    console.log(content);
    return content;
  } catch (err) {
    console.error(err);
    return [];
  }
}

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Page({}: PageProps) {
  const [products, categories, heroContent] = await Promise.all([
    getProducts(),
    getCategories(),
    getHeroContent(),
  ]);

  return (
    <>
      <section className={'flex h-[25rem] md:mx-0 md:pt-10'}>
        <div className="w-full md:container">
          <Slideshow autoScroll>
            {heroContent?.map((item) => (
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
          </Slideshow>
        </div>
      </section>

      <section className="py-10" id="shop-categories">
        <div className="container">
          <div className="grid w-full grid-cols-2 place-content-center gap-2 md:grid-cols-4">
            {categories.map((category) => (
              <Link href={`/category/${category.title}`} key={category.id}>
                <div className="relative h-32 w-full bg-muted transition-all duration-300 hover:brightness-90 md:h-36">
                  <Image
                    className="h-auto w-auto rounded-md object-cover object-center"
                    fill
                    src="/img/placeholder.webp"
                    alt={category.title}
                  />
                </div>

                <h2 className="mt-1 text-lg">{capitalize(category.title)}</h2>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-10" id="shop-featured">
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
      </section>

      <section className="py-10" id="shop-trending">
        <div className="container">
          <ProductCarousel
            products={products as Product[]}
            title="Trending Products"
          />
        </div>
      </section>

      <section className="py-10" id="shop-recommended">
        <div className="container">
          <ProductCarousel
            products={products as Product[]}
            title="Recommended for You"
          />
        </div>
      </section>
    </>
  );
}
