import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { formatDollars } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata = {
  title: 'My Account',
};

const getOrdersForUser = cache(async (userId?: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
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
});

export default async function Page({}: PageProps) {
  const session = await auth();
  const orders = await getOrdersForUser(session?.user.id);

  return (
    <>
      <section id="orders" className="py-5">
        <div className="container">
          {orders.length === 0 && (
            <>
              <div className="flex w-full flex-wrap items-center justify-center gap-y-5 bg-muted p-5">
                <div>
                  <p>You have no orders yet.</p>
                </div>
              </div>
              <Button variant={'link'} asChild>
                <Link href={'/'}>
                  <ArrowLeft /> Continue Shopping
                </Link>
              </Button>
            </>
          )}
          {orders.map((o) => (
            <div key={o.id}>
              <div className="flex w-full flex-wrap items-center justify-between gap-y-5 bg-muted p-5">
                <div>
                  <p>Order #:</p>
                  <strong className="text-blue-500 underline hover:text-blue-600">
                    <Link href={`/orders/${o.id}`}>{o.id}</Link>
                  </strong>
                </div>
                <div>
                  <p>Purchase Date:</p>
                  <strong>{o.createdAt.toLocaleDateString()}</strong>
                </div>
                <div>
                  <p>Total:</p>
                  <strong>{formatDollars(o.total)}</strong>
                </div>
                <div>
                  <p>Status:</p>
                  <strong>{o.status}</strong>
                </div>
              </div>

              <div className="flex w-full flex-col gap-5 py-5">
                {o.items.map((item) => (
                  <div
                    className="flex w-full justify-between px-5"
                    key={item.productId}
                  >
                    <div>
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="w-96">
                      <strong>{item.product.title}</strong>
                    </div>
                    <div>Price: {formatDollars(item.product.price)}</div>
                    <div>Qty: {item.quantity}</div>
                    <div>
                      <Button variant={'outline'} asChild>
                        <Link href={'/products/' + item.product.slug}>
                          Buy again
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
