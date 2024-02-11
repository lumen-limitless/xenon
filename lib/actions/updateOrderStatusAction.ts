'use server';

import { OrderStatus } from '@prisma/client';
import { prisma } from '../prisma';

/**
 *
 * @description Server action to update a product in the store
 * @param prevState The previous state of the form
 * @param formData The form data from the request
 * @returns object with message key
 */
export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus,
): Promise<{ success: boolean }> {
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
