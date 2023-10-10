import { type Cart, type CartItem } from '@prisma/client'
import { CartWithProducts, type CartInfo } from '@types'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { authOptions } from './auth'
import { prisma } from './prisma'

export async function createCart(): Promise<CartInfo> {
  let newCart: Cart

  const session = await getServerSession(authOptions)

  if (session) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    })
  } else {
    newCart = await prisma.cart.create({
      data: {},
    })

    cookies().set('localCartId', newCart.id)
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  }
}

export async function getCart(): Promise<CartInfo | null> {
  let cart: CartWithProducts | null = null

  const session = await getServerSession(authOptions)

  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            product: true,
          },
        },
      },
    })
  } else {
    const localCartId = cookies().get('localCartId')?.value

    cart = localCartId
      ? await prisma.cart.findUnique({
          where: {
            id: localCartId,
          },
          include: {
            items: {
              orderBy: {
                createdAt: 'desc',
              },
              include: {
                product: true,
              },
            },
          },
        })
      : null
  }

  if (cart === null) {
    return null
  }

  return {
    ...cart,
    size: cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
    subtotal:
      cart?.items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0,
      ) ?? 0,
  }
}

export async function mergeAnonymousCartWithUserCart(
  userId: string,
): Promise<void> {
  const localCartId = cookies().get('localCartId')?.value

  const localCart = await prisma.cart.findUnique({
    where: {
      id: localCartId,
    },
    include: {
      items: true,
    },
  })

  if (localCart === null) {
    return
  }

  const userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  })

  const mergeCartItems = (
    ...cartItems: Array<Array<CartItem>>
  ): Array<CartItem> => {
    return cartItems.reduce((acc, items) => {
      items.forEach((item) => {
        const existingItem = acc.find((i) => i.productId === item.productId)

        if (existingItem) {
          existingItem.quantity += item.quantity
        } else {
          acc.push(item)
        }
      })

      return acc
    }, [])
  }

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items)

      await tx.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      })

      await tx.cartItem.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      })
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      })
    }

    await tx.cart.delete({
      where: {
        id: localCartId,
      },
    })

    cookies().set('localCartId', '')
  })
}
