import Image from 'next/image'
import Link from 'next/link'
import { ethers } from 'ethers'
import dot from '../../../../assets/footerDot.png'
import linkIcon from '../../../../assets/share.png'
import usdcLogo from '../../../../assets/usdcLogo.png'
import { useState } from 'react'
const MarketplaceProfileTxPending = ({ item }) => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const donorShort =
    item.donor.slice(0, 4) +
    '...' +
    item.donor.slice(item.donor.length - 4, item.donor.length)
  const txHashShort =
    item.transcationHash.slice(0, 4) +
    '...' +
    item.transcationHash.slice(
      item.transcationHash.length - 4,
      item.transcationHash.length
    )
  const price = ethers.utils.formatUnits(item.escrowedPayment, 6).toString()

  const date = new Date(item.date * 1000)

  const retrieveNftTrackingNumber = async () => {
    const res = await fetch('/api/buyer-nft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item.tokenId),
    })
    if (res.ok) {
      const body = await res.json()
      setTrackingNumber(body.trackingNumber)
    }
  }
  retrieveNftTrackingNumber()

  return (
    <div className="w-full flex items-center border-b-[1px] border-main py-8 pl-8 ">
      <div className="font-satoshiMedium text-black flex items-center basis-[24%]">
        {date.toLocaleDateString()}
        <div className="flex items-center px-2">
          <Image src={dot} alt="dot image" draggable="false" />
        </div>
        {date.toLocaleTimeString()}
      </div>
      <div className=" font-satoshiMedium text-black text-lg basis-[18%]">
        {donorShort}
      </div>
      <div className=" font-satoshiMedium text-black text-lg basis-[18%]">
        {item.size} cc
      </div>
      <div className="flex flex-row font-satoshiMedium text-black text-lg items-center basis-[25%]">
        <div className="flex mr-2 self-center">
          <Image src={usdcLogo} alt="" draggable="false" />
        </div>
        <p>
          {parseFloat(price)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </p>
      </div>
      <div className=" font-satoshiMedium text-black text-lg basis-[18%]">
        {trackingNumber}
      </div>
      <Link href={`https://mumbai.polygonscan.com/tx/` + item.transcationHash}>
        <div className="flex flex-row font-satoshiMedium text-black text-lg justify-center cursor-pointer">
          {txHashShort}
          <div className="ml-2">
            <Image src={linkIcon} alt="" draggable="false" />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MarketplaceProfileTxPending
