import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import MarketplaceProfileStats from './MarketplaceProfileStats'
import MarketplaceProfileTx from './MarketplaceProfileTx'
import MarketplaceCreateAccount from './MarketplaceCreateAccount'

const MarketplaceProfileBody = () => {
  const [userAddress, setUserAddress] = useState(
    '0x0000000000000000000000000000000000000000'
  )
  const [shippingAddress, setShippingAddress] = useState(false)
  const [totalSpent, setTotalSpent] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner(0)
        const signerAddr = await signer.getAddress()
        setUserAddress(signerAddr)
        const res = await fetch('/api/single-buyer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signerAddr),
        })
        if (res.ok) {
          const body = await res.json()
          const noNulls = Object.values(body.shippingInfo).every(
            (element) => element !== null || undefined || ''
          )
          if (noNulls) {
            setShippingAddress(true)
          }
        }
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [])

  const GET_BUYER_PURCHASES = gql`
    query Nfts($userAddress: Bytes!) {
      saleCompleteds(where: { buyer: $userAddress }) {
        timestamp
        sizeInCC
        tokenId
        transactionHash
        salePrice
        donor
      }
    }
  `

  const {
    loading,
    error,
    data: sales,
  } = useQuery(GET_BUYER_PURCHASES, {
    variables: { userAddress },
  })
  if (loading) {
    return (
      <div>
        <h2 className="font-satoshiRegular text-black w-1/2">Loading...</h2>
      </div>
    )
  }
  if (error) return `Error! ${error}`

  let buyerPurchasesArray = []
  let spent = 0
  const getData = () => {
    try {
      sales.saleCompleteds.forEach((sale, index) => {
        buyerPurchasesArray.push({
          date: sale.timestamp,
          transcationHash: sale.transactionHash,
          price: sale.salePrice,
          donor: sale.donor,
          tokenId: sale.tokenId,
          size: sale.sizeInCC,
        })
        spent = spent + parseFloat(ethers.utils.formatUnits(sale.salePrice, 6))
      })
      if (totalSpent !== spent) {
        setTotalSpent(spent)
      }
    } catch (e) {
      console.warn(e)
    }
  }
  const organizeByTime = () => {
    buyerPurchasesArray.sort((a, b) => {
      return parseInt(b.date) - parseInt(a.date)
    })
  }
  getData()
  organizeByTime()

  const numPurchased = buyerPurchasesArray.length

  const earningTxs = buyerPurchasesArray.map((item, index) => (
     <MarketplaceProfileTx key={index} item={item} index={index} />
     ))

  return (
    <div className="w-full flex flex-row px-20 py-5">
      {userAddress === '0x0000000000000000000000000000000000000000' ? (
        <div className="w-full">
          <div className="w-full justify-center flex px-auto font-satoshiMedium text-black text-4xl mt-[2rem] mb-[8%]">
            Connect Wallet To View Profile
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-row flex-wrap">
          {!shippingAddress ? (
            <div className="w-full">
              <div className="w-full justify-center flex px-auto font-satoshiMedium text-black text-4xl mt-[2rem] mb-[8%]">
                Finish your profile by filling out the below form
              </div>
              <MarketplaceCreateAccount
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col">
              <MarketplaceProfileStats
                totalSpent={totalSpent}
                numPurchased={numPurchased}
              />
              <div className="w-full mt-8">
                <p className="font-satoshiMedium text-main text-xl pl-8">
                  Completed Purchases
                </p>
                <div className="w-full flex flex-row flex-wrap">
                  <div className="w-full flex flex-col">
                    <div className="w-full flex rounded-[200px] border-t-[1px] border-b-[1px] border-main py-2 pl-8 mt-4">
                      <div className="font-satoshiMedium text-main basis-[24%]">
                        Date & Time
                      </div>
                      <div className="font-satoshiMedium text-main basis-[18%]">
                        Donor Address
                      </div>
                      <div className=" font-satoshiMedium text-main basis-[18%]">
                        Size
                      </div>
                      <div className=" font-satoshiMedium text-main basis-[18%]">
                        Amount
                      </div>
                      <div className=" font-satoshiMedium text-main basis-[15%]">
                        Tracking#
                      </div>
                      <div className=" font-satoshiMedium text-main whitespace-nowrap">
                        Txn Hash
                      </div>
                    </div>
                    {numPurchased > 0 ? (
                      <div className="flex flex-col">{earningTxs}</div>
                    ) : (
                      <div className="w-full flex flex-col mt-[2rem] mb-[4%] items-center">
                        <div className="font-satoshiMedium text-black text-4xl p-2">
                          You have no purchases
                        </div>
                        <div className="text-black font-satoshiRegular text-xl p-2">
                          Visit the Marketplace to buy your first order!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MarketplaceProfileBody
