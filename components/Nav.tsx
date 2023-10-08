'use client'

import { useCartStore } from '@/lib/store'
import { type CustomSession } from '@/types'
import { ShoppingBag, User2 } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import LogoSVG from 'public/logo.svg'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu'

type NavProps = {
  session: CustomSession | null
}

const Nav: React.FC<NavProps> = ({ session }) => {
  const { items } = useCartStore()

  // This is a hack to prevent the cart icon from showing a badge on the server
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="container flex h-16 w-full items-center">
      <Link href="/">
        <LogoSVG className="h-6" />
      </Link>
      <NavigationMenu className="ml-auto">
        <NavigationMenuList>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'}>
                <User2 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session ? (
                <>
                  {' '}
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>

                    <DropdownMenuItem onClick={() => signOut()}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {session.user.role === 'ADMIN' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Administration</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href="/add-product">Add Product</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/order-fulfillment">
                            Order Fulfillment
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}
                </>
              ) : (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => signIn()}>
                      Log in
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/lumen-limitless/xenon"
                >
                  GitHub
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavigationMenuItem>
            <div className="relative">
              <Link href="/cart">
                <Button variant={'ghost'}>
                  <ShoppingBag />
                </Button>
              </Link>
              {isClient && items.length > 0 && (
                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
                  {items.length}
                </div>
              )}
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Nav
