'use client'

import useCartStore from '@/lib/store'
import { ShoppingCartIcon } from 'lucide-react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'

type NavProps = {
  session: Session | null
}
export const Nav: React.FC<NavProps> = ({ session }) => {
  const { items } = useCartStore()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/orders" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Orders
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="flex gap-5">
        {session ? (
          <Button variant={'default'} onClick={() => signIn()}>
            Logout
          </Button>
        ) : (
          <Button variant={'default'} onClick={() => signIn()}>
            Login
          </Button>
        )}

        <div className="relative">
          <Link href="/cart">
            <Button variant={'ghost'}>
              <ShoppingCartIcon />
            </Button>
          </Link>
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
              {items.length}
            </span>
          )}
        </div>
      </div>
    </NavigationMenu>
  )
}
