'use client'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { deleteProductAction } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useTransition } from 'react'

type ProductTableProps = {
  products: Product[]
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [isPending, startTransition] = useTransition()
  return (
    <>
      <Table>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.id}
                <Button
                  variant={'destructive'}
                  onClick={() =>
                    startTransition(async () => {
                      await deleteProductAction(null, product.id)
                    })
                  }
                >
                  {isPending ? (
                    <Loader2 className="h-5 animate-spin" />
                  ) : (
                    'Delete'
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={50}
                  height={50}
                />
                {product.title}
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
