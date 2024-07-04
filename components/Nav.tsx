'use client';
import { cn } from '@/lib/utils';
import { type CartInfo } from '@/types';
import { Menu, X } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import LogoSVG from 'public/svg/logo.svg';
import { useBoolean, useLockBodyScroll } from 'react-use';
import { Account } from './Account';
import { CartSheet } from './CartSheet';
import { SearchBar } from './SearchBar';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';

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
          className="left-3 z-50 block md:hidden"
          variant={'ghost'}
          size={'sm'}
          onClick={toggleIsMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-6" /> : <Menu className="h-6" />}
        </Button>

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
