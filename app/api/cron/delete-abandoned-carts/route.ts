import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const abandonedCarts = await prisma.cart.findMany({
      where: {
        updatedAt: {
          lte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days
        },
        userId: null,
      },
    })

    if (abandonedCarts.length === 0) {
      return NextResponse.json(
        { success: true, message: '0 abandoned carts were deleted.' },
        { status: 200 },
      )
    }

    await prisma.cart.deleteMany({
      where: {
        id: {
          in: abandonedCarts.map((cart) => cart.id),
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: `${abandonedCarts.length} abandoned carts were deleted.`,
      },
      { status: 200 },
    )
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}
