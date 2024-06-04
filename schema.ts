import { AdapterAccount } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { OrderMetadata, ProductMetadata } from './types';

export const role = pgEnum('Role', ['USER', 'ADMIN']);
export const orderStatus = pgEnum('OrderStatus', [
  'CANCELLED',
  'COMPLETED',
  'SHIPPED',
  'PENDING',
]);
export const returnStatus = pgEnum('ReturnStatus', [
  'REFUNDED',
  'RECEIVED',
  'PENDING',
]);

export const sessionTable = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid('userId')
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

export const accountTable = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
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

export const userTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    role: role('role').default('USER').notNull(),
    name: text('name'),
    email: text('email'),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
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

  cart: one(cartTable, {
    fields: [userTable.id],
    references: [cartTable.userId],
  }),
}));

export const productTable = pgTable(
  'product',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    description: text('description').notNull(),
    price: integer('price').notNull(),
    stock: integer('stock').default(0).notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    images: text('images').array(),
    metadata: jsonb('metadata').$type<ProductMetadata>(),
  },
  (product) => {
    return {
      slugKey: uniqueIndex('product_slug_key').on(product.slug),
      titleKey: uniqueIndex('product_title_key').on(product.title),
    };
  },
);

export const productRelations = relations(productTable, ({ one, many }) => ({
  categories: many(productCategoryTable),
  orders: many(orderItemTable),
  reviews: many(reviewTable),
}));

export const orderItemTable = pgTable(
  'orderItem',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    quantity: integer('quantity').notNull(),
    productId: uuid('productId')
      .notNull()
      .references(() => productTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    orderId: uuid('orderId')
      .notNull()
      .references(() => orderTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (orderItem) => {
    return {
      productIdOrderIdKey: uniqueIndex('orderItem_productId_orderId_key').on(
        orderItem.productId,
        orderItem.orderId,
      ),
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

export const categoryTable = pgTable(
  'category',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      titleKey: uniqueIndex('category_title_key').on(table.title),
    };
  },
);

export const categoryRelations = relations(categoryTable, ({ one, many }) => ({
  products: many(productCategoryTable),
}));

export const cartTable = pgTable(
  'cart',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: uuid('userId').references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', {
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

export const cartItemTable = pgTable(
  'cartItem',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    quantity: integer('quantity').notNull(),
    productId: uuid('productId')
      .notNull()
      .references(() => productTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    cartId: uuid('cartId')
      .notNull()
      .references(() => cartTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      productIdCartIdKey: uniqueIndex('cartItem_productId_cartId_key').on(
        table.productId,
        table.cartId,
      ),
    };
  },
);

export const cartItemRelations = relations(cartItemTable, ({ one, many }) => ({
  product: one(productTable, {
    fields: [cartItemTable.productId],
    references: [productTable.id],
  }),
  cart: one(cartTable, {
    fields: [cartItemTable.cartId],
    references: [cartTable.id],
  }),
}));

export const productCategoryTable = pgTable(
  '_productCategory',
  {
    productId: uuid('productId')
      .notNull()
      .references(() => productTable.id),
    categoryId: uuid('categoryId')
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
  productCategoryTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productCategoryTable.productId],
      references: [productTable.id],
    }),
    category: one(categoryTable, {
      fields: [productCategoryTable.categoryId],
      references: [categoryTable.id],
    }),
  }),
);

export const reviewTable = pgTable('review', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  rating: integer('rating').notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  productId: uuid('productId')
    .notNull()
    .references(() => productTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  userId: uuid('userId')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' })
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

export const orderTable = pgTable('order', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  status: orderStatus('status').default('PENDING').notNull(),
  total: integer('total').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid('userId').references(() => userTable.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  city: text('city'),
  country: text('country'),
  email: text('email'),
  name: text('name'),
  state: text('state'),
  zip: text('zip'),
  address1: text('address1'),
  address2: text('address2'),
  metadata: jsonb('metadata').$type<OrderMetadata>(),
});

export const orderRelations = relations(orderTable, ({ one, many }) => ({
  items: many(orderItemTable),

  user: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
}));

export const returnItemTable = pgTable(
  'returnItem',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    quantity: integer('quantity').notNull(),
    productId: uuid('productId')
      .notNull()
      .references(() => productTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    orderId: uuid('orderId')
      .notNull()
      .references(() => orderTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', {
      mode: 'date',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    returnId: uuid('returnId').references(() => returnTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      productIdOrderIdKey: uniqueIndex('returnItem_productId_orderId_key').on(
        table.productId,
        table.orderId,
      ),
    };
  },
);

export const returnItemRelations = relations(
  returnItemTable,
  ({ one, many }) => ({
    product: one(productTable, {
      fields: [returnItemTable.productId],
      references: [productTable.id],
    }),
    order: one(orderTable, {
      fields: [returnItemTable.orderId],
      references: [orderTable.id],
    }),
    return: one(returnTable, {
      fields: [returnItemTable.returnId],
      references: [returnTable.id],
    }),
  }),
);

export const returnTable = pgTable('return', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  orderId: uuid('orderId')
    .notNull()
    .references(() => orderTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid('userId')
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
