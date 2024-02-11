jest.mock('@/lib/actions', () => ({
  updateCartAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

import { ProductCard } from '@/components/ProductCard';
import { Product } from '@prisma/client';
import { render } from '@testing-library/react';

describe('ProductCard', () => {
  const product: Product = {
    id: '1',
    title: 'Product 1',
    slug: 'product-1',
    price: 1099,
    stock: 10,
    images: ['https://example.com/product1.jpg'],
    description: 'Product 1 description',
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should match snapshot', () => {
    const { asFragment } = render(<ProductCard product={product} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display nothing if product is undefined', () => {
    const { container } = render(<ProductCard product={undefined} />);

    expect(container.firstChild).toBeNull();
  });
});
