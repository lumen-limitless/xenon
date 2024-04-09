import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/drizzle';
import { formatDollars } from '@/lib/utils';
import { orderTable } from '@/schema';
import { BookA, DollarSign, ExternalLink, User2 } from 'lucide-react';
import Link from 'next/link';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata = {
  title: 'Admin Dashboard',
};

async function getOrders(): Promise<Array<typeof orderTable.$inferInsert>> {
  try {
    const orders = await db.query.orderTable.findMany();
    return orders;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export default async function Page({}: PageProps) {
  const [orders] = await Promise.all([getOrders()]);

  return (
    <>
      <section id="admin-dashboard" className="py-20">
        <div className="container grid grid-cols-12 place-content-center gap-5">
          <div className="col-span-12">
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
          </div>
          <Button
            className="col-span-12 md:col-span-4"
            asChild
            variant={'outline'}
          >
            <Link href="/manage-products">
              Manage Products
              <ExternalLink />
            </Link>
          </Button>
          <Button
            className="col-span-12 md:col-span-4"
            asChild
            variant={'outline'}
          >
            <Link href="/manage-orders">
              Manage Orders
              <ExternalLink />
            </Link>
          </Button>
          <Button
            className="col-span-12 md:col-span-4"
            asChild
            variant={'outline'}
          >
            <Link
              href="https://dashboard.stripe.com/test/dashboard"
              target="_blank"
            >
              Stripe Dashboard
              <ExternalLink />
            </Link>
          </Button>

          <div className="col-span-12">
            <h2 className="text-2xl font-semibold">Stats</h2>
          </div>
          <Card className="col-span-12 md:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDollars(orders.reduce((acc, o) => acc + o.total, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-12 md:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <BookA className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.length.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-12 md:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <User2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">69,420</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-12 md:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Another Stat
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
