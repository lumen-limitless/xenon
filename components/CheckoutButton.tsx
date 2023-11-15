'use client'

import { stripeCheckoutAction } from '@/lib/actions'
import { formatDollars } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { RedirectType, redirect } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from './ui/button'

type CheckoutButtonProps = {
  amount?: number
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      className="w-full"
      disabled={isPending}
      aria-disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const sessionUrl = await stripeCheckoutAction()
          if (sessionUrl) {
            redirect(sessionUrl, RedirectType.push)
          }
        })
      }
    >
      {isPending ? (
        <Loader2 className="h-5 animate-spin" />
      ) : (
        `Checkout ${amount && formatDollars(amount)}`
      )}
    </Button>
  )
}
