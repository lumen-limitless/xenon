'use server';

import { cartItemTable, productTable } from '@/schema';
import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createCart, getCart } from '../cart';
import { db } from '../drizzle';
/**
 *
 * @description Server action to update an item in the cart
 * @param productId The id of the product to update
 * @param variantId The id of the variant to update
 * @param value The value to update the quantity by
 * @returns object with success key
 */
export async function updateCartAction({
  productId,
  value,
  variantId,
}: {
  productId: string;
  variantId?: string;
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
          variantId ? eq(cartItemTable.variantId, variantId) : undefined,
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
            variantId,
            quantity: value,
            price: sql`(SELECT COALESCE(${productTable.salePrice}, ${productTable.regularPrice}) FROM ${productTable} WHERE ${productTable.id} = ${productId})`,
          });
        }
      }
    });

    revalidatePath('/');

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
