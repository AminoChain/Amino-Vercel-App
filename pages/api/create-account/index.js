import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const buyer = await prisma.buyer.create({
    data: {
      name: req.body.name,
      address: req.body.address,
      shippingInfo: {
        create: {
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
        },
      },
    },
    include: {
      shippingInfo: true,
      nfts: true,
    },
  })

  return res.status(200).json(buyer) //{ message: 'Shipping info submitted' }
}
