import { auth } from '@/auth';
import { Nav } from '@/components/nav';
import { SearchBar } from '@/components/search-bar';
import { getCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

type HeaderProps = {};

async function Header() {
  const [session, cart] = await Promise.all([auth(), getCart()]);

  return (
    <header
      id="header"
      className={cn(
        'z-40 w-full border-b bg-background transition-all duration-300 ease-in-out',
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
}

export default Header;
