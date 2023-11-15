import { Prisma } from '@prisma/client'

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true
      }
    }
  }
}>

export type OrderWithItemsAndProducts = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true
      }
    }
  }
}>

export interface CartInfo extends CartWithProducts {
  size: number
  subtotal: number
}
