import { OrderWithItemsAndProducts } from '@/@types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Section } from '@/components/ui/section'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { Filter } from 'lucide-react'
import Image from 'next/image'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Order Fulfillment',
}

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
    })

    return orders
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Page({}: PageProps) {
  const orders = await getOrders()

  return (
    <>
      <Section className="pb-48 pt-10">
        <div className="container">
          <h1>Order Fulfillment</h1>
          <div className="flex w-full items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Filter className="h-5 w-5" />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  <Input type="checkbox" className="m-2" />
                </TableCell>

                <TableCell>Order ID</TableCell>

                <TableCell>Order Date</TableCell>

                <TableCell>Customer Details</TableCell>

                <TableCell>Shipping Details</TableCell>

                <TableCell>Order Status</TableCell>

                <TableCell>Items</TableCell>

                <TableCell>Total</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Input type="checkbox" className="m-2" />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {order.name ?? '--'}
                    <br />
                    {order.email ?? '--'}
                  </TableCell>

                  <TableCell>
                    {order.name ?? '--'}
                    <br />
                    {order.address1 ?? '--'}
                    <br />
                    {order.address2 ?? '--'}
                    <br />
                    {order.city ?? '--'}, {order.state ?? '--'}
                    <br />
                    {order.zip ?? '--'}
                    <br />
                    {order.country ?? '--'}
                  </TableCell>

                  <TableCell>{order.status ?? '--'}</TableCell>

                  <TableCell>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          <Image
                            src={item.product.images[0]}
                            width={50}
                            height={50}
                            alt={item.product.title}
                          />
                          {item.quantity} x {item.product.title}
                        </li>
                      ))}
                    </ul>
                  </TableCell>

                  <TableCell>{formatPrice(order.total)}</TableCell>

                  <TableCell>
                    <Button className="">Mark as Shipped</Button>
                    <Button variant={'destructive'} className="mt-2">
                      Cancel & Refund
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {orders.length === 0 && (
              <TableCaption>
                No orders found. Try adjusting your search filters.
              </TableCaption>
            )}
          </Table>
        </div>
      </Section>
    </>
  )
}
