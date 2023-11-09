import { Progress } from '@/components/ui/progress'
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
    <Section className="flex-grow pb-48 pt-10">
      <div className="container">
        <h1 className="mb-4 text-3xl font-bold">Checkout</h1>
        <Progress value={33} />
      </div>
    </Section>
  )
}
