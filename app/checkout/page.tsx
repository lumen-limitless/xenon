import { CreateOrderButton } from '@/components/CreateOrderButton'
import { Section } from '@/components/ui/section'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Checkout',
}
export default async function Page({}: PageProps) {
  return (
    <Section>
      <CreateOrderButton />
    </Section>
  )
}
