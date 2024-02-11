import { auth } from '@/auth';
import { RouteSelector } from '@/components/RouteSelector';
import { RedirectType, redirect } from 'next/navigation';

const routes = [
  {
    name: 'Orders',
    path: '/account/orders',
  },
  {
    name: 'Returns',
    path: '/account/returns',
  },
  {
    name: 'Settings',
    path: '/account/settings',
  },
];
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session === null) {
    redirect('/?signin=true', RedirectType.replace);
  }

  return (
    <>
      <section id="user-greeting">
        <div className="flex h-36 w-full items-center justify-center bg-gradient-to-r from-purple-800 to-blue-800 text-white">
          <div className="container">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Welcome, {session?.user.name}
            </h1>
          </div>
        </div>
      </section>
      <RouteSelector className="pt-10" routes={routes} />
      {children}
    </>
  );
}
