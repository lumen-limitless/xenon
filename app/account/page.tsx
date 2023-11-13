import { Section } from '@/components/ui/section'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Account',
}
export default async function Page({}: PageProps) {
  return (
    <>
      <Section></Section>
    </>
  )
}
