import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const buyer = await prisma.buyer.findUnique({
    where: {
      address: req.body,
    },
    include: {
      shippingInfo: true,
      nfts: true,
    },
  })

  if (buyer) {
    return res.status(200).json(buyer)
  }
  return res.status(400)
}
