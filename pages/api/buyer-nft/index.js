import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  // this route is unused perhaps we can make use of it when a donor clicks the bioBank they want to go to
  const buyer = await prisma.buyer.find({
    where: {
      nfts: {
        tokenId: req.body
      }
    },
    include: {
      nfts: true,
    },
  })

  if (buyer) {
    return res.status(200).json(buyer.nft.trackingNumber)
  }
  return res.status(400)
}
