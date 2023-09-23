import { PrismaClient } from '@prisma/client'

type MockProduct = {
  id: number
  title: string
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  price: number
}

const prisma = new PrismaClient()

// seed the database with products from the fakestoreapi
export default async function main() {
  const res = await fetch('https://fakestoreapi.com/products/')

  if (!res.ok) {
    throw new Error('Error fetching products')
  }

  const products: MockProduct[] = await res.json()

  await prisma.product.deleteMany()

  for (const product of products) {
    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        category: product.category,
        image: product.image,
        price: product.price,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })