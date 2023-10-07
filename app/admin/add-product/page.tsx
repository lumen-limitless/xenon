import { SubmitButton } from '@/components/SubmitButton'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Section } from '@/components/ui/section'
import { Textarea } from '@/components/ui/textarea'
import { addProductAction } from '@/lib/actions'

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

          <form action={addProductAction}>
            <fieldset className="my-5">
              <Label htmlFor="title">
                Product Name
                <Input placeholder="Title" id="title" name="title" required />
              </Label>
            </fieldset>

            <fieldset className="my-5">
              <Label htmlFor="description">
                Description
                <Textarea
                  placeholder="Description"
                  id="description"
                  name="description"
                />
              </Label>
            </fieldset>

            <fieldset className="my-5">
              <Label htmlFor="price">
                Price
                <Input placeholder="Price" id="price" name="price" required />
              </Label>
            </fieldset>

            <fieldset className="my-5">
              <Label htmlFor="image">
                Image
                <Input placeholder="Image" id="image" name="image" required />
              </Label>
            </fieldset>

            <SubmitButton type="submit">Add Product </SubmitButton>
          </form>
        </Container>
      </Section>
    </>
  )
}
