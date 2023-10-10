import ProductCard from '@/components/ProductCard'
import { Product } from '@prisma/client'
import { render } from '@testing-library/react'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const pushMock = jest.fn()

describe('ProductCard', () => {
  const product: Product = {
    id: '1',
    title: 'Product 1',
    price: 1099,
    image: 'https://example.com/product1.jpg',
    description: 'Product 1 description',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('should match snapshot', () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: pushMock,
    })

    const { asFragment } = render(<ProductCard product={product} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
