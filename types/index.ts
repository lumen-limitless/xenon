import type {
  attributeTable,
  attributeValueTable,
  cartItemTable,
  cartTable,
  categoryTable,
  orderItemTable,
  orderTable,
  productTable,
  productToAttributeTable,
  productToCategoryTable,
  reviewTable,
  userTable,
  variantTable,
  variantValueTable,
} from '@/schema';

// metadata types
export type ProductMetadata = {
  details?: Record<string, string | string[] | undefined>;
} | null;

export type OrderMetadata = {
  checkoutSessionId?: string;
  paymentIntentId?: string;
} | null;

// schema types
export type User = typeof userTable.$inferSelect;

export type Cart = typeof cartTable.$inferSelect;

export type CartItem = typeof cartItemTable.$inferSelect;

export type Product = typeof productTable.$inferSelect;

export type ProductWithVariants = ProductWithVariantsAndAttributes;

export type ProductWithVariantsAndAttributes =
  typeof productTable.$inferSelect & {
    productsToAttributes: Array<
      ProductToAttribute & {
        attribute: Attribute & {
          attributeValues: Array<AttributeValue>;
        };
      }
    >;
    variants: Array<
      Variant & {
        variantValues: Array<VariantValue>;
      }
    >;
  };

export type Variant = typeof variantTable.$inferSelect;

export type VariantValue = typeof variantValueTable.$inferSelect;

export type Attribute = typeof attributeTable.$inferSelect;

export type AttributeValue = typeof attributeValueTable.$inferSelect;

export type ProductToAttribute = typeof productToAttributeTable.$inferSelect;

export type Category = typeof categoryTable.$inferSelect;

export type Review = typeof reviewTable.$inferSelect;

export type CartWithProducts = typeof cartTable.$inferSelect & {
  items: Array<
    typeof cartItemTable.$inferSelect & {
      product: typeof productTable.$inferSelect;
    }
  >;
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
