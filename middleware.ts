import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { auth } from './auth';
import { db } from './lib/drizzle';
import { userTable } from './schema';

export default auth(async (req) => {
  // maintenance mode middleware
  if (
    Boolean(process.env.MAINTENANCE_MODE) &&
    req.nextUrl.pathname !== '/maintenance'
  ) {
    return NextResponse.redirect(new URL('/maintenance', req.url));
  }

  // update user last seen at
  if (req.auth) {
    await db
      .update(userTable)
      .set({ lastSeenAt: new Date() })
      .where(eq(userTable.id, req.auth.user.id));
  }

  // restricted api route api key middleware
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    const { headers } = req;
    const apiKey = headers.get('x-api-key');
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  // cron api route cron key middleware
  if (req.nextUrl.pathname.startsWith('/api/cron')) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        {
          status: 401,
        },
      );
    }
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
