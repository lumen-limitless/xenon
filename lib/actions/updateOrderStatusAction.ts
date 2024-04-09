'use server';

import { orderStatus, orderTable } from '@/schema';
import { eq } from 'drizzle-orm';
import { db } from '../drizzle';

/**
 *
 * @description Server action to update a product in the store
 * @param prevState The previous state of the form
 * @param formData The form data from the request
 * @returns object with message key
 */
export async function updateOrderStatusAction(
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
