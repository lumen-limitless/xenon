// import { addProductAction } from '@/lib/actions'
// import { prisma } from '@/lib/prisma'

describe('addProductAction', () => {
  it('should 1 + 1 = 2', () => {
    expect(1 + 1).toEqual(2);
  });

  //   it('should add new product to the db', async () => {
  //     const product = {
  //       name: 'test',
  //       description: 'test',
  //       price: 10,
  //       image: 'test',
  //     }
  //     const formData = new FormData()

  //     const { message } = await addProductAction({}, formData)

  //     expect(prisma.product.create).toHaveBeenCalledWith({
  //       data: {
  //         name: 'test',
  //         description: 'test',
  //         price: 10,
  //         image: 'test',
  //       },
  //     })
  //     expect(message).toEqual('Product added successfully')
  //   })
});
