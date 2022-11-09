import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import DonorProfileCard from './DonorProfileCard'
import { ethers } from 'ethers'

const DonorProfileBody = () => {
  const [userAddress, setUserAddress] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const signerAddr = await signer.getAddress()
        setUserAddress(signerAddr)
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [])

  const GET_DONOR_NFTS = gql`
    query Nfts($userAddress: Bytes!) {
      existingTokenIds(where: { donor: $userAddress }) {
        tokenId
        price
        sizeInCC
        bioBank
        buyer
      }
    }
  `

  const {
    loading,
    error,
    data: listing,
  } = useQuery(GET_DONOR_NFTS, {
    variables: { userAddress },
  })
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }
  if (error) return `Error! ${error}`

  let donorNftArray = []
  const getData = () => {
    listing.existingTokenIds.forEach((nft, index) => {
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b)
      donorNftArray.push({
        tokenId: nft.tokenId,
        bioBank: nft.bioBank,
        price: nft.price,
        size: nft.sizeInCC,
      })
    })
  }
  getData()

  const donorNfts = donorNftArray.map((item, index) => (
    <DonorProfileCard key={index} item={item} />
  ))
  const numOfDonations = donorNftArray.length

  return (
    <div className="w-full flex flex-row px-20 py-5">
      {userAddress === null ? (
        <div className="w-full justify-center flex px-auto font-satoshiMedium text-black text-4xl mt-[2rem] mb-[8%]">
          Connect Wallet To View Donations
        </div>
      ) : (
        <div className="w-full flex flex-row flex-wrap">
          {numOfDonations >= 1 ? (
            <div className="w-full flex flex-row flex-wrap">{donorNfts}</div>
          ) : (
            <div className="w-full flex flex-col mt-[2rem] mb-[4%] items-center">
              <div className="font-satoshiMedium text-black text-4xl p-2">
                You have no donated Stem Cells
              </div>
              <div className="text-black font-satoshiRegular text-xl p-2">
                Visit the Donations Page to start a donation
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DonorProfileBody
