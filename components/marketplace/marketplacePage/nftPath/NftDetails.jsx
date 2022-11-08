import { ethers } from 'ethers'
import Image from 'next/image'
import usdcLogo from '../../../../assets/usdcLogo.png'
import hidden from '../../../../assets/hlaHidden.png'
import {useEffect, useState} from 'react'
import { contractAddresses, abis } from '../../../../constants/index'

const NftDetailsAndBuy = ({ nftData }) => {
  const [hlaHidden, setHlaHidden] = useState(true)
  const [marketplace, setMarketplace] = useState()
  const [userAddress, setUserAddress] = useState()

  useEffect(() => {
    (async () => {
      let provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()
      const signerAddr = await signer.getAddress()
      setUserAddress(signerAddr)

      const marketplaceContract = new ethers.Contract(
          contractAddresses.marketplace,
          abis.marketplace,
          signer
      )
      setMarketplace(marketplaceContract)
    })()
  }, [])

  const biobank = nftData.bioBank
  const donor =
    nftData.donor.slice(0, 4) +
    '...' +
    nftData.donor.slice(nftData.donor.length - 4, nftData.donor.length)
  const nftContract =
    contractAddresses.donation.slice(0, 4) +
    '...' +
    contractAddresses.donation.slice(
      contractAddresses.donation.length - 4,
      contractAddresses.donation.length
    )
  const price = ethers.utils.formatUnits(nftData.price, 18).toString() //change back to 6 decimals later

  const BioBankNames = {
    '0x53c847035e9c2ea3aead920d395bccd7768ee63f': 'Coriell',
    '0x35a5b80732efe78d171327c39de408227c299aac': 'Greenville',
    '': 'National',
  }

  const checkIfCanUnhide = async () => {
    try {
      // const approved = await marketplace.ApprovedToBuy(userAddress) // ApprovedToBuy not public
      const approved = true

      if (approved === true) {
        setHlaHidden(!hlaHidden)
      } else {
        console.warn('Address not approved as doctor or reseacher')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function handlePurchase() {
    let usdcContract, marketplace
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()
      const signerAddr = await signer.getAddress()

      usdcContract = new ethers.Contract(
        contractAddresses.usdc,
        abis.usdc,
        signer
      )
      marketplace = new ethers.Contract(
        contractAddresses.marketplace,
        abis.marketplace,
        signer
      )

      const price = await marketplace.getListingData(nftData.tokenId)
      const userBal = await usdcContract.balanceOf(signerAddr)

      if (parseInt(userBal.toString()) >= parseInt(price.price.toString())) {
        const allowance = await usdcContract.allowance(
          signerAddr,
          contractAddresses.marketplace
        )
        if (
          parseInt(allowance.toString()) >= parseInt(price.price.toString())
        ) {
          try {
            await marketplace.buyItem(nftData.tokenId)
          } catch (e) {
            console.warn(e)
          }
        } else {
          //approve maximum amount {trade off between ux and user security}
          try {
            await usdcContract.approve(
              contractAddresses.marketplace,
              '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
            )
          } catch (e) {
            console.warn(e)
          }
        }
      } else {
        console.warn('User usdc balance too low.')
      }
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div className="w-2/3 flex flex-col px-8">
      <div className="border-l-2 p-4 mb-2 rounded-xl w-full ">
        <div className=" flex flex-col">
          <div className="pb-4 font-satoshiBold text-base text-main">
            Sequence Details
          </div>
          <div className="border-b-[1px] "></div>
        </div>
        <div className="flex flex-col pt-4">
          <p className="text-main font-satoshiRegular text-base pb-2">
            HLA Haplotypes
          </p>
          {hlaHidden ? (
            <div className="flex flex-row justify-between py-4 px-6 w-3/4 font-satoshiMedium text-base rounded-md bg-hiddenHla text-black">
              Only Available to doctors and researchers.
              <div
                className="flex h-min self-center cursor-pointer"
                onClick={checkIfCanUnhide}
              >
                <Image src={hidden} alt="" draggable="false" />
              </div>
            </div>
          ) : (
            <div className="flex flex-row space-x-[2rem] font-satoshiBold text-black text-base">
              <div className="flex flex-col">
                <p className="pb-2">HLA A* 2 : 123</p>
                <p>HLA DRB* 4 : 165</p>
              </div>
              <div className="flex flex-col">
                <p className="pb-2">HLA B* 51 : 123</p>
                <p>HLA DPB* 35 : 1 : 1</p>
              </div>
              <div className="flex flex-col">
                <p className="pb-2">HLA C* 4 : 213</p>
                <p>HLA DQA* 6 : 1</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between w-fit ">
          <div className="px-4 font-satoshiRegular">{nftData.halotypes_A}</div>
          <div className="px-4 font-satoshiRegular">{nftData.halotypes_B}</div>
          <div className="px-4 font-satoshiRegular">{nftData.halotypes_C}</div>
        </div>
        <div className="flex justify-between w-fit">
          <div className="px-4 font-satoshiRegular">
            {nftData.halotypes_DPB}
          </div>
          <div className="px-4 font-satoshiRegular">
            {nftData.halotypes_DRB}
          </div>
        </div>
      </div>
      <div className="border-l-2 px-4 py-4 rounded-xl w-full my-2">
        <div className="flex flex-col">
          <div className="pb-4 font-satoshiBold text-base text-main">
            Donation Details
          </div>
          <div className="border-b-[1px] "></div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-full">
            <div className=" flex flex-col">
              <div className="pt-4 pb-2 font-satoshiRegular text-base text-main">
                Donor
              </div>
              <div className="font-satoshiMedium text-xl text-black">
                {donor}
              </div>
            </div>
            <div className=" flex flex-col">
              <div className="pt-4 pb-2 font-satoshiRegular text-base text-main">
                TokenId
              </div>
              <div className="font-satoshiMedium text-xl text-black">
                {nftData.tokenId}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className=" flex flex-col">
              <div className="pt-4 pb-2 font-satoshiRegular text-base text-main">
                Donated On
              </div>
              <div className="font-satoshiMedium text-xl text-black">
                July 19, 2022
              </div>
            </div>
            <div className=" flex flex-col">
              <div className="pt-4 pb-2 font-satoshiRegular text-base text-main">
                Contract Address
              </div>
              <div className="font-satoshiMedium text-xl text-black">
                {nftContract}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className=" flex flex-col">
              <div className="pt-4 pb-2 font-satoshiRegular text-base text-main">
                BioBank
              </div>
              <div className="font-satoshiMedium text-xl text-black">
                {BioBankNames[biobank]}
              </div>
            </div>
            <div className=" flex flex-col">
              <div className="pt-4 pb-2 font-satoshiRegular text-base text-main">
                Amount
              </div>
              <div className="font-satoshiMedium text-xl text-black">
                {nftData.sizeInCC} CC
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-2/3 px-4 pt-2 items-center justify-around">
        <div className="flex flex-col">
          <div className="pt-2 font-satoshiRegular text-base text-main">
            Price
          </div>
          <div className="flex items-center">
            <div className="p-2 pl-0 flex items-center">
              <Image src={usdcLogo} alt="usdcLogo" draggable="false" />
            </div>
            <div className="p-2 font-satoshiBold text-black text-xl">
              ${parseFloat(price).toLocaleString()} USDC
            </div>
          </div>
        </div>
        <button
          className=" py-5 px-[5rem] rounded-full text-xl font-satoshiBold text-black bg-gradient-to-r drop-shadow-marketplaceButtonShadow1 from-gradientDonateStart to-gradientDonateEnd"
          onClick={handlePurchase}
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default NftDetailsAndBuy
