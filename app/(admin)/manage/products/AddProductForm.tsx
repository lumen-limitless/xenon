'use client'

import { SubmitButton } from '@/components/SubmitButton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addProductAction } from '@/lib/actions'
import { Category } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

type AddProductFormProps = {
  categories: Category[]
}

const initialState = {
  message: null,
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  categories,
}) => {
  const [numImages, setNumImages] = useState(1)
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
          <Label htmlFor="stock">
            Stock
            <Input placeholder="Stock" id="stock" name="stock" required />
          </Label>
        </fieldset>

        <fieldset className="my-5">
          <Label htmlFor="image">
            {Array.from({ length: numImages }).map((_, i) => (
              <Input
                className="mb-3"
                placeholder="Image"
                id={`image-${i}`}
                name={`image`}
                type="url"
                key={i}
                required
              />
            ))}
          </Label>
        </fieldset>

        <Button onClick={() => setNumImages(() => numImages + 1)}>
          Add Another Image
        </Button>

        <fieldset className="my-5">
          <p className="mb-3">Select Categories</p>
          {categories.map((category) => (
            <Label
              htmlFor="category"
              key={category.id}
              className="flex items-center gap-3"
            >
              <Checkbox
                name="category"
                value={category.id}
                defaultChecked={category.title === 'all'}
              />
              {category.title}
            </Label>
          ))}
        </fieldset>

        <SubmitButton type="submit" className="w-72">
          Add Product{' '}
        </SubmitButton>
      </form>
    </>
  )
}
