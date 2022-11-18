import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const buyer = await prisma.buyer.upsert({
    where: {
      address: req.body.address,
    },
    include: {
      shippingInfo: true,
      nfts: true
    },
    update: {
      shippingInfo: {
        upsert: {
          create: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
          },
          update: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
          },
        },
      },
    },
    create: {
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
  })

  return res.status(200).json(buyer) //{ message: 'Shipping info submitted' }
}
