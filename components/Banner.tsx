'use client';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import { Slideshow } from './slideshow';

type BannerProps = {};

export const Banner: React.FC<BannerProps> = ({}) => {
  return (
    <div
      className={cn(
        'relative flex w-full items-center justify-center bg-foreground px-5 py-2 text-background backdrop-blur',
      )}
    >
      <Slideshow autoScroll>
        <p className="truncate text-nowrap">
          This is an example ecommerce web application
        </p>
        <p className="truncate text-nowrap">
          It is built using Next.js, TailwindCSS, and TypeScript
        </p>
      </Slideshow>

      <a className="hidden items-center gap-1 md:flex" href="tel:111-123-4567">
        <MessageSquare className="h-6 stroke-background" />
        <p className="whitespace-nowrap">Chat or Call (111) 123-4567</p>
      </a>
    </div>
  );
};
