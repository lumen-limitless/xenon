import { db } from '@/lib/drizzle';
import { cartTable } from '@/schema';
import { eq, isNull, lte, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const abandonedCarts = await db.query.cartTable.findMany({
      where: isNull(cartTable.userId).append(
        lte(
          cartTable.updatedAt,
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        ),
      ),
    });

    if (abandonedCarts.length === 0) {
      return NextResponse.json(
        { success: true, message: '0 abandoned carts were deleted.' },
        { status: 200 },
      );
    }

    await db
      .delete(cartTable)
      .where(or(...abandonedCarts.map((cart) => eq(cartTable.id, cart.id))));

    return NextResponse.json(
      {
        success: true,
        message: `${abandonedCarts.length} abandoned carts were deleted.`,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
