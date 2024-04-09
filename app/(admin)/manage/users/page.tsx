import { DataTable } from '@/components/DataTable';
import { db } from '@/lib/drizzle';
import { cache } from 'react';
import { columns } from './columns';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata = {
  title: 'Manage Users',
};

const getUsers = cache(async () => {
  try {
    const users = await db.query.userTable.findMany({
      with: {
        cart: true,
        orders: true,
      },
    });
    return users;
  } catch (error) {
    return [];
  }
});
export default async function Page({}: PageProps) {
  const users = await getUsers();
  return (
    <>
      <section className="pb-48 pt-10">
        <div className="container">
          <h1>Order Fulfillment</h1>

          <DataTable columns={columns} data={users} />
        </div>
      </section>
    </>
  );
}
