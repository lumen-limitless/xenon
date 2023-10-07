'use server'

import { prisma } from './prisma'

export async function addProductAction(data: FormData) {
  const title = data.get('title')?.toString() || '--'
  const description = data.get('description')?.toString() || '--'
  const image = data.get('image')?.toString() || ''
  const price = Math.round(Number(data.get('price')?.toString()) * 100)

  if (isNaN(price)) {
    throw new Error('Price is not a number')
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
}
