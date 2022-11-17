import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const bioBank = await prisma.bioBank.update({
    where: {
      address: req.body.address,
    },
    data: {
      nft: {
        create: {
          tokenId: req.body.tokenId,
          trackingNumber: req.body.trackingNumber,
        },
      },
    },
  })

  return res.status(200).json(bioBank) //{ message: 'Shipping info submitted' }
}
