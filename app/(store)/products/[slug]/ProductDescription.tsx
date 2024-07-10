'use client';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ProductDescriptionProps = {
  description?: string;
};

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setShowGradient(
        contentRef.current.scrollHeight > contentRef.current.clientHeight,
      );
    }
  }, [description]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="relative">
      <h2 className="mb-2 text-xl font-semibold">Description</h2>
      <div
        ref={contentRef}
        className={cn(
          'prose break-words text-muted-foreground',
          isExpanded ? 'h-auto' : 'h-24 overflow-hidden',
        )}
      >
        <p>{description}</p>
      </div>
      {showGradient && !isExpanded && (
        <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
      )}
      {showGradient && (
        <button
          onClick={toggleExpand}
          className={cn(
            'absolute mt-2 flex items-center justify-center hover:underline',
            isExpanded && 'flex-row-reverse',
          )}
          aria-expanded={isExpanded}
          aria-controls="product-description-content"
        >
          <span>{isExpanded ? 'Read less' : 'Read more'}</span>
          {isExpanded ? (
            <ChevronUp className="ml-1" aria-hidden="true" />
          ) : (
            <ChevronDown className="ml-1" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
};
