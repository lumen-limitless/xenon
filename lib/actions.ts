'use server'

import { prisma } from './prisma'

export async function addProductAction(prevState: any, formData: FormData) {
  try {
    const title = formData.get('title')?.toString() || '--'
    const description = formData.get('description')?.toString() || '--'
    const image = formData.get('image')?.toString() || ''
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
        category: '',
      },
    })

    return { message: 'Product added' }
  } catch (err) {
    console.error(err)
    return { message: 'Error adding product' }
  }
}
