'use client'

import useCartStore from '@/lib/store'
import { ArrowRightIcon, TrashIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export default function Cart() {
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
                <div className="flex flex-col gap-1">
                  <Input
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
                    size={'sm'}
                    onClick={() => {
                      removeItem(item.product.id)
                    }}
                  >
                    <TrashIcon className="h-4" />
                    Remove
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Image
                  className="mx-auto"
                  src={item.product.image}
                  alt={item.product.title}
                  height={50}
                  width={50}
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell className="text-right">
                {' '}
                {item.product.price * item.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mx-auto my-5 flex w-full max-w-xl">
        {items.length > 0 && (
          <Button className="w-full">
            Proceed to checkout
            <ArrowRightIcon />
          </Button>
        )}
      </div>
    </div>
  )
}
