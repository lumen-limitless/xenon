import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session === null) notFound()
  if (session.user.role !== 'ADMIN') notFound()

  return <>{children}</>
}
