'use server'

import { revalidatePath } from 'next/cache'
import { createCart, getCart } from './cart'
import { prisma } from './prisma'

export async function addProductAction(
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> {
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

export async function deleteProductAction(
  prevState: any,
  id: string,
): Promise<{ message: string }> {
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

export async function updateCartAction({
  productId,
  value,
}: {
  productId: string
  value: number
}): Promise<{ success: boolean }> {
  try {
    const cart = (await getCart()) ?? (await createCart())

    if (value === 0) {
      return { success: true }
    }

    await prisma.$transaction(async (tx) => {
      const existingItem = await tx.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      })

      if (existingItem !== null) {
        const isZero = existingItem.quantity + value === 0
        isZero
          ? await tx.cartItem.delete({ where: { id: existingItem.id } })
          : await tx.cartItem.update({
              where: {
                id: existingItem.id,
              },
              data: {
                quantity: {
                  increment: value,
                },
              },
            })
      } else {
        if (value > 0) {
          await tx.cartItem.create({
            data: {
              cartId: cart.id,
              productId,
              quantity: value,
            },
          })
        }
      }

      // manually update cart updatedAt
      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          updatedAt: new Date(),
        },
      })
    })

    return { success: true }
  } catch (err) {
    console.error(err)
    return { success: false }
  }
}

export async function createOrderAction(): Promise<{
  success: boolean
  orderId: string | null
}> {
  try {
    const cart = (await getCart()) ?? (await createCart())

    if (cart.size === 0) {
      return { success: false, orderId: null }
    }

    const order = await prisma.order.create({
      data: {
        userId: cart.userId,
        total: cart.items.reduce(
          (total, item) => total + item.quantity * item.product.price,
          0,
        ),
        items: {
          create: cart.items.map((item) => ({
            quantity: item.quantity,
            product: {
              connect: {
                id: item.product.id,
              },
            },
          })),
        },
      },
    })

    await prisma.cart.delete({
      where: {
        id: cart.id,
      },
    })

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error(error)
    return { success: false, orderId: null }
  }
}
