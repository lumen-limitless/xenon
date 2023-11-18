import { Section } from '@/components/ui/section'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Manage Categories',
}
export default async function Page({}: PageProps) {
  return (
    <>
      <Section title="Manage Categories">
        <p>Manage Categories</p>
      </Section>
    </>
  )
}
