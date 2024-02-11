'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type RouteSelectorProps = {
  routes?: { name: string; path: string }[];
  className?: string;
};

export const RouteSelector: React.FC<RouteSelectorProps> = ({
  routes,
  className,
}) => {
  const pathname = usePathname();

  if (routes === undefined) {
    return null;
  }

  return (
    <>
      <div
        id="route-selector"
        className={cn('container flex items-center gap-2', className)}
        data-testid="route-selector"
      >
        {routes.map((route) => (
          <Button
            key={route.name}
            className="flex-1"
            asChild
            variant={pathname === route.path ? 'default' : 'secondary'}
            aria-current={pathname === route.path ? true : false}
            role="link"
            aria-label={route.name}
          >
            <Link href={`${route.path}`}>{route.name}</Link>
          </Button>
        ))}
      </div>
    </>
  );
};
