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

  await prisma.category.deleteMany()

  const category = await prisma.category.create({
    data: {
      title: 'All',
      description: 'All products',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
  })

  await prisma.product.deleteMany()

  for (const product of products) {
    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        categories: {
          connect: {
            id: category.id,
          },
        },
        stock: Math.floor(Math.random() * 100),
        image: product.image,
        price: parseInt((product.price * 100).toFixed(0)),
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
