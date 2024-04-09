import { db } from '@/lib/drizzle';
import { client } from '@/sanity/lib/client';
import { type MetadataRoute } from 'next';
import { groq } from 'next-sanity';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsPromise = db.query.productTable.findMany({
    columns: {
      slug: true,
      updatedAt: true,
    },
  });

  const categoriesPromise = db.query.categoryTable.findMany({
    columns: {
      title: true,
      updatedAt: true,
    },
  });

  const articlesPromise: Promise<
    Array<{
      slug: {
        current: string;
      };
      updatedAt: Date;
    }>
  > = client.fetch(groq`*[_type == "article"]{slug, updatedAt}`);

  const [products, categories, articles] = await Promise.all([
    productsPromise,
    categoriesPromise,
    articlesPromise,
  ]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/account`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/account/orders`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/account/returns`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/account/settings`,
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

    ...articles.map((article) => ({
      url: `${baseUrl}/${article.slug.current}`,
      lastModified: article.updatedAt,
    })),
  ];
}
