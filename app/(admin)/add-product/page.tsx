import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { AddProductForm } from './AddProductForm'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Add Product',
}

export default async function Page({}: PageProps) {
  return (
    <>
      <Section className="py-20">
        <Container>
          <h1 className="text-3xl font-bold">Add New Product</h1>

          <AddProductForm />
        </Container>
      </Section>
    </>
  )
}
