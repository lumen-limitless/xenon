'use client';

import { updateCartAction } from '@/lib/actions';
import { useStore } from '@/lib/store';
import { formatDollars, getCartItemPrice, truncateText } from '@/lib/utils';
import { cartItemTable } from '@/schema';
import type { CartInfo } from '@/types';
import { MinusCircle, PlusCircle, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useOptimistic, useTransition } from 'react';
import { CheckoutButton } from './checkout-button';
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

type CartSheetProps = {
  cart: CartInfo | null;
};
export const CartSheet: React.FC<CartSheetProps> = ({ cart }) => {
  const cartOpen = useStore((state) => state.cartOpen);
  const toggleCartOpen = useStore((state) => state.toggleCartOpen);
  const [isPending, startTransition] = useTransition();

  return (
    <Sheet open={cartOpen} onOpenChange={toggleCartOpen}>
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
              {cart?.items
                .sort((a, b) => {
                  return a.product.title.localeCompare(b.product.title);
                })
                .map((item) => {
                  const cartItemPrice = getCartItemPrice(item);

                  const variant = item.product.variants.find(
                    (v) => v.id === item.variantId,
                  );
                  return (
                    <TableRow key={item.id}>
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
                                item.product.images?.[0]
                                  ? item.product.images?.[0]
                                  : '/img/placeholder.webp'
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

                          <div id="variant">
                            {variant &&
                              Object.values(variant.attributes).map(
                                (attr, i) => (
                                  <span
                                    className="mx-1 text-sm text-muted-foreground"
                                    key={i}
                                  >
                                    {attr}
                                  </span>
                                ),
                              )}
                          </div>

                          <div className="flex w-full items-center">
                            <CartQuantitySelector item={item} />
                            <span>
                              {formatDollars(cartItemPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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

const CartQuantitySelector: React.FC<{
  item: typeof cartItemTable.$inferSelect;
}> = ({ item }) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticQty, updateOptimisticQty] = useOptimistic(
    item.quantity,
    (currentState, optimisticValue: number) => {
      return currentState + optimisticValue;
    },
  );
  // const router = useRouter();

  const update = (value: number) => {
    startTransition(async () => {
      updateOptimisticQty(value);
      await updateCartAction({
        productId: item.productId,
        value: value,
      });

      // router.refresh();
    });
  };
  return (
    <div className="mr-auto flex w-24 items-center gap-1 text-secondary-foreground">
      <Button
        // aria-disabled={isPending}
        // disabled={isPending}
        aria-label="Remove one item from cart"
        variant={'ghost'}
        size={'icon'}
        onClick={() => update(-1)}
      >
        <MinusCircle />
      </Button>
      <span>{optimisticQty}</span>
      <Button
        // aria-disabled={isPending}
        // disabled={isPending}
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
