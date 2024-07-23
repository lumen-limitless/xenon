'use server';

import { auth } from '@/auth';
import { productTable } from '@/schema';
import type { Product } from '@/types';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '../drizzle';

export async function updateProductAction({ product }: { product: Product }) {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized: Only admins can update products');
  }

  // Validate metadata
  if (!product.metadata) {
    throw new Error('Product metadata is required');
  }

  // Validate attributes
  if (!Array.isArray(product.attributes)) {
    throw new Error('Product attributes must be an array');
  }

  product.attributes.forEach((attr, index) => {
    if (typeof attr.name !== 'string' || attr.name.trim() === '') {
      throw new Error(`Invalid attribute name at index ${index}`);
    }
    if (!Array.isArray(attr.values) || attr.values.length === 0) {
      throw new Error(
        `Attribute values must be a non-empty array at index ${index}`,
      );
    }
    attr.values.forEach((value, valueIndex) => {
      if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(
          `Invalid attribute value at index ${index}, value ${valueIndex}`,
        );
      }
    });
  });

  // Validate variants
  if (!Array.isArray(product.variants)) {
    throw new Error('Product variants must be an array');
  }

  product.variants.forEach((variant, index) => {
    if (typeof variant.id !== 'string' || variant.id.trim() === '') {
      throw new Error(`Invalid variant id at index ${index}`);
    }

    if (typeof variant.sku !== 'string' || variant.sku.trim() === '') {
      throw new Error(`Invalid variant SKU at index ${index}`);
    }

    if (typeof variant.stock !== 'number' || variant.stock < 0) {
      throw new Error(`Invalid variant stock at index ${index}`);
    }

    // if (typeof variant.customPrice !== 'number' || variant.customPrice < 0) {
    //   throw new Error(`Invalid variant price at index ${index}`);
    // }

    if (typeof variant.attributes !== 'object' || variant.attributes === null) {
      throw new Error(`Invalid variant attributes at index ${index}`);
    }

    Object.entries(variant.attributes).forEach(([key, value]) => {
      if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(
          `Invalid attribute value for ${key} in variant at index ${index}`,
        );
      }
    });
  });

  await db.transaction(async (tx) => {
    await tx
      .update(productTable)
      .set({
        ...product,
      })
      .where(eq(productTable.id, product.id));
  });

  revalidatePath('/manage/products/edit');
}
