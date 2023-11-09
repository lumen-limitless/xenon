import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { Order } from '@prisma/client'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Admin Dashboard',
}

async function getOrders(): Promise<Array<Order>> {
  try {
    const orders = await prisma.order.findMany()
    return orders
  } catch (error) {
    console.error(error)
    return []
  }
}
export default async function Page({}: PageProps) {
  const [orders] = await Promise.all([getOrders()])

  return (
    <>
      <Section id="admin-dashboard" className="py-20">
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
          <Card className="col-span-12 md:col-span-4">
            <CardHeader>
              <h3>Total Sales</h3>
            </CardHeader>
            <CardContent>
              <p>
                {formatPrice(
                  orders.reduce((acc, order) => acc + order.total, 0),
                )}
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-12 md:col-span-4">
            <CardHeader>
              <h3>Total Orders</h3>
            </CardHeader>
            <CardContent>
              <p>{orders.length}</p>
            </CardContent>
          </Card>
          <Card className="col-span-12 md:col-span-4">
            <CardHeader>
              <h3>Pending Orders</h3>
            </CardHeader>
            <CardContent>
              <p>{orders.filter((o) => o.status === 'PENDING').length}</p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
