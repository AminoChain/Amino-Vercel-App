import NftCard from './NftCard'

const MarketplacePage = () => {
  let matchRating = 0
  let bestMatchNftArray = []
  const matchingAlgo = () => {
    listing.activeListings.forEach((nft, index) => {
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b)

      if (equals(nft.halotypes_A, HLAA)) {
        matchRating++
      }
      if (equals(nft.halotypes_B, HLAB)) {
        matchRating++
      }
      if (equals(nft.halotypes_C, HLAC)) {
        matchRating++
      }
      if (equals(nft.halotypes_DPB, HLADPB)) {
        matchRating++
      }
      if (equals(nft.halotypes_DRB, HLADRB)) {
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
  return (
    <div>
      <NftCard />
    </div>
  )
}

export default MarketplacePage
