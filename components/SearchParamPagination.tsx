'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const otherSearchParams = Array.from(searchParams.entries()).filter(
    ([key]) => key !== 'page',
  )

  console.log(otherSearchParams)
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      setPage={(value) => {
        router.push(
          `${pathname}${
            otherSearchParams.length > 0 ? '?' : ''
          }${otherSearchParams.map((searchParam, i) => {
            const [key, value] = searchParam
            return (
              `${key}=${value}` +
              (i === otherSearchParams.length - 1 ? '' : '&')
            )
          })}&page=${value}`,
        )
      }}
    />
  )
}
