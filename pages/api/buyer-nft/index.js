import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  // this route is unused perhaps we can make use of it when a donor clicks the bioBank they want to go to
  const buyer = await prisma.buyer.findFirst({
    where: {
      nfts: {
        some: {
          tokenId: req.body,
        },
      },
      select: {
        nfts: true
      },
    },
  })

  if (buyer) {
    return res.status(200).json(buyer.nfts)
  }
  return res.status(400)
}
