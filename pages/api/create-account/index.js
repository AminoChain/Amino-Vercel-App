import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const bioBank = await prisma.bioBank.upsert({
    where: {
      address: req.body.address,
    },
    include: {
      shippingInfo: true,
      nft: true
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
      location: req.body.state,
      address: req.body.address,
      shippingInfo: {
        create: {
          street: req.body.street,
          apartmentNum: req.body.apartmentNum,
          state: req.body.state,
          zipcode: req.body.zipcode,
          arrived: req.body.arrived,
        },
      },
    },
  })

  return res.status(200).json(bioBank) //{ message: 'Shipping info submitted' }
}
