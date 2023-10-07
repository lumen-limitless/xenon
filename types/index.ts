import { Product, User } from '@prisma/client'
import { Session } from 'next-auth'

export type CartItem = {
  product: Product
  quantity: number
}

export type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
}

export interface CustomSession extends Session {
  user: User
}
