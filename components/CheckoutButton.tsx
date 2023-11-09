'use client'

import { checkoutAction, stripeCheckoutAction } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

type CheckoutButtonProps = {
  amount?: number
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount }) => {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.has('success')) {
      checkoutAction()
      toast({ title: 'Order placed!' })
    }
    if (searchParams.has('canceled')) {
      toast({ title: 'Order canceled' })
    }
  })

  return (
    <Button
      className="w-full"
      disabled={isPending}
      aria-disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const url = await stripeCheckoutAction()
          if (url) {
            redirect(url)
          }
        })
      }
    >
      {isPending ? (
        <Loader2 className="h-5 animate-spin" />
      ) : (
        `Checkout ${amount && formatPrice(amount)}`
      )}
    </Button>
  )
}
