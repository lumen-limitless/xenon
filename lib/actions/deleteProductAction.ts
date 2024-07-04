'use server';

import { productTable } from '@/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '../drizzle';

/**
 * Deletes a product with the specified ID.
 *
 * @param {Object} params - The parameters for the deleteProductAction function.
 * @param {string} params.id - The ID of the product to delete.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object with a message property indicating the result of the deletion.
 */
export async function deleteProductAction({
  id,
}: {
  id: string;
}): Promise<{ message: string }> {
  try {
    await db.delete(productTable).where(eq(productTable.id, id));

    revalidatePath('/');

    return { message: 'Product deleted' };
  } catch (err) {
    console.error(err);
    return { message: 'Error deleting product' };
  }
}
