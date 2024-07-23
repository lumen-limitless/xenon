import { relations } from 'drizzle-orm';
import {
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';
import type {
  OrderMetadata,
  ProductAttribute,
  ProductMetadata,
  ProductVariant,
} from './types';

export const role = pgEnum('Role', ['USER', 'ADMIN', 'SUPER_ADMIN']);

export const productStatus = pgEnum('ProductStatus', [
  'DRAFT',
  'PUBLISHED',
  'ARCHIVED',
]);

export const orderStatus = pgEnum('OrderStatus', [
  'CANCELLED',
  'COMPLETED',
  'SHIPPED',
  'PAID',
]);

export const returnStatus = pgEnum('ReturnStatus', [
  'REFUNDED',
  'RECEIVED',
  'PENDING',
]);

export const addressType = pgEnum('AddressType', ['BILLING', 'SHIPPING']);

// Sessions
export const sessionTable = pgTable('session', {
  sessionToken: text('session_token').notNull().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const sessionRelations = relations(sessionTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

// Verification Tokens
export const verificationTokenTable = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// Accounts
export const accountTable = pgTable(
  'account',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountRelations = relations(accountTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}));

// Users
export const userTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    role: role('role').default('USER').notNull(),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    lastSeenAt: timestamp('last_seen_at', { mode: 'date' }).defaultNow(),
  },
  (user) => {
    return {
      emailKey: uniqueIndex('user_email_key').on(user.email),
    };
  },
);

export const userRelations = relations(userTable, ({ one, many }) => ({
  accounts: many(accountTable),
  sessions: many(sessionTable),
  orders: many(orderTable),
  reviews: many(reviewTable),
  notifications: many(notificationTable),
  cart: one(cartTable, {
    fields: [userTable.id],
    references: [cartTable.userId],
  }),
}));

// Notifications
export const notificationTable = pgTable('notification', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  message: text('message').notNull(),
  read: timestamp('read', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const notificationRelations = relations(
  notificationTable,
  ({ one, many }) => ({
    user: one(userTable, {
      fields: [notificationTable.userId],
      references: [userTable.id],
    }),
  }),
);

// Products
export const productTable = pgTable(
  'product',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    sku: text('sku').notNull(),
    shortDescription: varchar('short_description', { length: 255 }),
    productDescription: text('product_description'),
    note: text('note'),
    status: productStatus('status').default('DRAFT').notNull(),
    images: text('images').array(),
    price: integer('price').notNull().default(0),
    salePrice: integer('sale_price'),
    stock: integer('stock'),
    variants: jsonb('variants')
      .notNull()
      .default([])
      .$type<Array<ProductVariant>>(),
    attributes: jsonb('attributes')
      .notNull()
      .default([])
      .$type<Array<ProductAttribute>>(),
    metadata: jsonb('metadata')
      .notNull()
      .default({
        details: {},
      })
      .$type<ProductMetadata>(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    createdBy: uuid('created_by'),
    updatedBy: uuid('updated_by'),
  },
  (product) => {
    return {
      slugKey: uniqueIndex('product_slug_key').on(product.slug),
    };
  },
);

export const productRelations = relations(productTable, ({ one, many }) => ({
  orders: many(orderItemTable),
  reviews: many(reviewTable),
  // variants: many(variantTable),
  productsToCategories: many(productToCategoryTable),
  // productsToAttributes: many(productToAttributeTable),
}));

// Product Attributes
// export const productToAttributeTable = pgTable(
//   'product_to_attribute',
//   {
//     productId: uuid('product_id')
//       .notNull()
//       .references(() => productTable.id),
//     attributeId: uuid('attribute_id')
//       .notNull()
//       .references(() => attributeTable.id),
//   },
//   (t) => ({
//     pk: primaryKey({
//       columns: [t.productId, t.attributeId],
//     }),
//   }),
// );

// export const productToAttributeRelations = relations(
//   productToAttributeTable,
//   ({ one, many }) => ({
//     product: one(productTable, {
//       fields: [productToAttributeTable.productId],
//       references: [productTable.id],
//     }),
//     attribute: one(attributeTable, {
//       fields: [productToAttributeTable.attributeId],
//       references: [attributeTable.id],
//     }),
//   }),
// );

// Attributes
// export const attributeTable = pgTable('attribute', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   attributeName: varchar('attribute_name', { length: 255 }),
// });

// export const attributeRelations = relations(
//   attributeTable,
//   ({ one, many }) => ({
//     productsToAttributes: many(productToAttributeTable),
//     attributeValues: many(attributeValueTable),
//   }),
// );

// Attribute Values
// export const attributeValueTable = pgTable('attribute_value', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   attributeId: uuid('attribute_id').references(() => attributeTable.id),
//   value: varchar('value', { length: 255 }),
// });

// export const attributeValueRelations = relations(
//   attributeValueTable,
//   ({ one, many }) => ({
//     attribute: one(attributeTable, {
//       fields: [attributeValueTable.attributeId],
//       references: [attributeTable.id],
//     }),
//   }),
// );

// Variants
// export const variantTable = pgTable('variant', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   productId: uuid('product_id').references(() => productTable.id),
//   sku: varchar('sku', { length: 255 }).unique(),
//   price: integer('price').notNull(),
//   salePrice: integer('sale_price'),
//   weight: integer('weight').default(0),
//   stock: integer('stock'),
// });

// export const variantRelations = relations(variantTable, ({ one, many }) => ({
//   product: one(productTable, {
//     fields: [variantTable.productId],
//     references: [productTable.id],
//   }),
//   // variantValues: many(variantValueTable),
// }));

// Variant Values
// export const variantValueTable = pgTable('variant_value', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   variantId: uuid('variant_id').references(() => variantTable.id),
//   attributeValueId: uuid('attribute_value_id').references(
//     () => attributeValueTable.id,
//   ),
// });

// export const variantValueRelations = relations(
//   variantValueTable,
//   ({ one, many }) => ({
//     variant: one(variantTable, {
//       fields: [variantValueTable.variantId],
//       references: [variantTable.id],
//     }),
//     attributeValue: one(attributeValueTable, {
//       fields: [variantValueTable.attributeValueId],
//       references: [attributeValueTable.id],
//     }),
//   }),
// );

// Categories
export const categoryTable = pgTable(
  'category',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    description: text('description'),
    icon: text('icon'),
    image: text('image'),
    parentCategoryId: uuid('parent_category_id'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      slugKey: uniqueIndex('category_slug_key').on(table.slug),
    };
  },
);

export const categoryRelations = relations(categoryTable, ({ one, many }) => ({
  productsToCategories: many(productToCategoryTable),
  parentCategory: one(categoryTable, {
    fields: [categoryTable.parentCategoryId],
    references: [categoryTable.id],
  }),
}));

// Product Categories
export const productToCategoryTable = pgTable(
  'product_to_category',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => productTable.id),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categoryTable.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.productId, t.categoryId],
    }),
  }),
);

