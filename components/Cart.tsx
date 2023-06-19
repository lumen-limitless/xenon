'use client'

import useCartStore from '@/lib/store'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ArrowRightIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'

export default function Cart() {
  const { items, removeItem } = useCartStore()
  return (
    <>
      <div className="container mx-auto flex flex-col">
        <Table>
          {items.length === 0 && (
            <TableCaption>Your cart is empty</TableCaption>
          )}
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
                      onInput={(e) => {
                        console.log(e)
                      }}
                    />
                    <Button
                      variant={'destructive'}
                      size={'sm'}
                      onClick={() => {
                        removeItem(item.product.id)
                      }}
                    >
                      <Trash2Icon className="h-4" />
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
    </>
  )
}
