import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CartState, Product } from './types'

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (product: Product) => {
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.product.id === product.id
            )
            if (existingItem) {
              // If the item already exists in the cart, increment its quantity
              return {
                items: state.items.map((item) =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              }
            }
            // Otherwise, add the item to the cart with a quantity of 1
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity: 1,
                },
              ],
            }
          })
        },
        removeItem: (productId: number) => {
          set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId),
          }))
        },
      }),
      {
        name: 'cart-store', // Name to identify the persisted data
        getStorage: () => localStorage, // Use local storage for persistence
      }
    )
  )
)

export default useCartStore
