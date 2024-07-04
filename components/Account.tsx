'use client';

import { User2 } from 'lucide-react';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import GoogleSVG from 'public/svg/google.svg';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

type AccountProps = {
  session: Session | null;
};

export const Account: React.FC<AccountProps> = ({ session }) => {
  return (
    <>
      <Sheet>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'}>
              <Avatar className="h-6 w-6">
                <AvatarImage src={session?.user.image ?? ''} />
                <AvatarFallback>
                  <User2 className="h-6" />
                </AvatarFallback>
              </Avatar>
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
                        <Link href="/studio">Content Studio</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/manage/products">Store Management</Link>
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
    </>
  );
};
