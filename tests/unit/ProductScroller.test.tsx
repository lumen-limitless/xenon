jest.mock('@/lib/actions', () => ({
  updateCartAction: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

import { ProductScroller } from '@/components/ProductScroller'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('ProductScroller', () => {
  const products = [
    {
      id: '1',
      title: 'Product 1',
      slug: 'product-1',
      price: 1099,
      stock: 10,
      images: ['https://example.com/product1.jpg'],
      description: 'Product 1 description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Product 2',
      slug: 'product-2',
      price: 999,
      stock: 5,
      images: ['https://example.com/product2.jpg'],
      description: 'Product 2 description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  it('should match snapshot', () => {
    const { container } = render(<ProductScroller products={products} />)

    expect(container).toMatchSnapshot()
  })

  it('should render product cards when products are provided', () => {
    const { getAllByTestId } = render(<ProductScroller products={products} />)
    const productCards = getAllByTestId('product-card')

    expect(productCards.length).toBe(products.length)
  })

  it('should render no product cards when products are not provided', () => {
    const { queryByTestId } = render(<ProductScroller />)
    const productCards = queryByTestId('product-card')

    expect(productCards).toBeNull()
  })

  it('should render title when provided', () => {
    const title = 'Test Title'
    const { getByText } = render(
      <ProductScroller title={title} products={products} />,
    )
    const titleElement = getByText(title)

    expect(titleElement).toBeInTheDocument()
  })
})
