'use client'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { deleteProductAction } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'

type ProductTableProps = {
  products: Product[]
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
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
                  onClick={() => deleteProductAction(null, product.id)}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Image
                  src={
                    product.image ? product.image : '/images/placeholder.png'
                  }
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
