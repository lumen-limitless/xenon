'use client'

import { type CartInfo } from '@types'
import { User2 } from 'lucide-react'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import LogoSVG from 'public/logo.svg'
import { useEffect, useState } from 'react'
import { CartComponent } from './CartComponent'
import { SearchBar } from './SearchBar'
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
  session: Session | null
  cart: CartInfo | null
}

export const Nav: React.FC<NavProps> = ({ session, cart }) => {
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
        <div className="hidden md:block">
          <SearchBar />
        </div>
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
                          <Link href="/dashboard">Admin Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/manage-products">Manage Products</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/manage-orders">Manage Orders</Link>
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
              <CartComponent cart={cart} />
              {isClient && cart && cart.items.length > 0 && (
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
                  {cart?.items.length}
                </div>
              )}
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
