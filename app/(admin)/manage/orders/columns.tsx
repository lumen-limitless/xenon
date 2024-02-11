'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDollars } from '@/lib/utils';
import { OrderWithItemsAndProducts } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<OrderWithItemsAndProducts>[] = [
  { accessorKey: 'id', header: 'Order ID' },

  { accessorKey: 'createdAt', header: 'Order Date' },

  {
    accessorKey: 'status',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      return row.original.userId ?? 'Guest';
    },
  },

  {
    accessorKey: 'items',
    header: 'Items',
    cell: ({ row }) => {
      return (
        <ul className="divide-y divide-gray-200">
          {(row.getValue('items') as OrderWithItemsAndProducts['items']).map(
            (item) => (
              <li key={item.id} className="flex py-4">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {item.product.title} ({item.product.id})
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDollars(item.product.price)}
                  </p>

                  <p className="text-sm text-gray-500">X {item.quantity}</p>
                </div>
              </li>
            ),
          )}
        </ul>
      );
    },
  },
  {
    accessorKey: 'total',
    header: 'Total Amount',
    cell: ({ row }) => {
      return formatDollars(row.getValue('total'));
    },
  },
  {
    id: 'actions',
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Mark Shipped</DropdownMenuItem>
            <DropdownMenuItem>Cancel & Refund</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://dashboard.stripe.com/payments/${
                  (row.original.metadata as any)?.['paymentIntentId']
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                View payment details
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
