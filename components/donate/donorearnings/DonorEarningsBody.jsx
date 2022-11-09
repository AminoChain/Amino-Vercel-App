import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

const DonorEarningsBody = () => {
  const [userAddress, setUserAddress] = useState(
    '0x0000000000000000000000000000000000000000'
  )

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

  const GET_DONOR_EARNINGS = gql`
    query Nfts($userAddress: Bytes!) {
      saleCompleteds(where: { donor: $userAddress }) {
        transactionHash
        donorIncentive
      }
    }
  `

  const {
    loading,
    error,
    data: sales,
  } = useQuery(GET_DONOR_EARNINGS, {
    variables: { userAddress },
  })
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  let donorSalesArray = []
  const getData = () => {
    sales.saleCompleteds.forEach((sale, index) => {
      donorSalesArray.push({
        transcationHash: sale.transcationHash,
        incentive: sale.donorIncentive,
      })
    })
  }
  getData()

  const numOfIncentives = donorSalesArray.length

  return (
    <div className="w-full flex flex-row px-20 py-5">
      {userAddress === '0x0000000000000000000000000000000000000000' ? (
        <div className="w-full justify-center flex px-auto font-satoshiMedium text-black text-4xl mt-[2rem] mb-[8%]">
          Connect Wallet To View Earnings
        </div>
      ) : (
        <div className="w-full flex flex-row flex-wrap">
          {numOfIncentives >= 1 ? (
            <div className="w-full flex flex-row flex-wrap">x</div>
          ) : (
            <div className="w-full flex flex-col mt-[2rem] mb-[4%] items-center">
              <div className="font-satoshiMedium text-black text-4xl p-2">
                You have no Earnings
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

export default DonorEarningsBody
