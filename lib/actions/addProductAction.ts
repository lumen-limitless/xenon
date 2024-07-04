'use server';

import { productTable } from '@/schema';
import type { CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '../drizzle';
import { generateSlug } from '../utils';

const addProductActionSchema = z.object({
  uploadedImages: z.array(
    z.object({
      secure_url: z.string(),
    }),
  ),
  formData: z.object({
    get: z.function(),
    getAll: z.function(),
  }),
});

/**
 *
 * @description Server action to add a new product to the store
 * @param prevState The previous state of the form
 * @param formData The form data from the request
 * @returns object with message key
 */
export async function addProductAction(
  uploadedImages: Array<CloudinaryUploadWidgetInfo>,
  formData: FormData,
): Promise<{ message: string }> {
  try {
    const title = formData.get('title')?.toString() || '--';
    const sku = formData.get('sku')?.toString() || '--';
    const description = formData.get('description')?.toString() || '--';
    const categories =
      formData.getAll('category').map((c) => c.toString()) || [];
    const price = Math.round(Number(formData.get('price')?.toString()) * 100);
    const stock = Math.round(Number(formData.get('stock')?.toString()));
    const published = Boolean(formData.get('published'));

    if (isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
      return { message: 'Invalid input' };
    }

    await db.insert(productTable).values({
      title,
      sku,
      slug: generateSlug(title),
      regularPrice: price,
      images: uploadedImages.map((image) => image.secure_url),
      stock,
      productDescription: description,
      status: published ? 'PUBLISHED' : 'DRAFT',
    });

    return redirect('/manage/products');
  } catch (err) {
    console.error(err);
    return { message: 'Error adding product' };
  }
}
