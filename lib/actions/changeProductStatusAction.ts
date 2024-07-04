'use server';

import { productTable } from '@/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '../drizzle';

/**
 * Changes the status of a product.
 *
 * @param {Object} options - The options for changing the product status.
 * @param {string} options.id - The ID of the product.
 * @param {'ARCHIVED' | 'PUBLISHED' | 'DRAFT'} options.status - The new status of the product.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object with a message indicating the result of the operation.
 */
export async function changeProductStatusAction({
  id,
  status,
}: {
  id: string;
  status: 'ARCHIVED' | 'PUBLISHED' | 'DRAFT';
}): Promise<{ message: string }> {
  try {
    await db
      .update(productTable)
      .set({ status })
      .where(eq(productTable.id, id));

    revalidatePath('/');

    return { message: 'Product status changed' };
  } catch (err) {
    console.error(err);
    return { message: 'Error changing product status' };
  }
}
