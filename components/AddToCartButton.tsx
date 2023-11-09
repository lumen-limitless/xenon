'use client'

import { type ButtonProps } from '@/components/ui/button'
import { updateCartAction } from '@/lib/actions'
import { truncateText } from '@/lib/utils'
import { type Product } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

type AddToCartButtonProps = {
  product: Product
} & Omit<
  ButtonProps,
  'children' | 'onClick' | 'asChild' | 'disabled' | 'aria-disabled'
>

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  ...props
}) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

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
          })
          if (!success) {
            toast({
              title: 'Error',
              description: 'There was an error adding to your bag.',
            })
            return
          }

          toast({
            title: 'Added to bag',
            description: `${truncateText(
              product.title,
              25,
            )} was added to your bag.`,
          })
          router.refresh()
        })
      }
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        'Add to bag'
      )}
    </Button>
  )
}
