import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  req.body.location = req.body.street + req.body.state // add more or use Alex's endpoint

  const bioBank = await prisma.buyer.create({
    data: {
      name: req.body.name,
      location: req.body.location,
      shippingInfo: {
        create: {
          street: req.body.street,
          state: req.body.state,
          zipcode: req.body.zipcode,
          arrived: req.body.arrived,
        },
      },
    },
  })

  return res.status(200).json({ message: 'Shipping info submitted' })
}
