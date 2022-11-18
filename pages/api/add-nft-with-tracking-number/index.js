import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const buyer = await prisma.buyer.update({
    where: {
      address: req.body.address,
    },
    data: {
      nfts: {
        create: {
          tokenId: req.body.tokenId,
          trackingNumber: req.body.trackingNumber,
        },
      },
    },
  })

  return res.status(200).json(buyer) //{ message: 'Shipping info submitted' }
}

//1Z8927275777641843 tokenId 7
