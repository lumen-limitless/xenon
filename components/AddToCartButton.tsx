'use client';

import { type ButtonProps } from '@/components/ui/button';
import { updateCartAction } from '@/lib/actions';
import { truncateText } from '@/lib/utils';
import { productTable } from '@/schema';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

type AddToCartButtonProps = {
  product: typeof productTable.$inferSelect;
} & Omit<
  ButtonProps,
  'children' | 'onClick' | 'asChild' | 'disabled' | 'aria-disabled'
>;

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  ...props
}) => {
  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: updateCartAction,
  });

  return (
    <Button
      {...props}
      aria-disabled={isPending}
      disabled={isPending}
      onClick={() => {
        updateCart(
          {
            productId: product.id,
            value: 1,
          },
          {
            onError: () => {
              toast("Couldn't add to bag. Please try again later.");
            },
            onSuccess: ({ success }) => {
              if (!success) {
                toast("Couldn't add to bag. Please try again later.");
                return;
              }

              toast(`Added ${truncateText(product.title, 20)} to bag`);
            },
          },
        );
      }}
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        'Add to bag'
      )}
    </Button>
  );
};
