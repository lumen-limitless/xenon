'use client'
import { createOrderAction } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

type CreateOrderButtonProps = {}

export const CreateOrderButton: React.FC<CreateOrderButtonProps> = ({}) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <Button
      disabled={isPending}
      aria-disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await createOrderAction()
          toast({
            title: 'Order placed',
            description: 'Your order has been placed.',
          })
          router.refresh()
        })
      }
    >
      {isPending ? 'Placing order...' : 'Place order'}
    </Button>
  )
}
