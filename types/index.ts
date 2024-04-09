import type {
  cartItemTable,
  cartTable,
  categoryTable,
  orderItemTable,
  orderTable,
  productCategoryTable,
  productTable,
  reviewTable,
  userTable,
} from '@/schema';

export type ProductMetadata = {
  size?: string;
} | null;

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

export type OrderMetadata = {
  checkoutSessionId?: string;
  paymentIntentId?: string;
} | null;

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
    typeof productCategoryTable.$inferSelect & {
      category: typeof categoryTable.$inferSelect;
    }
  >;
};

export type UserWithCartAndOrders = typeof userTable.$inferSelect & {
  cart: typeof cartTable.$inferSelect;
  orders: Array<typeof orderTable.$inferSelect>;
};
