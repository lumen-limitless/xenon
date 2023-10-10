'use client'

import { updateCartAction } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { type CartInfo } from '@types'
import { ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Sheet,
  SheetClose,
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

type CartProps = {
  cart: CartInfo | null
}

export const CartComponent: React.FC<CartProps> = ({ cart }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <Sheet>
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
          {(!cart || cart.size === 0) && (
            <TableCaption>Your shopping bag is empty.</TableCaption>
          )}

          <TableBody>
            {cart?.items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell className="relative flex w-full items-center gap-5">
                  <Button
                    aria-disabled={isPending}
                    disabled={isPending}
                    aria-label="Remove item from cart"
                    variant={'ghost'}
                    size={'icon'}
                    className="absolute right-0 top-0"
                    onClick={() =>
                      startTransition(async () => {
                        await updateCartAction({
                          productId: item.productId,
                          value: 0 - item.quantity,
                        })

                        router.refresh()
                      })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <SheetClose asChild>
                    <Link href={`/products/${item.productId}`}>
                      <Image
                        className="h-auto w-auto"
                        src={
                          item.product.image
                            ? item.product.image
                            : '/images/placeholder.png'
                        }
                        alt={item.product.title}
                        height={50}
                        width={50}
                      />
                    </Link>
                  </SheetClose>

                  <div className="flex-1 space-y-2">
                    <SheetClose asChild>
                      <Link href={`/products/${item.productId}`}>
                        {item.product.title}
                      </Link>
                    </SheetClose>

                    <div className="flex w-full items-center">
                      <Input
                        className="mr-auto w-16"
                        aria-disabled={isPending}
                        disabled={isPending}
                        type="number"
                        min={0}
                        value={item.quantity}
                        onInput={(e) => {
                          e.preventDefault()
                          const value = parseInt(e.currentTarget.value)
                          if (isNaN(value)) return
                          startTransition(async () => {
                            await updateCartAction({
                              productId: item.productId,
                              value: value - item.quantity,
                            })

                            router.refresh()
                          })
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
          {cart && cart.size > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell className="text-right">
                  Subtotal: {formatPrice(cart.subtotal)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
        <div className="mx-auto my-5 flex w-full max-w-xl px-5">
          {cart && cart.size > 0 && (
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
