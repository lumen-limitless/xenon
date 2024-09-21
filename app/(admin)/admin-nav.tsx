'use client';

import {
  Boxes,
  Home,
  LineChart,
  LogOut,
  NotebookPen,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type AdminSideNavProps = {};

const navItems = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/manage/dashboard',
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    href: '/manage/orders',
  },
  {
    title: 'Products',
    icon: Package,
    href: '/manage/products',
  },
  {
    title: 'Users',
    icon: Users2,
    href: '/manage/users',
  },
  {
    title: 'Categories',
    icon: Boxes,
    href: '/manage/categories',
  },
  {
    title: 'Content Studio',
    icon: NotebookPen,
    href: '/studio',
  },
  {
    title: 'Analytics',
    icon: LineChart,
    href: '/manage/analytics',
  },
];

export const AdminDesktopNav: React.FC<AdminSideNavProps> = ({}) => {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {navItems.map((item) => (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : '',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/manage/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Leave Admin Panel</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Leave Admin Panel</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </>
  );
};

type AdminMobileNavProps = {};
export const AdminMobileNav: React.FC<AdminMobileNavProps> = ({}) => {
  const pathname = usePathname();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </Link>
            {navItems.map((item) => (
              <SheetClose asChild>
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-4 px-2.5',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </SheetClose>
            ))}
            <Link
              href="/"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Leave Admin Panel
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
