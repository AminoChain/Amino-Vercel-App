import NftCard from './NftCard'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'
import filter from '../../../assets/filterIcon.png'
import MarketplaceBanner from './MarketplaceBanner'
import MarketplaceNav from './MarketplaceNav'
import SearchFooter from '../searchPage/SearchFooter'

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
        donor
        bioBank
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

  if (error) return `Error! ${error}`

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
        tokenId: nft.tokenId,
        matchRating: matchRating,
        bioBank: nft.bioBank,
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

  const nftMatches = bestMatchNftArray.map((item, index) => (
    <NftCard key={index} item={item} />
  ))

  return (
    <div className="w-full flex flex-col">
      <MarketplaceBanner />
      <MarketplaceNav />
      <div className="w-full px-[5%]">
        <div className="flex justify-center ml-auto items-center cursor-pointer bg-white text-black text-base border border-main font-satoshiMedium h-10 w-10 rounded-full">
          <Image src={filter} alt="filter" draggable="false" />
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between py-8 px-[5%]">
        {nftMatches}
      </div>
      <SearchFooter />
    </div>
  )
}

export default MarketplacePage
