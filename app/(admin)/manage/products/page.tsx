import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { prisma } from '@/lib/prisma';
import { PlusCircle } from 'lucide-react';
import { cache } from 'react';
import { AddProductForm } from './AddProductForm';
import { columns } from './columns';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata = {
  title: 'Manage Products',
};

const getProducts = cache(async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
      },
    });
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
});

const getCategories = cache(async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
});

export default async function Page({}: PageProps) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <section className="py-20">
        <div className="container">
          <h1 className="mb-10 text-center text-3xl font-bold">
            Manage Products
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mb-5">
                <PlusCircle /> Add Product
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll">
              <AddProductForm categories={categories} />
            </SheetContent>
          </Sheet>

          <DataTable columns={columns} data={products} />
        </div>
      </section>
    </>
  );
}
