import Cart from '@/components/Cart'
import { Section } from '@/components/ui/section'

export const metadata = {
  title: 'Shopping Bag',
}
export default async function Page() {
  return (
    <>
      <Section className="flex-col py-10">
        <h1 className="mb-5 text-center text-3xl font-bold">Shopping Bag</h1>
        <Cart />
      </Section>
    </>
  )
}
