import { auth } from '@/auth';
import { db } from '@/lib/drizzle';
import { orderTable } from '@/schema';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

const getOrder = cache(async (id: string) => {
  try {
    const order = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, id),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    });

    return order ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export async function generateMetadata({ params }: PageProps) {
  const order = await getOrder(params.id);

  if (order === null) notFound();

  return {
    title: `Order ${order.id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const session = await auth();

  if (session === null) redirect('/login');

  const order = await getOrder(params.id);

  if (order === null) notFound();

  if (order.userId !== session.user.id) notFound();

  return (
    <>
      <section className="flex">
        <div className="container">
          <h1 className="text-3xl font-bold">Order {order.id}</h1>
          <p className="text-xl text-gray-500">{order.items.length} items</p>
        </div>
      </section>
    </>
  );
}
