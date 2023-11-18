import { OrderWithItemsAndProducts } from '@/@types'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDollars } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'My Account',
}

async function getOrdersForAccount(
  userId?: string,
): Promise<Array<OrderWithItemsAndProducts>> {
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
    })

    return orders
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  const orders = await getOrdersForAccount(session?.user.id)

  return (
    <>
      <Section id="user-greeting">
        <div className="flex h-36 w-full items-center justify-center bg-gradient-to-r from-purple-800 to-blue-800 text-white">
          <div className="container">
            <h1 className="text-center text-3xl font-bold">
              Welcome, {session?.user.name}
            </h1>
          </div>
        </div>
      </Section>
      <Section id="view-selector">
        <div className="container">
          <div className="flex items-center justify-evenly gap-2 py-5">
            <Button variant={'default'} className="flex-1">
              Orders
            </Button>
            <Button variant={'secondary'} className="flex-1">
              Returns
            </Button>
            <Button variant={'secondary'} className="flex-1">
              Security
            </Button>
          </div>
        </div>
      </Section>
      <Section id="orders" className="py-5">
        <div className="container">
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
      </Section>
    </>
  )
}
