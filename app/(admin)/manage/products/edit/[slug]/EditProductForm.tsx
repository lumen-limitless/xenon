'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { updateProductAction } from '@/lib/actions';
import { CLOUDINARY_UPLOAD_PRESET } from '@/lib/constants';
import type { Category, ProductWithVariants } from '@/types';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { ChevronLeft, PlusCircle, Upload } from 'lucide-react';
import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type EditProductFormProps = {
  product: ProductWithVariants;
  categories: Array<Category>;
};

export const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
}) => {
  const router = useRouter();
  const [edited, setEdited] = useState<ProductWithVariants>(product);
  console.debug('edited', edited);

  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: updateProductAction,
  });

  const hasChanged = !_.isEqual(product, edited);

  const handleNewVariant = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <>
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product.title.slice(0, 25) +
              (product.title.length > 25 ? '...' : '')}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            {product.stock === null || product.stock > 0
              ? 'In Stock'
              : 'Out of Stock'}
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasChanged}
              onClick={() => setEdited(product)}
            >
              Discard
            </Button>
            <Button
              size="sm"
              disabled={!hasChanged}
              onClick={() =>
                updateProduct(
                  {
                    product: edited,
                  },
                  {
                    onSuccess: () => {
                      toast('Successfully updated product.');
                    },
                  },
                )
              }
            >
              {isPending ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={product.title}
                      value={edited.title}
                      onChange={(e) => {
                        setEdited((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name">Slug</Label>
                    <Input
                      id="slug"
                      type="text"
                      className="w-full"
                      defaultValue={product.slug}
                      onChange={(e) => {
                        setEdited((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={product.productDescription || ''}
                      className="min-h-32"
                      onChange={(e) => {
                        setEdited((prev) => ({
                          ...prev,
                          productDescription: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      {edited.productsToAttributes.map((attribute, index) => (
                        <TableHead className="w-[100px]">
                          {attribute.attribute.attributeName}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {edited.variants.map((variant, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">
                          {variant.sku}
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="stock" className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="stock"
                            type="number"
                            defaultValue={product.stock ?? 0}
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price" className="sr-only">
                            Price
                          </Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue="99.99"
                          />
                        </TableCell>
                        <TableCell>
                          <ToggleGroup type="single" variant="outline">
                            <ToggleGroupItem value="s">S</ToggleGroupItem>
                            <ToggleGroupItem value="m">M</ToggleGroupItem>
                            <ToggleGroupItem value="l">L</ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                    {edited.variants.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No variants
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger
                    asChild
                    disabled={edited.productsToAttributes.length === 0}
                  >
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New Variant
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Variant</DialogTitle>
                      <DialogDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </DialogDescription>
                    </DialogHeader>

                    <form action={handleNewVariant}>
                      <div className="grid gap-3">
                        <div className="grid gap-3">
                          <Label htmlFor="sku">SKU</Label>
                          <Input
                            id="sku"
                            type="text"
                            defaultValue={
                              edited.sku + '-' + edited.variants.length
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="stock">Stock</Label>
                          <Input id="stock" type="number" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            type="number"
                            defaultValue={product.regularPrice}
                          />
                        </div>
                        {edited.productsToAttributes.map((pta, index) => (
                          <div className="grid gap-3">
                            <Label htmlFor="size">
                              {pta.attribute.attributeName}
                            </Label>
                            <Select>
                              <SelectTrigger id="size" aria-label="Select size">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                {pta.attribute.attributeValues.map(
                                  ({ attributeId, value }, index) => (
                                    <SelectItem key={index} value={value ?? ''}>
                                      {value}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </form>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button size="sm" variant="ghost" type="submit">
                          Add Variant
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New Attribute
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Attribute</DialogTitle>
                      <DialogDescription>
                        Create a new attribute for this product.
                      </DialogDescription>
                    </DialogHeader>
                    <form>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="attributeName">Attribute Name</Label>
                          <Input
                            id="attributeName"
                            placeholder="e.g. Color, Size"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="attributeValue">
                            Attribute Value
                          </Label>
                          <Input
                            id="attributeValue"
                            placeholder="e.g. Red, Large"
                          />
                        </div>
                      </div>
                    </form>
                    <DialogFooter>
                      <Button type="submit">Add Attribute</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory (optional)</Label>
                    <Select>
                      <SelectTrigger
                        id="subcategory"
                        aria-label="Select subcategory"
                      >
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue={product.status}
                      value={edited.status}
                      onValueChange={(value: 'DRAFT' | 'PUBLISHED') => {
                        setEdited((prev) => ({
                          ...prev,
                          status: value,
                        }));
                      }}
                    >
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={edited.images?.[0] ?? '/img/placeholder.png'}
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {edited.images?.slice(1).map((image, index) => (
                      <button>
                        <Image
                          key={index}
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src={image}
                          width="84"
                        />
                      </button>
                    ))}

                    <CldUploadButton
                      uploadPreset={CLOUDINARY_UPLOAD_PRESET}
                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                      onSuccess={({ event, info }) => {
                        if (event !== 'success' || !info) {
                          toast('Upload failed');
                        }

                        setEdited((prev) => ({
                          ...prev,
                          images: [
                            ...(prev.images ?? []),
                            (info as CloudinaryUploadWidgetInfo).secure_url,
                          ],
                        }));
                      }}
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </CldUploadButton>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setEdited((prev) => ({
                      ...prev,
                      status: 'ARCHIVED',
                    }));
                  }}
                >
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </>
  );
};