export const productCategoryRelations = relations(
  productToCategoryTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productToCategoryTable.productId],
      references: [productTable.id],
    }),
    category: one(categoryTable, {
      fields: [productToCategoryTable.categoryId],
      references: [categoryTable.id],
    }),
  }),
);

// Coupons
export const couponTable = pgTable('coupon', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }),
  description: text('description'),
  discountValue: numeric('discount_value'),
  discountType: varchar('discount_type', { length: 50 }),
  timesUsed: integer('times_used'),
  maxUsage: integer('max_usage'),
  couponStartDate: timestamp('coupon_start_date'),
  couponEndDate: timestamp('coupon_end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  createdBy: uuid('created_by'),
  updatedBy: uuid('updated_by'),
});

export const couponRelations = relations(couponTable, ({ many }) => ({
  orders: many(orderTable),
}));

// Carts
export const cartTable = pgTable(
  'cart',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: uuid('user_id').references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex('cart_userId_key').on(table.userId),
    };
  },
);

export const cartRelations = relations(cartTable, ({ one, many }) => ({
  items: many(cartItemTable),
  user: one(userTable, {
    fields: [cartTable.userId],
    references: [userTable.id],
  }),
}));

// Cart Items
export const cartItemTable = pgTable(
  'cart_item',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    quantity: integer('quantity').notNull(),
    productId: uuid('product_id')
      .notNull()
      .references(() => productTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    variantId: text('variant_id'),
    cartId: uuid('cart_id')
      .notNull()
      .references(() => cartTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      // productIdCartIdKey: uniqueIndex('cartItem_productId_cartId_key').on(
      //   table.productId,
      //   table.cartId,
      // ),

      productIdVariantIdKey: uniqueIndex(
        'cart_item__product_id__variant_id__key',
      ).on(table.productId, table.variantId),
    };
  },
);

