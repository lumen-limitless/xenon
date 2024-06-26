'use server';

import { cartItemTable, cartTable } from '@/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createCart, getCart } from '../cart';
import { db } from '../drizzle';
/**
 *
 * @description Server action to update an item in the cart
 * @param productId The id of the product to update
 * @param value The value to update the quantity by
 * @returns object with success key
 */
export async function updateCartAction({
  productId,
  value,
}: {
  productId: string;
  value: number;
}): Promise<{ success: boolean }> {
  try {
    const cart = (await getCart()) ?? (await createCart());

    if (value === 0) {
      return { success: true };
    }

    await db.transaction(async (tx) => {
      const existingItem = await tx.query.cartItemTable.findFirst({
        where: and(
          eq(cartItemTable.cartId, cart.id),
          eq(cartItemTable.productId, productId),
        ),
      });

      if (existingItem !== undefined) {
        const isZero = existingItem.quantity + value === 0;
        isZero
          ? await tx
              .delete(cartItemTable)
              .where(eq(cartItemTable.id, existingItem.id))
          : await tx
              .update(cartItemTable)
              .set({
                quantity: existingItem.quantity + value,
              })
              .where(eq(cartItemTable.id, existingItem.id));
      } else {
        if (value > 0) {
          await tx.insert(cartItemTable).values({
            cartId: cart.id,
            productId,
            quantity: value,
          });
        }
      }

      // manually update cart updatedAt
      await tx
        .update(cartTable)
        .set({
          updatedAt: new Date(),
        })
        .where(eq(cartTable.id, cart.id));
    });

    revalidatePath('/');

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
