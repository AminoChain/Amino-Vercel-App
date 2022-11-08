import NftCard from './NftCard'
import { ethers } from 'ethers'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import filter from '../../../assets/filterIcon.png'
import closeFilter from '../../../assets/filterX.png'
import MarketplaceBanner from './MarketplaceBanner'
import MarketplaceNav from './MarketplaceNav'
import SearchFooter from '../searchPage/SearchFooter'

const MarketplacePage = ({ search }) => {
  const [filterMenuOpen, setFilterMenu] = useState(false)
  const [matchFilter, setMatchFilter] = useState(null)
  const [highestPrice, setHighestPrice] = useState(null)

  const MATCH_RATING_FILTER = {
    0: '0-25',
    1: '25-50',
    2: '50-75',
    3: '75-100',
  }
  const setMatchRatingFilter = (value) => {
    setMatchFilter(MATCH_RATING_FILTER[value])
  }

  const GET_MINTED_NFTS = gql`
    {
      existingTokenIds(
        where: { buyer: "0x0000000000000000000000000000000000000000" }
      ) {
        tokenId
        price
        donor
        bioBank
        sizeInCC
        hlaHashes {
          hlaHashed_A
          hlaHashed_B
          hlaHashed_C
          hlaHashed_DPB
          hlaHashed_DRB
        }
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
    listing.existingTokenIds.forEach((nft, index) => {
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b)

      //hashes input and compares to hashed hla
      if (
        equals(
          nft.hlaHashes.hlaHashed_A,
          ethers.utils.id(search.HLAA.toString())
        )
      ) {
        matchRating++
      }
      if (
        equals(
          nft.hlaHashes.hlaHashed_B,
          ethers.utils.id(search.HLAB.toString())
        )
      ) {
        matchRating++
      }
      if (
        equals(
          nft.hlaHashes.hlaHashed_C,
          ethers.utils.id(search.HLAC.toString())
        )
      ) {
        matchRating++
      }
      if (
        equals(
          nft.hlaHashes.hlaHashed_DPB,
          ethers.utils.id(search.HLADPB.toString())
        )
      ) {
        matchRating++
      }
      if (
        equals(
          nft.hlaHashes.hlaHashed_DRB,
          ethers.utils.id(search.HLADRB.toString())
        )
      ) {
        matchRating++
      }
      bestMatchNftArray.push({
        tokenId: nft.tokenId,
        matchRating: matchRating,
        bioBank: nft.bioBank,
        price: nft.price,
        size: nft.sizeInCC,
      })
      matchRating = 0
    })
  }
  const findHighestPrice = () => {
    if (highestPrice === null) {
      bestMatchNftArray.sort((a, b) => {
        return b.price - a.price
      })
      setHighestPrice(bestMatchNftArray[0].price)
    }
  }
  const organizeBestMatches = () => {
    findHighestPrice()
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
    <div className="w-[100vw] flex flex-col min-h-[100vh]">
      <MarketplaceBanner />
      <MarketplaceNav />
      <div className="w-full px-[5%]">
        <div
          className="flex justify-center ml-auto items-center cursor-pointer bg-white text-black text-base border border-main font-satoshiMedium h-10 w-10 rounded-full"
          onClick={() => {
            setFilterMenu(!filterMenuOpen)
          }}
        >
          {filterMenuOpen ? (
            <Image src={closeFilter} alt="x" draggable="false" />
          ) : (
            <Image src={filter} alt="f" draggable="false" />
          )}
        </div>
        {filterMenuOpen ? (
          <div className="flex flex-row justify-between border-solid border-y-[1px] rounded-2xl border-main py-6 px-6 mt-6 align-middle">
            <div className="flex flex-col">
              <p className="font-satoshiRegular mb-2 text-black text-xl">
                Match rating
              </p>
              <div className="flex flex-row">
                <div
                  className="flex flex-row border-solid border rounded-full border-main py-2 px-4 cursor-pointer mr-4"
                  onClick={() => {
                    setMatchRatingFilter(0)
                  }}
                >
                  <div
                    className={`rounded-full ${
                      matchFilter === MATCH_RATING_FILTER[0] ? 'bg-black' : ''
                    } border-main border-solid border h-4 w-4 self-center mr-2`}
                  />
                  <p className="font-satoshiMedium text-base text-main">
                    0-25%
                  </p>
                </div>
                <div
                  className="flex flex-row border-solid border rounded-full border-main py-2 px-4 cursor-pointer mr-4"
                  onClick={() => {
                    setMatchRatingFilter(1)
                  }}
                >
                  <div
                    className={`rounded-full ${
                      matchFilter === MATCH_RATING_FILTER[1]
                        ? 'bg-black'
                        : 'bg-transparent'
                    } border-main border-solid border h-4 w-4 self-center mr-2`}
                  />
                  <p className="font-satoshiMedium text-base text-main">
                    25-50%
                  </p>
                </div>
                <div
                  className="flex flex-row border-solid border rounded-full border-main py-2 px-4 cursor-pointer mr-4"
                  onClick={() => {
                    setMatchRatingFilter(2)
                  }}
                >
                  <div
                    className={`rounded-full ${
                      matchFilter === MATCH_RATING_FILTER[2]
                        ? 'bg-black'
                        : 'bg-transparent'
                    } border-main border-solid border h-4 w-4 self-center mr-2`}
                  />
                  <p className="font-satoshiMedium text-base text-main">
                    50-75%
                  </p>
                </div>
                <div
                  className="flex flex-row border-solid border rounded-full border-main py-2 px-4 cursor-pointer mr-4"
                  onClick={() => {
                    setMatchRatingFilter(3)
                  }}
                >
                  <div
                    className={`rounded-full ${
                      matchFilter === MATCH_RATING_FILTER[3]
                        ? 'bg-black'
                        : 'bg-transparent'
                    } border-main border-solid border h-4 w-4 self-center mr-2`}
                  />
                  <p className="font-satoshiMedium text-base text-main">
                    75-100%
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col self-center w-1/2">
              <p className="font-satoshiRegular mb-3 text-black text-xl">
                Price ($USD)
              </p>
              <div className="flex flex-row align-middle">
                <div className="h-2 w-1/2 bg-priceSlider rounded-full self-center mr-4 cursor-pointer">
                  <div className="flex h-2 w-1/2 rounded-full bg-main justify-end">
                    <div className="h-4 w-4 bg-black rounded-full self-center cursor-pointer" />
                  </div>
                </div>
                <p className="font-satoshiMedium text-main text-[16]">
                  $0 - $
                  {parseFloat(
                    ethers.utils.formatUnits(highestPrice, 18)
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex flex-wrap py-8 px-[5%]">{nftMatches}</div>
      <SearchFooter />
    </div>
  )
}

export default MarketplacePage
