'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type RouteSelectorProps = {
  routes?: { name: string; path: string }[]
  className?: string
}

export const RouteSelector: React.FC<RouteSelectorProps> = ({
  routes,
  className,
}) => {
  const pathname = usePathname()

  if (!routes) {
    return null
  }

  return (
    <>
      <div className={cn('container flex items-center gap-2 py-10', className)}>
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
