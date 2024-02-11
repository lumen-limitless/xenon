'use client';

import { type ButtonProps } from '@/components/ui/button';
import { updateCartAction } from '@/lib/actions';
import { truncateText } from '@/lib/utils';
import { type Product } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

type AddToCartButtonProps = {
  product: Product;
} & Omit<
  ButtonProps,
  'children' | 'onClick' | 'asChild' | 'disabled' | 'aria-disabled'
>;

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  ...props
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      {...props}
      aria-disabled={isPending}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const { success } = await updateCartAction({
            productId: product.id,
            value: 1,
          });
          if (!success) {
            toast("Couldn't add to bag. Please try again.");
            return;
          }

          toast(`Added ${truncateText(product.title, 20)} to bag`);
        })
      }
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        'Add to bag'
      )}
    </Button>
  );
};
