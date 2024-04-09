'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteProductAction } from '@/lib/actions';
import { formatDollars } from '@/lib/utils';
import { ProductWithCategories } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Copy,
  Delete,
  Edit,
  MoreHorizontal,
  View,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const columns: ColumnDef<ProductWithCategories>[] = [
  { accessorKey: 'id', header: 'Product ID' },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: (data) => {
      return (
        <time suppressHydrationWarning>
          {new Date(data.row.original.createdAt).toLocaleString()}
        </time>
      );
    },
  },

  {
    accessorKey: 'images',
    header: 'Images',
    cell: (data) => {
      return (
        <>
          {data.row.original.images?.map((image, i) => (
            <Image
              key={i}
              src={image}
              alt={data.row.original.title}
              width={50}
              height={50}
            />
          ))}
        </>
      );
    },
  },

  {
    accessorKey: 'title',
    header: 'Title',
  },

  {
    accessorKey: 'price',
    header: 'Price',
    cell: (data) => {
      return <span>{formatDollars(data.row.original.price)}</span>;
    },
  },

  {
    accessorKey: 'stock',
    header: 'Stock',
  },

  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: (data) => {
      return (
        <ul>
          {data.row.original.categories.map(({ category }) => (
            <li key={category.id}>{category.title}</li>
          ))}
        </ul>
      );
    },
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      console.log(row);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteProductAction(null, row.original.id)}
            >
              <Delete className="mr-2 h-4 w-4" />
              Delete Product
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`/products/${row.original.slug}`}>
                <View className="mr-2 h-4 w-4" />
                View Product
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => null}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
