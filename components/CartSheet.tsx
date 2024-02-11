'use client';

import { updateCartAction } from '@/lib/actions';
import { formatDollars, truncateText } from '@/lib/utils';
import { type CartInfo } from '@/types';
import { type CartItem } from '@prisma/client';
import { MinusCircle, PlusCircle, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { CheckoutButton } from './CheckoutButton';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from './ui/table';

const CartQuantitySelector: React.FC<{ item: CartItem }> = ({ item }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const update = (value: number) => {
    startTransition(async () => {
      await updateCartAction({
        productId: item.productId,
        value: value,
      });

      router.refresh();
    });
  };
  return (
    <div className="mr-auto flex w-24 items-center gap-1 text-secondary-foreground">
      <Button
        aria-disabled={isPending}
        disabled={isPending}
        aria-label="Remove one item from cart"
        variant={'ghost'}
        size={'icon'}
        onClick={() => update(-1)}
      >
        <MinusCircle />
      </Button>
      <span>{item.quantity}</span>
      <Button
        aria-disabled={isPending}
        disabled={isPending}
        aria-label="Add one item to cart"
        onClick={() => update(+1)}
        variant={'ghost'}
        size={'icon'}
      >
        <PlusCircle />
      </Button>
    </div>
  );
};

type CartSheetProps = {
  cart: CartInfo | null;
};
export const CartSheet: React.FC<CartSheetProps> = ({ cart }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} id="cart-button">
          <ShoppingBag />
          <span className="sr-only">Shopping Bag</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full pb-32">
        <SheetHeader>
          <SheetTitle>Your Shopping Bag</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full pr-3">
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
                          });

                          router.refresh();
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <SheetClose asChild>
                      <Link href={`/products/${item.product.slug}`}>
                        <Image
                          className="h-auto w-auto"
                          src={
                            item.product.images[0]
                              ? item.product.images[0]
                              : '/images/placeholder.png'
                          }
                          alt={item.product.title}
                          height={50}
                          width={50}
                        />
                      </Link>
                    </SheetClose>

                    <div className="mt-5 flex-1 space-y-2">
                      <SheetClose asChild>
                        <Link href={`/products/${item.product.slug}`}>
                          {truncateText(item.product.title, 25)}
                        </Link>
                      </SheetClose>

                      <div className="flex w-full items-center">
                        <CartQuantitySelector item={item} />
                        <span>
                          {formatDollars(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <SheetFooter className="py-5">
          {cart && cart.size > 0 && (
            <SheetClose asChild>
              <CheckoutButton amount={cart.subtotal} />
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
