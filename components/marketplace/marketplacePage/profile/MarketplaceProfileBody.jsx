import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import MarketplaceProfileStats from './MarketplaceProfileStats'
import MarketplaceProfileTxComplete from './MarketplaceProfileTxComplete'
import MarketplaceCreateAccount from './MarketplaceCreateAccount'
import MarketplaceProfileTxPending from './MarketplaceProfileTxPending'
import { contractAddresses, abis } from '../../../../constants/index'

const MarketplaceProfileBody = () => {
  const [userAddress, setUserAddress] = useState(
    '0x0000000000000000000000000000000000000000'
  )
  const [shippingAddress, setShippingAddress] = useState(false)
  const [totalSpent, setTotalSpent] = useState(null)
  const [marketplace, setMarketplace] = useState(null)
  const [isApproved, setIsApproved] = useState(null)

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

        const marketplaceContract = new ethers.Contract(
          contractAddresses.marketplace,
          abis.marketplace,
          signer
        )
        setMarketplace(marketplaceContract)

        const approved = await marketplaceContract.isApprovedToBuy(signerAddr)
        if (approved) {
          setIsApproved(approved)
        } else {
          setIsApproved(false)
        }
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [])

  async function requestAccess() {
    try {
      const tx = await marketplace.requestBuyAccess()
      await tx.wait(6).then(() => {
        window.location.reload()
      })
    } catch (e) {
      console.warn(e)
    }
  }

  const GET_BUYER_PURCHASES_COMPLETED = gql`
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
    data: completedSales,
  } = useQuery(GET_BUYER_PURCHASES_COMPLETED, {
    variables: { userAddress },
  })

  const GET_BUYER_PURCHASES_PENDING = gql`
    query Nfts($userAddress: Bytes!) {
      saleInitiateds(where: { buyer: $userAddress }) {
        buyer
        tokenId
        sizeInCC
        donor
        transactionHash
        timestamp
        escrowedPayment
      }
    }
  `

  const {
    loading: loading1,
    error: error1,
    data: pendingSales,
  } = useQuery(GET_BUYER_PURCHASES_PENDING, {
    variables: { userAddress },
  })

  if (loading || loading1) {
    return (
      <div>
        <h2 className="font-satoshiRegular text-black w-1/2">Loading...</h2>
      </div>
    )
  }
  if (error || error1) return `Error! ${error}  ${error1}`

  let buyerCompletedPurchasesArray = []
  let spent = 0
  const getDataCompleted = () => {
    try {
      completedSales.saleCompleteds.forEach((sale, index) => {
        buyerCompletedPurchasesArray.push({
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
  const organizeByTimeCompleted = () => {
    buyerCompletedPurchasesArray.sort((a, b) => {
      return parseInt(b.date) - parseInt(a.date)
    })
  }
  let buyerPendingPurchasesArray = []
  const getDataPending = () => {
    try {
      pendingSales.saleInitiateds.forEach((sale, index) => {
        buyerPendingPurchasesArray.push({
          date: sale.timestamp,
          transcationHash: sale.transactionHash,
          escrowedPayment: sale.escrowedPayment,
          donor: sale.donor,
          tokenId: sale.tokenId,
          size: sale.sizeInCC,
        })
      })
    } catch (e) {
      console.warn(e)
    }
  }
  const organizeByTimePending = () => {
    buyerPendingPurchasesArray.sort((a, b) => {
      return parseInt(b.date) - parseInt(a.date)
    })
  }
  getDataCompleted()
  organizeByTimeCompleted()
  getDataPending()
  organizeByTimePending()

  const numPurchasedComplete = buyerCompletedPurchasesArray.length
  const numPurchasedPending = buyerPendingPurchasesArray.length

  const completedTxs = buyerCompletedPurchasesArray.map((item, index) => (
    <MarketplaceProfileTxComplete key={index} item={item} index={index} />
  ))

  const pendingTxs = buyerPendingPurchasesArray.map((item, index) => (
    <MarketplaceProfileTxPending key={index} item={item} index={index} />
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
                numPurchasedComplete={numPurchasedComplete}
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
                    {numPurchasedPending > 0 ? (
                      <div className="flex flex-col">{pendingTxs}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full mt-8">
                <p className="font-satoshiMedium text-main text-xl pl-8">
                  Pending Purchases
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
                    {numPurchasedComplete > 0 ? (
                      <div className="flex flex-col">{completedTxs}</div>
                    ) : (
                      <div>
                        {isApproved ? (
                          <div className="w-full flex flex-col mt-[4rem] mb-[4%] items-center">
                            <div className="font-satoshiMedium text-black text-4xl p-2">
                              You have no purchases
                            </div>
                            <div className="text-black font-satoshiRegular text-xl p-2">
                              Visit the Marketplace to buy your first order!
                            </div>
                          </div>
                        ) : (
                          <div className="w-full flex flex-col mt-[4rem] mb-[4%] items-center">
                            <div className="font-satoshiMedium text-black text-4xl p-2">
                              You are not whitelisted to purchase stem cells
                            </div>
                            <div className="text-black font-satoshiRegular text-xl p-2">
                              Click the button below to request buy access
                            </div>
                            <button
                              className="mt-8 py-5 px-[5rem] rounded-full text-xl font-satoshiBold text-black bg-gradient-to-r drop-shadow-marketplaceButtonShadow1 from-gradientDonateStart to-gradientDonateEnd"
                              onClick={requestAccess}
                            >
                              Request Buy Access
                            </button>
                          </div>
                        )}
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
