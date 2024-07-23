'use client';

import { SubmitButton } from '@/components/submit-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addProductAction } from '@/lib/actions';
import { categoryTable } from '@/schema';
import { CloudUploadIcon } from 'lucide-react';
import {
  CldUploadButton,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';
import { useState } from 'react';

type AddProductFormProps = {
  categories: Array<typeof categoryTable.$inferSelect>;
};

const initialState = {
  message: null,
};

export const AddProductForm: React.FC<AddProductFormProps> = ({
  categories,
}) => {
  const [uploadedImages, setUploadedImages] = useState<
    Array<CloudinaryUploadWidgetInfo>
  >([]);

  // const [state, formAction] = useFormState<
  //   { message: string | null },
  //   FormData
  // >(addProductAction, initialState);

  // useEffect(() => {
  //   if (state?.message) {
  //     alert(state.message);
  //   }
  // }, [state?.message]);

  return (
    <>
      <form action={addProductAction.bind(null, uploadedImages)}>
        <fieldset className="my-5">
          <Label htmlFor="title">
            Product Name
            <Input placeholder="Title" id="title" name="title" required />
          </Label>
        </fieldset>

        <fieldset className="my-5">
          <Label htmlFor="sku">
            Product SKU
            <Input placeholder="SKU" id="sku" name="sku" required />
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

        <div className="flex gap-4" id="images">
          {uploadedImages.map((image) => (
            <img
              key={image.asset_id as string}
              src={image.secure_url}
              alt={image.public_id}
              className="h-20 w-20 rounded-md object-cover"
            />
          ))}
        </div>

        <fieldset className="my-5">
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            className="flex w-full flex-col items-center justify-center rounded-md border border-dashed p-5"
            onSuccess={(res) => {
              if (res.event !== 'success') return;
              setUploadedImages((prev) => [
                ...prev,
                res.info as CloudinaryUploadWidgetInfo,
              ]);
            }}
          >
            <CloudUploadIcon className="h-8 w-8" />
            Upload Images
          </CldUploadButton>
        </fieldset>

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

        <fieldset>
          <Label htmlFor="published">
            <Checkbox name="published" className="mr-1" />
            Publish Product
          </Label>
        </fieldset>

        <SubmitButton type="submit" className="w-72">
          Add Product{' '}
        </SubmitButton>
      </form>
    </>
  );
};
