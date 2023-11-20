'use client'

import { APP_NAME } from '@/lib/constants'
import { type CartInfo } from '@types'
import { User2 } from 'lucide-react'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import GoogleSVG from 'public/google.svg'
import LogoSVG from 'public/logo.svg'
import { CartSheet } from './CartSheet'
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

type NavProps = {
  session: Session | null
  cart: CartInfo | null
}

export const Nav: React.FC<NavProps> = ({ session, cart }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  return (
    <div className="container flex h-16 w-full items-center" id="navigation">
      <Link href="/">
        <LogoSVG className="h-6" />
        <span className="sr-only">{APP_NAME}</span>
      </Link>
      <NavigationMenu className="ml-auto">
        <div className="hidden px-1 md:block">
          <SearchBar />
        </div>
        <NavigationMenuList>
          <Sheet defaultOpen={searchParams.has('signin') && session === null}>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant={'ghost'}>
                  <User2 />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session !== null ? (
                  <>
                    {' '}
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/account"> View Account</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => signOut()}>
                        Sign out
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
                          <DropdownMenuItem asChild>
                            <Link href="/manage-users">Manage Users</Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <DropdownMenuGroup>
                      <SheetTrigger asChild>
                        <DropdownMenuItem>Sign in</DropdownMenuItem>
                      </SheetTrigger>
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

            <SheetContent className="w-screen">
              <SheetHeader>
                <SheetTitle>Sign In to {APP_NAME}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col items-center justify-center gap-5 py-10">
                <Button
                  onClick={() => signIn('google', { callbackUrl: pathname })}
                  variant={'outline'}
                  size="lg"
                >
                  <GoogleSVG className="h-6 w-6" />
                  Sign in with Google
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <NavigationMenuItem>
            <div className="relative">
              <CartSheet cart={cart} />
              {cart && cart.items.length > 0 && (
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
