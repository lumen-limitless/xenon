'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { shortenUUID } from '@/lib/utils';
import { UserWithCartAndOrders } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<UserWithCartAndOrders>[] = [
  {
    accessorKey: 'id',
    header: 'User ID',
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>{shortenUUID(row.original.id)}</TooltipTrigger>
        <TooltipContent>{row.original.id}</TooltipContent>
      </Tooltip>
    ),
  },

  {
    accessorKey: 'name',
    header: 'Name',
  },

  {
    accessorKey: 'role',
    header: 'Role',
  },

  {
    accessorKey: 'email',
    header: 'Email',
  },

  {
    accessorKey: 'lastSeenAt',
    header: 'Last Seen',
  },

  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      console.log(row);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"></DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
