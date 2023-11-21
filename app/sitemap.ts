import { prisma } from '@/lib/prisma'
import { type MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsPromise = prisma.product.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const categoriesPromise = prisma.category.findMany({
    select: {
      title: true,
      updatedAt: true,
    },
  })

  const [products, categories] = await Promise.all([
    productsPromise,
    categoriesPromise,
  ])

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
    })),

    ...categories.map((category) => ({
      url: `${baseUrl}/categories/${category.title}`,
      lastModified: category.updatedAt,
    })),
  ]
}
