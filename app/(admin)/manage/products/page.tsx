import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { prisma } from '@/lib/prisma'
import { Category, Product } from '@prisma/client'
import { PlusCircle } from 'lucide-react'
import { AddProductForm } from './AddProductForm'
import { ProductTable } from './ProductTable'

type PageProps = {
  params: {}
  searchParams: Record<string, string | Array<string> | undefined>
}

export const metadata = {
  title: 'Manage Products',
}

async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany()
    return products
  } catch (error) {
    console.error(error)
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Page({}: PageProps) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <>
      <Section className="py-20">
        <div className="container">
          <h1 className="mb-10 text-center text-3xl font-bold">
            Manage Products
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <PlusCircle /> Add Product
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll">
              <AddProductForm categories={categories} />
            </SheetContent>
          </Sheet>

          <ProductTable products={products} />
        </div>
      </Section>
    </>
  )
}
