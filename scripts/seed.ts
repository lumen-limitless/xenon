import * as schema from '@/schema';
import { Category } from '@/types';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

type MockProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  price: number;
};

const categories: Array<typeof schema.categoryTable.$inferInsert> = [
  {
    title: 'all',
    slug: 'all',
    description: 'All products',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    title: 'electronics',
    slug: 'electronics',
    description: 'Electronic products',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    title: 'jewelery',
    slug: 'jewelery',
    description: 'Jewelery products',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    title: 'clothing',
    slug: 'clothing',
    description: 'Clothing products',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
];

// seed the database with products from the fakestoreapi
async function main() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error('POSTGRES_URL environment variable is required');
  }

  const pool = new Pool({
    connectionString,
  });

  const db = drizzle(pool, {
    schema,
  });

  const res = await fetch('https://fakestoreapi.com/products/');

  if (!res.ok) {
    throw new Error('Error fetching products');
  }

  const products: MockProduct[] = await res.json();

  await db.delete(schema.categoryTable);

  await db.insert(schema.categoryTable).values(categories as Array<Category>);

  await db.delete(schema.productTable);

  for (const product of products) {
    await db.insert(schema.productTable).values({
      title: product.title,
      sku: product.id.toString(),
      slug: product.title
        .toLowerCase()
        .split(' ')
        .map((word) => word.replace(/[^a-zA-Z0-9]/g, ''))
        .join('-'),
      shortDescription: product.description.slice(0, 100),
      productDescription: product.description,
      stock: Math.floor(Math.random() * 100),
      status: 'PUBLISHED',
      images: [product.image],
      price: parseInt((product.price * 100).toFixed(0)),
    });
  }
}

main()
  .then(() => {
    console.log('Database seeded');
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err);
    process.exit(1);
  });
