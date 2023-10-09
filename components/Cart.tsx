'use client'

import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from './ui/table'

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCartStore()
  const searchParams = useSearchParams()

  return (
    <Sheet defaultOpen={searchParams.get('view') === 'cart'}>
      <SheetTrigger asChild>
        <Button variant={'ghost'}>
          <ShoppingBag />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-screen overflow-y-scroll md:w-full"
      >
        <SheetHeader>
          <SheetTitle>Your Shopping Bag</SheetTitle>
        </SheetHeader>
        <Table>
          {items.length === 0 && (
            <TableCaption>Your shopping bag is empty.</TableCaption>
          )}

          <TableBody>
            {items.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell className="flex w-full items-center gap-5">
                  <div>
                    <Image
                      src={
                        item.product.image
                          ? item.product.image
                          : '/images/placeholder.png'
                      }
                      alt={item.product.title}
                      height={50}
                      width={50}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <p>{item.product.title}</p>
                    <div className="flex w-full items-center">
                      <Input
                        className="mr-auto w-16"
                        type="number"
                        min={0}
                        value={item.quantity}
                        onInput={(e) => {
                          e.preventDefault()
                          const value = parseInt(e.currentTarget.value)
                          if (value > 0) {
                            updateQuantity(item.product.id, value)
                          } else {
                            removeItem(item.product.id)
                          }
                        }}
                      />
                      <span>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {items && items.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell className="text-right">
                  Subtotal:{' '}
                  {formatPrice(
                    items.reduce((acc, item) => {
                      return acc + item.product.price * item.quantity
                    }, 0),
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
        <div className="mx-auto my-5 flex w-full max-w-xl px-5">
          {items.length > 0 && (
            <a
              href="https://checkout.stripe.dev/preview"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <Button className="w-full">
                Proceed to checkout
                <ArrowRightIcon />
              </Button>
            </a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
