import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { RedirectType, redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session === null) {
    redirect('/?signin=true', RedirectType.replace)
  }

  return <>{children}</>
}
