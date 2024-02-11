'use server';

import { createCart, getCart } from '../cart';
import { prisma } from '../prisma';
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

    await prisma.$transaction(async (tx) => {
      const existingItem = await tx.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      if (existingItem !== null) {
        const isZero = existingItem.quantity + value === 0;
        isZero
          ? await tx.cartItem.delete({ where: { id: existingItem.id } })
          : await tx.cartItem.update({
              where: {
                id: existingItem.id,
              },
              data: {
                quantity: {
                  increment: value,
                },
              },
            });
      } else {
        if (value > 0) {
          await tx.cartItem.create({
            data: {
              cartId: cart.id,
              productId,
              quantity: value,
            },
          });
        }
      }

      // manually update cart updatedAt
      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          updatedAt: new Date(),
        },
      });
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
