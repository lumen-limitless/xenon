'use client';
import type { CartInfo } from '@/types';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Menu } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import LogoSVG from 'public/svg/logo.svg';
import { Account } from './account';
import { CartSheet } from './cart-sheet';
import { SearchBar } from './search-bar';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

type NavProps = {
  session: Session | null;
  cart: CartInfo | null;
};

export const Nav: React.FC<NavProps> = ({ session, cart }) => {
  return (
    <>
      <div className="container flex h-16 w-full items-center" id="navigation">
        <MobileNav />

        <Link href="/" className="ml-2 md:ml-0">
          <LogoSVG className="h-6" />
          <span className="sr-only">Xenon</span>
        </Link>
        <NavigationMenu className="ml-auto">
          <div className="hidden px-1 md:block">
            <SearchBar />
          </div>
          <NavigationMenuList>
            <Account session={session} />

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
    </>
  );
};

type MobileNavProps = {};

export const MobileNav: React.FC<MobileNavProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open mobile menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate our store</SheetDescription>
        </SheetHeader>
        <nav
          className="flex flex-col space-y-4 py-4"
          id="mobile-nav"
          aria-label="navigation"
        >
          <Link href="/" className="text-lg font-medium hover:underline">
            Home
          </Link>
          <Link
            href="/products"
            className="text-lg font-medium hover:underline"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="text-lg font-medium hover:underline"
          >
            Categories
          </Link>
          <Link href="/about" className="text-lg font-medium hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-lg font-medium hover:underline">
            Contact
          </Link>
        </nav>
        <Separator className="my-4" />
      </SheetContent>
    </Sheet>
  );
};
