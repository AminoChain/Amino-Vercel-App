import { ethers } from 'ethers'
import Image from 'next/image'
import usdcLogo from '../../../../assets/usdcLogo.png'
import hidden from '../../../../assets/hlaHidden.png'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  contractAddresses,
  abis,
  biobankNames,
} from '../../../../constants/index'
import { platformBackend } from '../../../../context/state'

const NftDetailsAndBuy = ({ nftData }) => {
  const router = useRouter()
  const [hlaHidden, setHlaHidden] = useState(true)
  const [genomeHidden, setGenomeHidden] = useState(true)
  const [hlaSource, setHlaSource] = useState()
  const [genome, setGenome] = useState()
  const [signerAddress, setSignerAddress] = useState(null)
  const [marketplace, setMarketplace] = useState(null)
  const [isApproved, setIsApproved] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        if (!isApproved) {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          if (provider) {
            const signer = await provider.getSigner()
            const signerAddr = await signer.getAddress()
            setSignerAddress(signerAddr)

            const marketplaceContract = new ethers.Contract(
              contractAddresses.marketplace,
              abis.marketplace,
              signer
            )
            setMarketplace(marketplaceContract)

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
  const price = ethers.utils.formatUnits(nftData.price, 6).toString()

  const BioBankNames = biobankNames
  const date = new Date(nftData.mintTimestamp * 1000)

  async function postData() {
    let shipment
    try {
      const res = await fetch('/api/single-buyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signerAddress),
      })
      if (res.ok) {
        const body = await res.json()
        const noNulls = Object.values(body.shippingInfo).every(
          (element) => element !== null || undefined || ''
        )
        if (noNulls) {
          shipment = {
            service_code: 'ups_ground',
            ship_to: {
              name: `${body.name}`,
              address_line1: `${body.shippingInfo.street}`,
              city_locality: `${body.shippingInfo.city}`,
              state_province: `${body.shippingInfo.state}`,
              postal_code: `${body.shippingInfo.zipcode}`,
              country_code: 'US',
              address_residential_indicator: 'yes',
            },
            ship_from: {
              name: 'Tester',
              phone: '555-555-5555',
              company_name: 'Example Corp',
              address_line1: '4009 Marathon Blvd',
              city_locality: 'Austin',
              state_province: 'TX',
              postal_code: '78756',
              country_code: 'US',
              address_residential_indicator: 'no',
            },
            packages: [
              {
                dimensions: {
                  height: 6,
                  width: 12,
                  length: 24,
                  unit: 'inch',
                },
                weight: {
                  value: 20,
                  unit: 'ounce',
                },
              },
            ],
          }
        }
      }

      const response = await fetch(
        `http://34.170.13.163/shipPackage/${nftData.tokenId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(shipment),
        }
      )
      let ship = await response.json()
      console.log(ship)
      return ship
    } catch (error) {
      console.warn(error)
    }
  }

  async function updateProfile(trackingNumber) {
    //let tempTrackingnum = '1Z6844599958396849'
    const purchasedNft = {
      address: signerAddress,
      trackingNumber: trackingNumber,
      tokenId: nftData.tokenId,
    }
    try {
      const res = await fetch('/api/add-nft-with-tracking-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchasedNft),
      })
      console.log(res)
      if (res.ok) {
        const body = await res.json()
        console.log(body)
        return body
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const unhideHla = async () => {
    try {
      if (isApproved === true) {
        const response = await fetch(
          platformBackend + `decode-hla/${nftData.tokenId}`
        )
        if (response.ok) {
          setHlaSource(await response.json())
          setHlaHidden(!hlaHidden)
        }
      } else {
        console.warn('Address not approved as doctor or reseacher')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const unhideGenome = async () => {
    try {
      if (isApproved === true) {
        const response = await fetch(
          platformBackend + `decode-genome/${nftData.tokenId}`
        )
        if (response.ok) {
          setGenome(await response.text())
          setGenomeHidden(false)
        }
      } else {
        console.warn('Address not approved as doctor or reseacher')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function handlePurchase() {
    let usdcContract
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()

      usdcContract = new ethers.Contract(
        contractAddresses.usdc,
        abis.usdc,
        signer
      )

      const allowance = await usdcContract.allowance(
        signerAddress,
        contractAddresses.marketplace
      )
      if (
        parseInt(allowance.toString()) >= parseInt(nftData.price.toString())
      ) {
        try {
          const tx = await marketplace.buyItem(nftData.tokenId) //buys nft
          await tx.wait(2)
          const shippingInfo = await postData()
          const trackingNumber = shippingInfo.tracking_number
          await updateProfile(trackingNumber)
          router.push(
            `/marketplace/nft/shipping?tokenId=${nftData.tokenId}&trackingNum=${trackingNumber}`
          )
          // routes to the shipping page
        } catch (e) {
          console.warn(e)
        }
      } else {
        //approve maximum amount {trade off between ux and user security}
        try {
          const tx = await usdcContract.approve(
            contractAddresses.marketplace,
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
          )
          await tx.wait(2).then(() => {
            handlePurchase()
          })
        } catch (e) {
          console.warn(e)
        }
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
          {isApproved ? (
            <div>
              {hlaHidden ? (
                <div
                  onClick={unhideHla}
                  className="flex flex-row justify-between py-4 px-6 w-3/4 font-satoshiMedium cursor-pointer text-base rounded-md bg-hiddenHla text-black mb-4"
                >
                  Only Available to doctors and researchers.
                  <div className="flex h-min self-center">
                    <Image src={hidden} alt="" draggable="false" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row space-x-[2rem] font-satoshiBold text-black text-base mb-4">
                  <div className="flex flex-col">
                    <p className="pb-2">HLA A: {hlaSource.A.join(' : ')}</p>
                    <p>HLA DRB: {hlaSource.DRB.join(' : ')}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="pb-2">HLA B: {hlaSource.B.join(' : ')}</p>
                    <p>HLA DPB: {hlaSource.DPB.join(' : ')}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="pb-2">HLA C: {hlaSource.C.join(' : ')}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-row justify-between py-4 px-6 w-3/4 font-satoshiMedium cursor-not-allowed text-base rounded-md bg-hiddenHla text-black mb-4">
              Only Available to doctors and researchers.
              <div className="flex h-min self-center">
                <Image src={hidden} alt="" draggable="false" />
              </div>
            </div>
          )}

          <p className="text-main font-satoshiRegular text-base pb-2">
            Genome and Donor Condition Details
          </p>
          {isApproved ? (
            <div>
              {genomeHidden ? (
                <div
                  onClick={unhideGenome}
                  className="flex flex-row justify-between py-4 px-6 w-3/4 cursor-pointer font-satoshiMedium text-base rounded-md bg-hiddenHla text-black"
                >
                  Only Available to doctors and researchers.
                  <div className="flex h-min self-center">
                    <Image src={hidden} alt="" draggable="false" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row space-x-[2rem] font-satoshiBold text-black text-base">
                  {genome}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-row justify-between py-4 px-6 w-3/4 cursor-not-allowed font-satoshiMedium text-base rounded-md bg-hiddenHla text-black">
              Only Available to doctors and researchers.
              <div className="flex h-min self-center">
                <Image src={hidden} alt="" draggable="false" />
              </div>
            </div>
          )}
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
                {date.toLocaleDateString()}
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
              ${parseFloat(price).toLocaleString('en-US')} USDC
            </div>
          </div>
        </div>
        {isApproved ? (
          <button
            className=" py-5 px-[5rem] rounded-full text-xl font-satoshiBold text-black bg-gradient-to-r drop-shadow-marketplaceButtonShadow1 from-gradientDonateStart to-gradientDonateEnd"
            onClick={handlePurchase}
          >
            Buy Now
          </button>
        ) : (
          <button className=" py-5 px-[5rem] cursor-not-allowed rounded-full text-xl font-satoshiBold text-black bg-gradient-to-r drop-shadow-marketplaceButtonShadow1 from-gradientDonateStart to-gradientDonateEnd opacity-40">
            Buy Now
          </button>
        )}
      </div>
    </div>
  )
}

export default NftDetailsAndBuy
