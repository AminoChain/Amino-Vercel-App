import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const bioBank = await prisma.bioBank.findUnique({
    where: {
      id: req.body.bioBankId
    },
  })  
  return res.status(200).json(bioBank)
}