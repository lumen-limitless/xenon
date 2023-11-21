'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type RouteSelectorProps = {}

const routes = [
  { name: 'Products', path: '/manage/products' },
  { name: 'Orders', path: '/manage/orders' },
  { name: 'Categories', path: '/manage/categories' },
  { name: 'Users', path: '/manage/users' },
]
export const RouteSelector: React.FC<RouteSelectorProps> = ({}) => {
  const pathname = usePathname()
  return (
    <>
      <div className="container flex items-center gap-2 py-10">
        {routes.map((route) => (
          <Button
            key={route.name}
            className="flex-1"
            asChild
            variant={pathname === route.path ? 'default' : 'secondary'}
          >
            <Link href={`${route.path}`}>{route.name}</Link>
          </Button>
        ))}
      </div>
    </>
  )
}
