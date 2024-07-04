import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_DESCRIPTION } from '@/lib/constants';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative flex flex-col bg-foreground text-background"
    >
      <section className="h-72 py-10">
        <div className="container flex flex-col justify-between md:flex-row">
          <div>
            <Logo className="h-12" />
            <p className="text-muted">{APP_DESCRIPTION}</p>
          </div>

          <form className="w-full max-w-96 py-5">
            <h3 className="md:text-right">Subscribe for exclusive offers</h3>
            <div className="relative">
              <Input
                placeholder="Enter your email"
                className="mt-2 py-6 text-foreground"
                type="email"
                required
              />

              <Button className="absolute right-2 top-2" size={'sm'}>
                Subscribe
              </Button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground md:text-right md:text-sm">
              By subscribing, you agree to our{' '}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </section>
      <section className="py-10"></section>
      <div className="mt-auto border-t border-gray-800 py-5">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Lumen Limitless. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
