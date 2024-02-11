import { auth } from '@/auth';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session === null || session.user.role !== 'ADMIN') {
    return notFound();
  }

  return <>{children}</>;
}
