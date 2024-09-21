import { auth } from '@/auth';
import { Account } from '@/components/account';
import { BreadcrumbComponent } from '@/components/breadcrumb-component';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminDesktopNav, AdminMobileNav } from './admin-nav';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (
    session === null ||
    (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')
  ) {
    return notFound();
  }

  return (
    <>
      <section className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminDesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <AdminMobileNav />
            <BreadcrumbComponent
              className="hidden md:flex"
              homeHref="/manage"
            />

            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <Account session={session} />
          </header>

          {children}
        </div>
      </section>
    </>
  );
}
