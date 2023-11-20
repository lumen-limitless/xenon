import { OrderWithItemsAndProducts } from '@/@types'
import { Section } from '@/components/ui/section'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    id: string
  }
  searchParams: Record<string, string | Array<string> | undefined>
}

async function getOrder(id: string): Promise<OrderWithItemsAndProducts | null> {
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
    })
    return order
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps) {
  const order = await getOrder(params.id)

  if (order === null) notFound()

  return {
    title: `Order ${order.id}`,
  }
}

export default async function Page({ params }: PageProps) {
  const order = await getOrder(params.id)

  if (order === null) notFound()

  return (
    <>
      <Section>
        <div className="container">
          <h1 className="text-3xl font-bold">Order {order.id}</h1>
          <p className="text-xl text-gray-500">{order.items.length} items</p>
        </div>
      </Section>
    </>
  )
}
