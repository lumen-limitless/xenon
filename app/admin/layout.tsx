import { authOptions } from '@/lib/auth'
import { type CustomSession } from '@/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = (await getServerSession(authOptions)) as CustomSession

  if (session === null) redirect('/')
  if (session.user.role !== 'ADMIN') redirect('/')

  return <>{children}</>
}
