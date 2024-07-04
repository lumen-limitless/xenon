import { db } from '@/lib/drizzle';
import { userTable } from '@/schema';
import { gte } from 'drizzle-orm';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const runtime = 'nodejs';

export const revalidate = 0;

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Analytics',
};
export default async function Page({}: PageProps) {
  const activeUsers = await db.query.userTable.findMany({
    where: gte(userTable.lastSeenAt, new Date(Date.now() - 3600)),
  });
  return <>{activeUsers.length}</>;
}
