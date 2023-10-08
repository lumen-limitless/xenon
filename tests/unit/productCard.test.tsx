import ProductCard from '@/components/ProductCard'
import { Product } from '@prisma/client'
import { render } from '@testing-library/react'

describe('ProductCard', () => {
  const product: Product = {
    id: '1',
    title: 'Product 1',
    price: 1099,
    image: 'https://example.com/product1.jpg',
    description: 'Product 1 description',
    createdAt: new Date(),
    updatedAt: new Date(),
    category: '',
  }

  it('renders successfully', () => {
    const { asFragment } = render(<ProductCard product={product} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