export const cartItemRelations = relations(cartItemTable, ({ one, many }) => ({
  product: one(productTable, {
    fields: [cartItemTable.productId],
    references: [productTable.id],
  }),
  // variant: one(variantTable, {
  //   fields: [cartItemTable.variantId],
  //   references: [variantTable.id],
  // }),
  cart: one(cartTable, {
    fields: [cartItemTable.cartId],
    references: [cartTable.id],
  }),
}));

// Addresses
export const addressTable = pgTable('address', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  type: addressType('type'),
  userId: uuid('user_id').references(() => userTable.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  city: varchar('city', { length: 50 }),
  country: varchar('country', { length: 50 }),
  email: text('email'),
  name: text('name'),
  state: text('state'),
  zip: varchar('zip', { length: 50 }),
  phone: varchar('phone', { length: 50 }),
  address1: text('address1'),
  address2: text('address2'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const addressRelations = relations(addressTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [addressTable.userId],
    references: [userTable.id],
  }),
}));

// Orders
export const orderTable = pgTable('order', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  status: orderStatus('status').default('PAID').notNull(),
  total: integer('total').notNull(),
  subtotal: integer('subtotal').notNull(),
  tax: integer('tax').notNull(),
  shipping: integer('shipping').notNull(),
  couponId: uuid('coupon_id').references(() => couponTable.id),
  userId: uuid('user_id').references(() => userTable.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  city: text('city'),
  country: text('country'),
  email: text('email'),
  name: text('name'),
  state: text('state'),
  zip: text('zip'),
  phone: text('phone'),
  address1: text('address1'),
  address2: text('address2'),
  metadata: jsonb('metadata').$type<OrderMetadata>(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const orderRelations = relations(orderTable, ({ one, many }) => ({
  items: many(orderItemTable),
  coupon: one(couponTable, {
    fields: [orderTable.couponId],
    references: [couponTable.id],
  }),
  user: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
}));

// Order Items
export const orderItemTable = pgTable(
  'order_item',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
    productId: uuid('product_id')
      .notNull()
      .references(() => productTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    variantId: text('variant_id'),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orderTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      productIdVariantIdKey: uniqueIndex(
        'order_item__product_id__variant_id__key',
      ).on(table.productId, table.variantId),
    };
  },
);

export const orderItemRelations = relations(
  orderItemTable,
  ({ one, many }) => ({
    product: one(productTable, {
      fields: [orderItemTable.productId],
      references: [productTable.id],
    }),
    order: one(orderTable, {
      fields: [orderItemTable.orderId],
      references: [orderTable.id],
    }),
  }),
);

// Returns
export const returnTable = pgTable('return', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orderTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  status: returnStatus('status').default('PENDING').notNull(),
});

export const returnRelations = relations(returnTable, ({ one, many }) => ({
  items: many(returnItemTable),
}));

// Return Items
export const returnItemTable = pgTable('returnItem', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  quantity: integer('quantity').notNull(),
  orderItem: uuid('order_item_id')
    .references(() => orderItemTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  returnId: uuid('returnId').references(() => returnTable.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
});

export const returnItemRelations = relations(
  returnItemTable,
  ({ one, many }) => ({
    orderItem: one(orderItemTable, {
      fields: [returnItemTable.orderItem],
      references: [orderItemTable.id],
    }),
    return: one(returnTable, {
      fields: [returnItemTable.returnId],
      references: [returnTable.id],
    }),
  }),
);

// Reviews
export const reviewTable = pgTable('review', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  rating: integer('rating').notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  productId: uuid('product_id')
    .notNull()
    .references(() => productTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const reviewRelations = relations(reviewTable, ({ one, many }) => ({
  product: one(productTable, {
    fields: [reviewTable.productId],
    references: [productTable.id],
  }),
  user: one(userTable, {
    fields: [reviewTable.userId],
    references: [userTable.id],
  }),
}));
