import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/drizzle';
import { File, ListFilter, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { cache } from 'react';
import { ProductTable } from './product-table';

export const runtime = 'nodejs';
export const dynamic = 'auto';
export const revalidate = false;

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata = {
  title: 'Manage Products',
};

const getProducts = cache(async () => {
  try {
    const products = await db.query.productTable.findMany();
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
});

export default async function Page({}: PageProps) {
  const [products] = await Promise.all([getProducts()]);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>

              <Button size="sm" className="h-7 gap-1" asChild>
                <Link href="/manage/products/new">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <ProductTable products={products} />
          </TabsContent>
          <TabsContent value="active">
            <ProductTable
              products={products.filter(
                (product) => product.status === 'PUBLISHED',
              )}
            />
          </TabsContent>
          <TabsContent value="draft">
            <ProductTable
              products={products.filter(
                (product) => product.status === 'DRAFT',
              )}
            />
          </TabsContent>
          <TabsContent value="archived">
            <ProductTable
              products={products.filter(
                (product) => product.status === 'ARCHIVED',
              )}
            />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
