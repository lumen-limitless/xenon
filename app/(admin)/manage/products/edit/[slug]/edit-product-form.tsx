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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { changeProductStatusAction, updateProductAction } from '@/lib/actions';
import { cn } from '@/lib/utils';
import type { Category, Product } from '@/types';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { ChevronLeft, MoreHorizontal, PlusCircle, Upload } from 'lucide-react';
import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type EditProductFormProps = {
  product: Product;
  categories: Array<Category>;
};

export const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  categories,
}) => {
  const router = useRouter();
  const [edited, setEdited] = useState<Product>(product);

  console.debug('edited', edited);

  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: updateProductAction,
  });

  const hasChanged = !_.isEqual(product, edited);

  const handleNewVariant = (formData: FormData) => {
    const sku = formData.get('sku') as string;
    const stock = parseInt(formData.get('stock') as string, 10);
    const price = parseFloat(formData.get('price') as string);

    if (!sku || isNaN(stock) || isNaN(price)) {
      toast.error('Please provide valid SKU, stock, and price');
      return;
    }

    const attributes: Record<string, string> = {};
    edited.attributes.forEach((attr) => {
      const value = formData.get(attr.name) as string;
      if (value) {
        attributes[attr.name] = value;
      }
    });

    // Validate that all required attributes have values
    const missingAttributes = edited.attributes.filter(
      (attr) => !attributes[attr.name],
    );
    if (missingAttributes.length > 0) {
      toast.error(
        `Please provide values for all attributes: ${missingAttributes.map((attr) => attr.name).join(', ')}`,
      );
      return;
    }

    const newVariant = {
      id: crypto.randomUUID(),
      sku,
      stock,
      price,
      attributes,
      imageIndex: 0, // Default to first image
    };

    setEdited((prevProduct) => ({
      ...prevProduct,

      variants: [...prevProduct.variants, newVariant],
    }));

    toast.success('New variant added successfully');
  };

  const handleNewAttribute = (formData: FormData) => {
    const attributeName = formData.get('attributeName') as string;
    const attributeValue = formData.get('attributeValue') as string;

    if (!attributeName || !attributeValue) {
      toast.error('Please provide both attribute name and value');
      return;
    }

    setEdited((prevProduct) => {
      const updatedAttributes = [...prevProduct.attributes];
      const existingAttribute = updatedAttributes.find(
        (attr) => attr.name === attributeName,
      );

      if (existingAttribute) {
        // Add the new value if it doesn't already exist
        if (!existingAttribute.values.includes(attributeValue)) {
          existingAttribute.values.push(attributeValue);
        }
      } else {
        // Create a new attribute
        updatedAttributes.push({
          name: attributeName,
          values: [attributeValue],
        });
      }

      return {
        ...prevProduct,
        attributes: updatedAttributes,
      };
    });

    toast.success('New attribute added successfully');
  };

  const handlePopulateVariants = () => {
    const generateCombinations = (attributes: Product['attributes']) => {
      const attributeNames = attributes.map((attr) => attr.name);
      const attributeValues = attributes.map((attr) => attr.values);

      const combinations = attributeValues.reduce(
        (acc, curr) => acc.flatMap((x) => curr.map((y) => [...x, y])),
        [[]] as string[][],
      );

      return combinations.map((combination) => {
        const attributes: Record<string, string> = {};
        combination.forEach((value, index) => {
          attributes[attributeNames[index]] = value;
        });
        return attributes;
      });
    };

    const combinations = generateCombinations(edited.attributes);

    const newVariants = combinations.map((combination, index) => ({
      id: crypto.randomUUID(),
      sku: `${product.sku}-${index + 1}`,
      stock: 0,
      price: edited.price,
      attributes: combination,
      imageIndex: 0,
    }));

    // Filter out combinations that already exist in current variants
    const existingVariants = new Set(
      edited.variants.map((variant) => JSON.stringify(variant.attributes)),
    );

    const filteredNewVariants = newVariants.filter(
      (variant) => !existingVariants.has(JSON.stringify(variant.attributes)),
    );

    setEdited((prevProduct) => ({
      ...prevProduct,
      variants: [...prevProduct.variants, ...filteredNewVariants],
    }));

    toast.success(`Added ${newVariants.length} new variants`);
  };

  return (
    <>
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={router.back}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product.title.slice(0, 25) +
              (product.title.length > 25 ? '...' : '')}
          </h1>
          {product.stock !== null && (
            <Badge variant="outline" className="ml-auto sm:ml-0">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Badge>
          )}
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
              disabled={!hasChanged || isPending}
              onClick={() =>
                updateProduct(
                  {
                    product: edited,
                  },
                  {
                    onSuccess: () => {
                      toast.success('Successfully updated product.');
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
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      type="text"
                      className="w-full"
                      defaultValue={product.slug}
                      onChange={(e) => {
                        setEdited((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      name="sku"
                      type="text"
                      className="w-full"
                      defaultValue={product.sku}
                      onChange={(e) => {
                        setEdited((prev) => ({
                          ...prev,
                          sku: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      className="w-full"
                      defaultValue={product.price / 100}
                      onChange={(e) => {
                        setEdited((prev) => ({
                          ...prev,
                          price: parseFloat(e.target.value) * 100,
                        }));
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="salePrice">Sale Price</Label>
                    <Switch />
                    <Input
                      id="salePrice"
                      type="number"
                      className="w-full"
                      defaultValue={
                        product.salePrice ? product.salePrice / 100 : ''
                      }
                      onChange={(e) => {
                        setEdited((prev) => ({
                          ...prev,
                          salePrice: e.target.value
                            ? parseFloat(e.target.value) * 100
                            : null,
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
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Create & remove product variants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      {edited.attributes.map((attr) => (
                        <TableHead key={attr.name}>{attr.name}</TableHead>
                      ))}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {edited.variants.map((variant, i) => (
                      <TableRow
                        key={i}
                        className={cn(
                          product.variants.find((v) => v.id === variant.id)
                            ? ''
                            : 'bg-green-500/10',
                        )}
                      >
                        <TableCell className="font-semibold">
                          {variant.sku}
                        </TableCell>
                        <TableCell>
                          <Label htmlFor={`stock-${i}`} className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id={`stock-${i}`}
                            type="number"
                            defaultValue={variant.stock ?? 0}
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor={`price-${i}`} className="sr-only">
                            Price
                          </Label>
                          <Input
                            id={`price-${i}`}
                            name="price"
                            type="number"
                            defaultValue="99.99"
                          />
                        </TableCell>
                        {edited.attributes.map((attr) => (
                          <TableCell key={attr.name}>
                            {variant.attributes[attr.name]}
                          </TableCell>
                        ))}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setEdited((prev) => ({
                                    ...prev,

                                    variants: prev.variants.filter(
                                      (_, index) => index !== i,
                                    ),
                                  }));
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {edited.variants.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No variants
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New Variant
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <form action={handleNewVariant}>
                      <DialogHeader>
                        <DialogTitle>Add New Variant</DialogTitle>
                        <DialogDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-3">
                        <div className="grid gap-3">
                          <Label htmlFor="sku">SKU</Label>
                          <Input id="sku" type="text" name="sku" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="stock">Stock</Label>
                          <Input id="stock" type="number" name="stock" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            type="number"
                            name="price"
                            defaultValue={edited.price}
                          />
                        </div>
                        {edited.attributes.map((attr) => (
                          <div className="grid gap-3">
                            <Label htmlFor={attr.name}>{attr.name}</Label>
                            <Select name={attr.name}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={attr.name} />
                              </SelectTrigger>
                              <SelectContent>
                                {attr.values.map((val) => (
                                  <SelectItem value={val}>{val}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button size="sm" variant="ghost" type="submit">
                            Add Variant
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handlePopulateVariants}
                  disabled={edited.attributes.length === 0}
                >
                  Populate variants
                </Button>
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-07-chunk-1-attributes">
              <CardHeader>
                <CardTitle>Attributes</CardTitle>
                <CardDescription>Manage product attributes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attribute Name</TableHead>
                      <TableHead>Values</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {edited.attributes.map((attr, index) => (
                      <TableRow key={index}>
                        <TableCell>{attr.name}</TableCell>
                        <TableCell>{attr.values.join(', ')}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              // Logic to add a new value
                            }}
                          >
                            Add Value
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              // Logic to remove the attribute
                              setEdited((prev) => ({
                                ...prev,
                                attributes: prev.attributes.filter(
                                  (_, i) => i !== index,
                                ),
                              }));
                            }}
                          >
                            Remove Attribute
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New Attribute
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form action={handleNewAttribute}>
                      <DialogHeader>
                        <DialogTitle>Add New Attribute</DialogTitle>
                        <DialogDescription>
                          Create a new attribute for this product.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="attributeName">Attribute Name</Label>
                          <Input
                            id="attributeName"
                            name="attributeName"
                            placeholder="e.g. Color, Size"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="attributeValue">
                            Attribute Value
                          </Label>
                          <Input
                            id="attributeValue"
                            name="attributeValue"
                            placeholder="e.g. Red, Large"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit">Add Attribute</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
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
                        {categories
                          .filter(
                            (category) => category.parentCategoryId === null,
                          )
                          .map((category) => (
                            <SelectItem value={category.id} key={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
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
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
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

            <ArchiveProductCard product={product} />
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

type ArchiveProductCardProps = {
  product: Product;
};
const ArchiveProductCard: React.FC<ArchiveProductCardProps> = ({ product }) => {
  const { mutate: changeProductStatus } = useMutation({
    mutationFn: changeProductStatusAction,
  });
  const router = useRouter();

  const handleArchiveProduct = () => {
    changeProductStatus(
      {
        id: product.id,
        status: 'ARCHIVED',
      },
      {
        onSuccess() {
          toast.success('Product was archived successfully');
          router.back();
        },
      },
    );
  };
  return (
    <>
      <Card x-chunk="dashboard-07-chunk-5">
        <CardHeader>
          <CardTitle>Archive Product</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div></div>
          <Button size="sm" variant="secondary" onClick={handleArchiveProduct}>
            Archive Product
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
