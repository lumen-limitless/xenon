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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteProductAction } from '@/lib/actions';
import { changeProductStatusAction } from '@/lib/actions/changeProductStatusAction';
import { formatDollars } from '@/lib/utils';
import { Product } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

type ProductTableProps = {
  products: Array<Product>;
};

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const { mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductAction,
  });
  const { mutate: changeProductStatus } = useMutation({
    mutationFn: changeProductStatusAction,
  });

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sale</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.images?.[0] || '/images/placeholder.png'}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === 'PUBLISHED'
                          ? 'default'
                          : product.status === 'ARCHIVED'
                            ? 'outline'
                            : 'secondary'
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDollars(product.regularPrice)}</TableCell>
                  <TableCell>
                    {product.salePrice ? formatDollars(product.salePrice) : '—'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/manage/products/edit/${product.slug}`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>

                        {product.status === 'PUBLISHED' ? (
                          <DropdownMenuItem
                            onClick={() => {
                              changeProductStatus(
                                { id: product.id, status: 'DRAFT' },
                                {
                                  onSuccess: (res) => {
                                    toast(res.message);
                                  },
                                  onError: (res) => {
                                    toast(res.message);
                                  },
                                },
                              );
                            }}
                          >
                            Unpublish
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => {
                              changeProductStatus(
                                { id: product.id, status: 'PUBLISHED' },
                                {
                                  onSuccess: (res) => {
                                    toast(res.message);
                                  },
                                  onError: (res) => {
                                    toast(res.message);
                                  },
                                },
                              );
                            }}
                          >
                            Publish
                          </DropdownMenuItem>
                        )}

                        {product.status === 'ARCHIVED' ? (
                          <DropdownMenuItem
                            onClick={() => {
                              changeProductStatus(
                                { id: product.id, status: 'DRAFT' },
                                {
                                  onSuccess: (res) => {
                                    toast(res.message);
                                  },
                                  onError: (res) => {
                                    toast(res.message);
                                  },
                                },
                              );
                            }}
                          >
                            Restore
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => {
                              changeProductStatus(
                                { id: product.id, status: 'ARCHIVED' },
                                {
                                  onSuccess: (res) => {
                                    toast(res.message);
                                  },
                                  onError: (res) => {
                                    toast(res.message);
                                  },
                                },
                              );
                            }}
                          >
                            Archive
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => {
                            deleteProduct(
                              { id: product.id },
                              {
                                onSuccess: () => {
                                  toast('Product deleted');
                                },
                                onError: () => {
                                  toast('Error deleting product');
                                },
                              },
                            );
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {products.length === 0 ? (
            <div className="text-xs text-muted-foreground">
              No products found
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{products.length}</strong> of{' '}
              <strong>{products.length}</strong> products
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
