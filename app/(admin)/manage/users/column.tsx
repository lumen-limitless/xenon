'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteProductAction } from '@/lib/actions';
import { Prisma } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Copy, Delete, Edit, MoreHorizontal, View } from 'lucide-react';

export const columns: ColumnDef<
  Prisma.UserGetPayload<{
    include: { cart: true; orders: true };
  }>
>[] = [
  { accessorKey: 'id', header: 'User ID' },

  {
    accessorKey: 'name',
    header: 'Name',
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

            <DropdownMenuItem>
              <View className="mr-2 h-4 w-4" />
              View Product
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
