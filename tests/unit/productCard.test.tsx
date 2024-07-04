jest.mock('@/lib/actions', () => ({
  updateCartAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';
import { render } from '@testing-library/react';

describe('ProductCard', () => {
  const product: Partial<Product> = {
    id: '1',
    sku: 'product-1',
    title: 'Product 1',
    slug: 'product-1',
    weight: 10,
    status: 'PUBLISHED',
    regularPrice: 1099,
    salePrice: 999,
    stock: 10,
    images: ['https://example.com/product1.jpg'],
    productDescription: 'Product 1 description',
    shortDescription: 'Product 1 short description',
    note: '',
    metadata: {
      size: 'large',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '',
    updatedBy: '',
  };

  it('should match snapshot', () => {
    const { asFragment } = render(<ProductCard product={product as Product} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display nothing if product is undefined', () => {
    const { container } = render(<ProductCard product={undefined} />);

    expect(container.firstChild).toBeNull();
  });
});
