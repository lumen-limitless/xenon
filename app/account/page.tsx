import { Section } from '@/components/ui/section'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Account',
}

async function getOrdersForAccount() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return
  }
}

export default async function Page({}: PageProps) {
  return (
    <>
      <Section></Section>
    </>
  )
}
