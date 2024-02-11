'use server';

import { client } from '@/sanity/lib/client';
import { prisma } from '../prisma';
import { generateSlug } from '../utils';

/**
 *
 * @description Server action to add a new product to the store
 * @param prevState The previous state of the form
 * @param formData The form data from the request
 * @returns object with message key
 */
export async function addProductAction(
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> {
  try {
    const title = formData.get('title')?.toString() || '--';
    const description = formData.get('description')?.toString() || '--';
    const categories =
      formData.getAll('category').map((c) => c.toString()) || [];
    const price = Math.round(Number(formData.get('price')?.toString()) * 100);
    const stock = Math.round(Number(formData.get('stock')?.toString()));
    const images =
      formData.getAll('image')?.map((i) => i.valueOf() as File) || [];
    console.debug('images', images);

    if (isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
      return { message: 'Invalid input' };
    }

    const assets = await Promise.all(
      images.map(async (image) => {
        const asset = await client.assets.upload('image', image);
        return asset;
      }),
    );

    await prisma.product.create({
      data: {
        title,
        slug: generateSlug(title),
        price,
        images: assets.map((a) => a.url),
        stock,
        description,
        categories: {
          connect: categories.map((c) => ({ id: c })),
        },
      },
    });

    return { message: 'Product added' };
  } catch (err) {
    console.error(err);
    return { message: 'Error adding product' };
  }
}
