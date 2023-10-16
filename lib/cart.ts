import { type Cart, type CartItem } from '@prisma/client'
import { CartWithProducts, type CartInfo } from '@types'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { authOptions } from './auth'
import { prisma } from './prisma'

const COOKIE_SECRET = process.env.COOKIE_SECRET

function encryptCookieValue(value: string): string {
  const cipher = require('crypto').createCipher('aes-256-cbc', COOKIE_SECRET)
  let encrypted = cipher.update(value, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

function decryptCookieValue(value: string): string | undefined {
  try {
    const decipher = require('crypto').createDecipher(
      'aes-256-cbc',
      COOKIE_SECRET,
    )
    let decrypted = decipher.update(value, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (err) {
    console.error('Error decrypting cookie value:', err)
  }
}

export function getLocalCartId(): string | undefined {
  const encryptedLocalCartId = cookies().get('localCartId')?.value
  if (encryptedLocalCartId !== undefined) {
    return decryptCookieValue(encryptedLocalCartId)
  }
}

export function setLocalCartId(cartId: string): void {
  const encryptedLocalCartId = encryptCookieValue(cartId)
  cookies().set('localCartId', encryptedLocalCartId, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

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

    setLocalCartId(newCart.id)
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
    const localCartId = getLocalCartId()

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
  const localCartId = getLocalCartId()

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
