'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type RouteSelectorProps = {}

export const RouteSelector: React.FC<RouteSelectorProps> = ({}) => {
  const pathname = usePathname()
  return (
    <>
      <div className="container flex items-center gap-2 py-10">
        <Button
          className="flex-1"
          asChild
          variant={pathname === '/manage/products' ? 'default' : 'secondary'}
        >
          <Link href={'/manage/products'}>Products</Link>
        </Button>
        <Button
          className="flex-1"
          asChild
          variant={pathname === '/manage/orders' ? 'default' : 'secondary'}
        >
          <Link href={'/manage/orders'}>Orders</Link>
        </Button>
        <Button
          className="flex-1"
          asChild
          variant={pathname === '/manage/categories' ? 'default' : 'secondary'}
        >
          <Link href={'/manage/categories'}>Categories</Link>
        </Button>
      </div>
    </>
  )
}
