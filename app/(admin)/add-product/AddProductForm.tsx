'use client'

import { SubmitButton } from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addProductAction } from '@/lib/actions'
import { useEffect } from 'react'
import { experimental_useFormState as useFormState } from 'react-dom'

type AddProductFormProps = {}

const initialState = {
  message: null,
}

export const AddProductForm: React.FC<AddProductFormProps> = ({}) => {
  const [state, formAction] = useFormState<
    { message: string | null },
    FormData
  >(addProductAction, initialState)

  useEffect(() => {
    if (state?.message) {
      alert(state.message)
    }
  }, [state?.message])

  return (
    <>
      <form action={formAction}>
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
              required
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
            <Input
              placeholder="Image"
              id="image"
              name="image"
              type="url"
              required
            />
          </Label>
        </fieldset>

        <SubmitButton type="submit" className="w-72">
          Add Product{' '}
        </SubmitButton>
      </form>
    </>
  )
}
