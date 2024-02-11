import { DataTable } from '@/components/DataTable';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { prisma } from '@/lib/prisma';
import { OrderWithItemsAndProducts } from '@/types';
import { Filter } from 'lucide-react';
import { columns } from './columns';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata = {
  title: 'Order Fulfillment',
};

async function getOrders(): Promise<Array<OrderWithItemsAndProducts>> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page({}: PageProps) {
  const orders = await getOrders();

  return (
    <>
      <section className="pb-48 pt-10">
        <div className="container">
          <h1>Order Fulfillment</h1>
          <div className="flex w-full items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Filter className="h-5 w-5" />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>

          <DataTable columns={columns} data={orders} />
        </div>
      </section>
    </>
  );
}
