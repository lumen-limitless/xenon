'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { User } from '@/types';
import Image from 'next/image';

type UserTableProps = {
  users: Array<User>;
};

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
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
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={user.image ?? ''}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell className="hidden md:table-cell"></TableCell>
                  <TableCell className="hidden md:table-cell"></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};
