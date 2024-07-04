'use client';

import { capitalize, cn } from '@/lib/utils';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

type BreadcrumbComponentProps = {
  className?: string;
  homeHref?: string;
};

export const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  className,
  homeHref,
}) => {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter((part) => part !== '');

  return (
    <>
      <Breadcrumb className={cn(className)}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={homeHref ?? '/'}>
                <Home size={16} />
                <span className="sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${pathParts.slice(0, index + 1).join('/')}`}>
                    {capitalize(part).slice(0, 25) +
                      (part.length > 25 ? '...' : '')}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
