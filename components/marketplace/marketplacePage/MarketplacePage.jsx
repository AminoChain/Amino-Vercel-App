import NftCard from './NftCard'
import { gql, useQuery } from '@apollo/client'

const MarketplacePage = ({ search }) => {
  const GET_MINTED_NFTS = gql`
    {
      activeListings(
        where: { buyer: "0x0000000000000000000000000000000000000000" }
      ) {
        id
        buyer
        tokenId
        price
        halotypes_A
        halotypes_B
        halotypes_C
        halotypes_DPB
        halotypes_DRB
      }
    }
  `
  const { loading, error, data: listing } = useQuery(GET_MINTED_NFTS)

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  let matchRating = 0
  let bestMatchNftArray = []
  const matchingAlgo = () => {
    listing.activeListings.forEach((nft, index) => {
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b)

      if (equals(nft.halotypes_A, search.HLAA)) {
        matchRating++
      }
      if (equals(nft.halotypes_B, search.HLAB)) {
        matchRating++
      }
      if (equals(nft.halotypes_C, search.HLAC)) {
        matchRating++
      }
      if (equals(nft.halotypes_DPB, search.HLADPB)) {
        matchRating++
      }
      if (equals(nft.halotypes_DRB, search.HLADRB)) {
        matchRating++
      }
      bestMatchNftArray.push({
        nftId: nft.tokenId,
        matchRating: matchRating,
        price: nft.price,
      })
      matchRating = 0
    })
  }
  const organizeBestMatches = () => {
    bestMatchNftArray.sort((a, b) => {
      return b.matchRating - a.matchRating
    })
  }
  matchingAlgo()
  organizeBestMatches()

  const nftMatches = bestMatchNftArray.map((item, index) => {
    return (
      <Link href={`marketplace/item/${item.nftId}`}>
        <a>
          <NftCard key={index} item={item} />
        </a>
      </Link>
    )
  })
  return (
    <div className="w-full">
      {nftMatches}
      <NftCard />
    </div>
  )
}

export default MarketplacePage
