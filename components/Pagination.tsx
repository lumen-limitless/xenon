import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

type PaginationProps = {
  currentPage: number
  totalPages: number
  setPage: (value: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setPage,
}) => {
  const currentPageNumber = currentPage
  const pageNumbers: number[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPageNumber - 2 && i <= currentPageNumber + 2)
    ) {
      pageNumbers.push(i)
    }
  }

  if (totalPages <= 1) return null

  return (
    <>
      <div className="flex w-full items-center justify-center gap-3 py-3">
        <Button
          id="prev"
          size="icon"
          onClick={() => {
            setPage(currentPageNumber - 1)
          }}
          disabled={currentPageNumber === 1}
        >
          <ChevronLeftIcon />
          <span className="sr-only">Previous</span>
        </Button>

        {pageNumbers.map((pageNumber, idx) => {
          const isEllipsis = idx > 0 && pageNumbers[idx - 1] !== pageNumber - 1

          return (
            <React.Fragment key={pageNumber}>
              {isEllipsis && <span>...</span>}
              <Button
                id={pageNumber.toString()}
                size="icon"
                onClick={() => {
                  setPage(pageNumber)
                }}
                disabled={currentPageNumber === pageNumber}
                className={cn(currentPageNumber === pageNumber && 'active')}
              >
                {pageNumber}
              </Button>
            </React.Fragment>
          )
        })}

        <Button
          id="next"
          size="icon"
          onClick={() => {
            setPage(currentPageNumber + 1)
          }}
          disabled={currentPageNumber === totalPages}
        >
          <ChevronRightIcon />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </>
  )
}
