'use client'

import { useRouter } from 'next/navigation'
import { Pagination } from './Pagination'

type SearchParamPaginationProps = {
  currentPage: number
  totalPages: number
}

export const SearchParamPagination: React.FC<SearchParamPaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const router = useRouter()
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      setPage={(value) => {
        router.push(`?page=${value}`)
      }}
    />
  )
}
