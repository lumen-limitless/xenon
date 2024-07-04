'use server';

import { orderStatus, orderTable } from '@/schema';
import { eq } from 'drizzle-orm';
import { db } from '../drizzle';

/**
 * Changes the status of an order.
 *
 * @param orderId - The ID of the order to update.
 * @param status - The new status of the order.
 * @returns A promise that resolves to an object indicating the success of the operation.
 */
export async function changeOrderStatusAction(
  orderId: string,
  status: (typeof orderStatus.enumValues)[number],
): Promise<{ success: boolean }> {
  try {
    await db
      .update(orderTable)
      .set({
        status,
      })
      .where(eq(orderTable.id, orderId));

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
