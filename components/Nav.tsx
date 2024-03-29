'use client';
import { cn } from '@/lib/utils';
import { type CartInfo } from '@/types';
import { Menu, User2, X } from 'lucide-react';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import GoogleSVG from 'public/svg/google.svg';
import LogoSVG from 'public/svg/logo.svg';
import { useBoolean, useLockBodyScroll } from 'react-use';
import { CartSheet } from './CartSheet';
import { SearchBar } from './SearchBar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

type NavProps = {
  session: Session | null;
  cart: CartInfo | null;
};

export const Nav: React.FC<NavProps> = ({ session, cart }) => {
  const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useBoolean(false);
  useLockBodyScroll(isMobileMenuOpen);

  return (
    <>
      <div className="container flex h-16 w-full items-center" id="navigation">
        <Button
          id="mobile-menu-button"
          data-testid="mobile-menu-button"
          aria-roledescription="Toggle Mobile Menu"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Mobile Menu"
          className="absolute left-3 z-50 block md:hidden"
          variant={'ghost'}
          size={'sm'}
          onClick={toggleIsMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-6" /> : <Menu className="h-6" />}
        </Button>

        <Link href="/" className="ml-20 md:ml-0">
          <LogoSVG className="h-6" />
          <span className="sr-only">Xenon</span>
        </Link>
        <NavigationMenu className="ml-auto">
          <div className="hidden px-1 md:block">
            <SearchBar />
          </div>
          <NavigationMenuList>
            <Sheet>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant={'ghost'}>
                    <User2 />
                    <span className="sr-only">Account</span>
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
                              <Link href="/studio">Content Studio</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href="/manage/products">
                                Store Management
                              </Link>
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
                  <SheetTitle>Sign In to Xenon</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col items-center justify-center gap-5 py-10">
                  <Button
                    onClick={() => signIn('google')}
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

      <nav
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 bg-background transition-opacity duration-300 ease-in-out',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-10 py-10 text-2xl font-semibold">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>
    </>
  );
};
