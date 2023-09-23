'use client'

import useCartStore from '@/lib/store'

import { ShoppingBag, User2 } from 'lucide-react'
import { Session } from 'next-auth'
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
  session: Session | null
}

const Nav: React.FC<NavProps> = ({ session }) => {
  const { items } = useCartStore()

  // This is a hack to prevent the cart icon from showing a badge on the server
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex w-full items-center px-5 py-3 md:px-10">
      <Link href="/">
        <LogoSVG className="h-6 md:h-8" />
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
                </>
              ) : (
                <>
                  {' '}
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => signIn()}>
                      Log in
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem>
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