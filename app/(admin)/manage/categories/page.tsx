import { db } from '@/lib/drizzle';

type PageProps = {
  params: {};
  searchParams: Record<string, string | Array<string> | undefined>;
};

export const metadata = {
  title: 'Manage Categories',
};

async function getCategories() {
  try {
    const categories = await db.query.categoryTable.findMany({
      with: {
        productsToCategories: {
          with: {
            product: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page({}: PageProps) {
  const categories = await getCategories();

  return (
    <>
      <section title="Manage Categories">
        <p>Manage Categories</p>
      </section>
    </>
  );
}
