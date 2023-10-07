'use client'

import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCartStore()

  return (
    <div className="container mx-auto flex flex-col">
      <Table>
        {items.length === 0 && <TableCaption>Your cart is empty</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Quantity</TableHead>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.product.id}>
              <TableCell>
                <div className="flex w-32 gap-3">
                  <Input
                    className="flex-grow"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onInput={(e: any) => {
                      e.preventDefault()
                      console.log(e)
                      const value = parseInt(e.target.value)
                      if (value > 0) {
                        updateQuantity(item.product.id, value)
                      }
                    }}
                  />
                  <Button
                    variant={'destructive'}
                    size={'icon'}
                    onClick={() => {
                      removeItem(item.product.id)
                    }}
                  >
                    <Trash2 className="h-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Image
                  className="mx-auto"
                  src={
                    item.product.image
                      ? item.product.image
                      : '/images/placeholder.png'
                  }
                  alt={item.product.title || ''}
                  height={50}
                  width={50}
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell className="text-right">
                {formatPrice(item.product.price * item.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right">
              Total
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(
                items.reduce((acc, item) => {
                  return acc + item.product.price * item.quantity
                }, 0),
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="mx-auto my-5 flex w-full max-w-xl">
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
    </div>
  )
}

export default Cart
