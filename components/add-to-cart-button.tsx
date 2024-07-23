'use client';

import { type ButtonProps } from '@/components/ui/button';
import { updateCartAction } from '@/lib/actions';
import { truncateText } from '@/lib/utils';
import type { Product } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

type AddToCartButtonProps = {
  product: Product;
  variantId?: string;
} & Omit<
  ButtonProps,
  'children' | 'onClick' | 'asChild' | 'disabled' | 'aria-disabled'
>;

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  variantId,
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
            variantId,
            value: 1,
          },
          {
            onError: () => {
              toast.error("Couldn't add to bag. Please try again later.");
            },
            onSuccess: ({ success }) => {
              if (!success) {
                toast.error("Couldn't add to bag. Please try again later.");
                return;
              } else {
                toast.success(
                  `Added ${truncateText(product.title, 20)} to bag`,
                );
              }
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
