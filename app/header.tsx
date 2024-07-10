// "use client";

import { auth } from '@/auth';
import { Nav } from '@/components/Nav';
import { SearchBar } from '@/components/SearchBar';
import { getCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

const scrollThreshold = 100;

type HeaderProps = {};

const Header: React.FC<HeaderProps> = async () => {
  const session = await auth();
  const cart = await getCart();

  return (
    <header
      id="header"
      className={cn(
        'z-40 w-full border-b bg-background transition-all duration-300 ease-in-out',
        // visible ? 'translate-y-0' : '-translate-y-[200%]',
      )}
    >
      <Nav session={session} cart={cart} />
      <div className="bg-background">
        <div className="container flex py-1 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
