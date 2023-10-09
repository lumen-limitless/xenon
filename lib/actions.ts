'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from './prisma'

export async function addProductAction(prevState: any, formData: FormData) {
  try {
    const title = formData.get('title')?.toString() || '--'
    const description = formData.get('description')?.toString() || '--'
    const image = formData.get('image')?.toString() || ''
    const categories =
      formData.getAll('category').map((c) => c.toString()) || []
    const price = Math.round(Number(formData.get('price')?.toString()) * 100)

    if (isNaN(price)) {
      return { message: 'Price is not a number' }
    }

    await prisma.product.create({
      data: {
        title,
        price,
        description,
        image,
        categories: {
          connect: categories.map((c) => ({ id: c })),
        },
      },
    })

    revalidatePath('/manage-products')
    return { message: 'Product added' }
  } catch (err) {
    console.error(err)
    return { message: 'Error adding product' }
  }
}

export async function deleteProductAction(prevState: any, id: string) {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    })

    revalidatePath('/manage-products')

    return { message: 'Product deleted' }
  } catch (err) {
    console.error(err)
    return { message: 'Error deleting product' }
  }
}
