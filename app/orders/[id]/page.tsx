import { prisma } from '@/lib/prisma';
import { OrderWithItemsAndProducts } from '@/types';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

const getOrder = cache(
  async (id: string): Promise<OrderWithItemsAndProducts | null> => {
    try {
      const order = await prisma.order.findUnique({
        where: {
          id,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
      return order;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
);

export async function generateMetadata({ params }: PageProps) {
  const order = await getOrder(params.id);

  if (order === null) notFound();

  return {
    title: `Order ${order.id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const order = await getOrder(params.id);

  if (order === null) notFound();

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
