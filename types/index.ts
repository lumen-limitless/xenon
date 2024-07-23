import type {
  cartItemTable,
  cartTable,
  categoryTable,
  orderItemTable,
  orderTable,
  productTable,
  productToCategoryTable,
  reviewTable,
  userTable,
} from '@/schema';

/**
 * Represents the metadata for a product.
 */
export type ProductMetadata = {
  /**
   * A record of product details.
   * The keys are string identifiers for the details,
   * and the values can be either a string, an array of strings, or undefined.
   */
  details: Record<string, string | string[] | undefined>;
};

export type ProductAttribute = {
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  imageIndex: number;
  sku: string;
  customPrice?: number;
  stock: number;
  attributes: Record<string, string>;
};

export type OrderMetadata = {
  checkoutSessionId?: string;
  paymentIntentId?: string;
} | null;

// Base attributes that all products share
// type BaseAttributes = Record<string, string | number | boolean | undefined>;

// Specific attribute types for different product categories
// interface ClothingAttributes extends BaseAttributes {
//   productType: 'clothing';
//   size: string;
//   color: string;
//   material: string;
// }

// interface ElectronicsAttributes extends BaseAttributes {
//   productType: 'electronics';
//   brand: string;
//   model: string;
//   warrantyMonths: number;
// }

// Union type for all possible variant attributes
// export type VariantAttributes = ClothingAttributes | ElectronicsAttributes;

// schema types
export type User = typeof userTable.$inferSelect;

export type Cart = typeof cartTable.$inferSelect;

export type Product = typeof productTable.$inferSelect;

// export type ProductWithVariants = typeof productTable.$inferSelect & {
//   variants: Array<Variant>;
// };

// export type Variant = typeof variantTable.$inferSelect;

export type Category = typeof categoryTable.$inferSelect;

export type Review = typeof reviewTable.$inferSelect;

export type CartItem = typeof cartItemTable.$inferSelect;

export type CartItemWithProduct = CartItem & {
  product: Product;
};
export type CartWithProducts = typeof cartTable.$inferSelect & {
  items: Array<CartItemWithProduct>;
};

export interface CartInfo extends CartWithProducts {
  size: number;
  subtotal: number;
}

export type OrderWithItemsAndProducts = typeof orderTable.$inferSelect & {
  items: Array<
    typeof orderItemTable.$inferSelect & {
      product: typeof productTable.$inferSelect;
    }
  >;
};

export type ProductWithReviews = typeof productTable.$inferSelect & {
  reviews: Array<typeof reviewTable.$inferSelect>;
};

export type ProductWithCategories = typeof productTable.$inferSelect & {
  categories: Array<
    typeof productToCategoryTable.$inferSelect & {
      category: typeof categoryTable.$inferSelect;
    }
  >;
};

export type UserWithCartAndOrders = typeof userTable.$inferSelect & {
  cart: typeof cartTable.$inferSelect;
  orders: Array<typeof orderTable.$inferSelect>;
};
