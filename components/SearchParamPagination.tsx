'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

type SearchParamPaginationProps = {
  totalPages: number;
};

export const SearchParamPagination: React.FC<SearchParamPaginationProps> = ({
  totalPages,
}) => {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1');

  const getPaginationLink = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={getPaginationLink(currentPage - 1)}
              aria-disabled={!currentPage || currentPage === 1}
            />
          </PaginationItem>
        )}

        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
          return (
            <PaginationItem key={i}>
              <PaginationLink href={getPaginationLink(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 6 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPages > 6 &&
          Array.from({ length: 3 }, (_, i) => {
            return (
              <PaginationItem key={i + totalPages - 3}>
                <PaginationLink href={getPaginationLink(i + totalPages - 2)}>
                  {i + totalPages - 2}
                </PaginationLink>
              </PaginationItem>
            );
          })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={getPaginationLink(currentPage + 1)}
              aria-disabled={!currentPage || currentPage === 1}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
