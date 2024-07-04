import { auth } from '@/auth';
import { cartItemTable, cartTable } from '@/schema';
import { Cart, CartWithProducts, type CartInfo } from '@/types';
import crypto from 'crypto';
import { asc, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from './drizzle';

function encryptCookieValue(value: string): string {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(process.env.COOKIE_SECRET!, 'salt', 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptCookieValue(value: string): string | undefined {
  try {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(process.env.COOKIE_SECRET!, 'salt', 32);
    const [iv, encrypted] = value.split(':');
    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, 'hex'),
    );

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Error decrypting cookie value:', err);
  }
}

function getLocalCartId(): string | undefined {
  const encryptedLocalCartId = cookies().get('localCartId')?.value;
  if (encryptedLocalCartId !== undefined) {
    return decryptCookieValue(encryptedLocalCartId);
  }
}

function setLocalCartId(cartId: string): void {
  const encryptedLocalCartId = encryptCookieValue(cartId);
  cookies().set('localCartId', encryptedLocalCartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function createCart(): Promise<CartInfo> {
  let newCart: Cart;

  const session = await auth();

  if (session) {
    newCart = (
      await db
        .insert(cartTable)
        .values({
          userId: session.user.id,
        })
        .returning()
    )[0];
  } else {
    newCart = (await db.insert(cartTable).values({}).returning())[0];

    setLocalCartId(newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export const getCart = async (): Promise<CartInfo | null> => {
  let cart: CartWithProducts | null = null;

  const session = await auth();

  if (session) {
    cart =
      (await db.query.cartTable.findFirst({
        where: eq(cartTable.userId, session.user.id),
        with: {
          items: {
            with: {
              product: true,
            },
            orderBy: asc(cartItemTable.updatedAt),
          },
        },
      })) ?? null;
  } else {
    const localCartId = getLocalCartId();

    cart = localCartId
      ? (await db.query.cartTable.findFirst({
          where: eq(cartTable.id, localCartId),
          with: {
            items: {
              orderBy: asc(cartItemTable.createdAt),
              with: {
                product: true,
              },
            },
          },
        })) ?? null
      : null;
  }

  if (cart === null) {
    return null;
  }

  return {
    ...cart,
    size: cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
    subtotal:
      cart?.items.reduce(
        (acc, item) =>
          acc +
          item.quantity * (item.product.salePrice ?? item.product.regularPrice),
        0,
      ) ?? 0,
  };
};

export async function mergeAnonymousCartWithUserCart(
  userId: string,
): Promise<void> {
  const localCartId = getLocalCartId();

  if (localCartId === undefined) {
    return;
  }

  const localCart = await db.query.cartTable.findFirst({
    where: eq(cartTable.id, localCartId),

    with: {
      items: true,
    },
  });

  if (localCart === undefined) {
    return;
  }

  const userCart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, userId),
    with: {
      items: true,
    },
  });

  const mergeCartItems = (
    ...cartItems: Array<Array<typeof cartItemTable.$inferInsert>>
  ): Array<typeof cartItemTable.$inferInsert> => {
    return cartItems.reduce((acc, items) => {
      items.forEach((item) => {
        const existingItem = acc.find((i) => i.productId === item.productId);

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push(item);
        }
      });

      return acc;
    }, []);
  };

  await db.transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      await tx
        .delete(cartItemTable)
        .where(eq(cartItemTable.cartId, userCart.id));

      await tx.insert(cartItemTable).values(
        mergedCartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      );
    } else {
      const newCart = (
        await tx
          .insert(cartTable)
          .values({
            userId,
          })
          .returning({
            id: cartTable.id,
          })
      )[0];

      await tx.insert(cartItemTable).values(
        localCart.items.map((item) => ({
          cartId: newCart.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      );
    }

    await tx.delete(cartTable).where(eq(cartTable.id, localCartId));

    cookies().set('localCartId', '');
  });
}
