'use server';

import { productTable } from '@/schema';
import { ProductWithVariantsAndAttributes } from '@/types';
import { eq } from 'drizzle-orm';
import { db } from '../drizzle';

export async function updateProductAction({
  product,
}: {
  product: ProductWithVariantsAndAttributes;
}) {
  await db.transaction(async (tx) => {
    await tx
      .update(productTable)
      .set({
        ...product,
      })
      .where(eq(productTable.id, product.id));
  });
}
