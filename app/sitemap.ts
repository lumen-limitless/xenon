import { prisma } from '@/lib/prisma'
import { type MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
    })),
  ]
}
