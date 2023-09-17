export type Product = {
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

export type CartItem = {
  product: Product
  quantity: number
}

export type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
}
