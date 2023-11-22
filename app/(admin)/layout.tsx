import { authOptions } from '@/lib/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session === null || session.user.role !== 'ADMIN') {
    return notFound()
  }

  return <>{children}</>
}
