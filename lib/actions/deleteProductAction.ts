'use server';

import { productTable } from '@/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '../drizzle';
/**
 *
 * @description Server action to delete a product from the store
 * @param prevState The previous state of the form
 * @param formData The form data from the request
 * @returns object with message key
 */
export async function deleteProductAction(
  prevState: any,
  id: string,
): Promise<{ message: string }> {
  try {
    await db.delete(productTable).where(eq(productTable.id, id));

    revalidatePath('/manage-products');

    return { message: 'Product deleted' };
  } catch (err) {
    console.error(err);
    return { message: 'Error deleting product' };
  }
}
