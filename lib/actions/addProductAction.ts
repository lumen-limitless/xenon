'use server';

import { auth } from '@/auth';
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
});

const formDataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().optional(),
  category: z.array(z.string()).optional(),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Price must be a non-negative number',
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Stock must be a non-negative integer',
  }),
  published: z.string().optional(),
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
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized: Only admins can add products');
  }

  try {
    const validatedImages = addProductActionSchema.parse({ uploadedImages });

    const validatedFormData = formDataSchema.parse({
      title: formData.get('title'),
      sku: formData.get('sku'),
      description: formData.get('description'),
      category: formData.getAll('category'),
      price: formData.get('price'),
      stock: formData.get('stock'),
      published: formData.get('published'),
    });

    const { title, sku, description, category, price, stock, published } =
      validatedFormData;

    await db.insert(productTable).values({
      title,
      sku,
      slug: generateSlug(title),
      regularPrice: Math.round(Number(price) * 100),
      images: validatedImages.uploadedImages.map((image) => image.secure_url),
      stock: Math.round(Number(stock)),
      productDescription: description || '--',
      status: published ? 'PUBLISHED' : 'DRAFT',
    });

    return redirect('/manage/products');
  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return { message: `Validation error: ${err.errors[0].message}` };
    }
    return { message: 'Error adding product' };
  }
}
