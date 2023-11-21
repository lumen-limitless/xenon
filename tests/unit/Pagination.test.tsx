import { Pagination } from '@/components/Pagination'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'

describe('Pagination', () => {
  const setPageMock = jest.fn()

  const renderPagination = (currentPage: number, totalPages: number) => {
    return render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPageMock}
      />,
    )
  }

  it('should render the correct number of page buttons', () => {
    const { getAllByRole } = renderPagination(1, 5)

    const pageButtons = getAllByRole('button')

    expect(pageButtons).toHaveLength(6)
  })

  it('should highlight the current page button', () => {
    const { getByText } = renderPagination(3, 5)

    const currentPageButton = getByText('3')

    expect(currentPageButton).toHaveClass('active')
  })

  it('should call setPage when a page button is clicked', () => {
    const { getByText } = renderPagination(1, 5)

    const pageButton = getByText('2')

    fireEvent.click(pageButton)

    expect(setPageMock).toHaveBeenCalledWith(2)
  })
})
