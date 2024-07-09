'use server';

import { auth } from '@/auth';
import { productTable } from '@/schema';
import { ProductWithVariantsAndAttributes } from '@/types';
import { eq } from 'drizzle-orm';
import { db } from '../drizzle';

export async function updateProductAction({
  product,
}: {
  product: ProductWithVariantsAndAttributes;
}) {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized: Only admins can update products');
  }

  await db.transaction(async (tx) => {
    await tx
      .update(productTable)
      .set({
        ...product,
      })
      .where(eq(productTable.id, product.id));
  });
}
