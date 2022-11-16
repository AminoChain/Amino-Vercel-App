import MarketplaceNav from '../marketplacePage/MarketplaceNav'
import MarketplaceBanner from '../marketplacePage/MarketplaceBanner'
import SearchBody from './SearchBody'
import SearchFooter from './SearchFooter'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { contractAddresses, abis } from '../../../constants/index'

const SearchPage = ({ setSearch }) => {
  const [isApproved, setIsApproved] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        if (!isApproved) {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          if (provider) {
            const signer = await provider.getSigner()
            const signerAddr = await signer.getAddress()

            const marketplaceContract = new ethers.Contract(
              contractAddresses.marketplace,
              abis.marketplace,
              signer
            )

            const approved = await marketplaceContract.isApprovedToBuy(
              signerAddr
            )
            if (approved) {
              setIsApproved(approved)
            } else {
              setIsApproved(false)
            }
          }
        }
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [])

  return (
    <div className="w-[100vw]">
      <MarketplaceBanner />
      <MarketplaceNav />
      {isApproved ? (
        <SearchBody setSearch={setSearch} />
      ) : (
        <div className="w-full flex flex-col mt-[2rem] mb-[18%] items-center">
          <div className="font-satoshiMedium text-black text-4xl p-2">
            Only Verified Doctors or Reseachers can access Marketplace
          </div>
          <div className="text-black font-satoshiRegular text-xl p-2">
            Visit the Profile Page to verify and whitelist your wallet address
          </div>
        </div>
      )}
      <SearchFooter />
    </div>
  )
}

export default SearchPage
