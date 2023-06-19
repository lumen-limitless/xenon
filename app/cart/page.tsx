import Cart from '@/components/Cart'
import { Section } from '@/components/ui/section'

export const metadata = {
  title: 'Shopping Cart',
}
export default async function Page() {
  return (
    <>
      <Section className="min-h-screen flex-col py-20">
        <h1 className="mb-5 text-center text-3xl font-bold">Shopping Cart</h1>
        <Cart />
      </Section>
    </>
  )
}
