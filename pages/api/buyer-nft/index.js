import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  // this route is unused perhaps we can make use of it when a donor clicks the bioBank they want to go to
  const nft = await prisma.nft.findFirst({
    where: {
      tokenId: req.body,
    },
    include: {
      buyer: true,
    },
  })

  if (nft) {
    return res.status(200).json(nft)
  }
  return res.status(400)
}
