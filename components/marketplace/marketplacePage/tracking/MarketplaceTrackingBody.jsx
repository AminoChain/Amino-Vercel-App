import locate from '../../../../assets/locate.png'
import Image from 'next/image'
import { useState } from 'react'

const MarketplaceTrackingBody = () => {
  const [trackingNum, setTrackingNum] = useState('')
  const [deliveryStatus, setDeliveryStatus] = useState('')
  const findOrder = async (e) => {
    e.preventDefault()
    //let inTransit = "In Transit"
    // const trackingId = e.target[0].value

    try {
      const res = await fetch(
        `http://34.170.13.163/getpackageStatus/${trackingNum}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (res.ok) {
        let body = await res.json()
        setDeliveryStatus(body.deliveryStatus)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex flex-col px-36 pt-6 pb-[8%]">
      <div className=" font-satoshiBold text-[40px] text-black">
        Track shipment
      </div>
      <div className=" font-satoshiMedium text-black text-xl py-2">
        Enter Order ID of your purchase
      </div>
      <form onSubmit={findOrder} className="flex w-1/4 py-6">
        <div className="flex flex-row w-full border border-main bg-white px-5 rounded-full justify-start">
          <div className="flex items-center pr-[0.6rem] ">
            <Image src={locate} alt="target image" />
          </div>
          <input
            className="w-fit font-satoshiRegular text-base focus:outline-0 bg-white text-main border-0 py-2"
            type="text"
            onChange={(e) => setTrackingNum(e.target.value)}
            placeholder="Enter Order ID"
          />
        </div>
      </form>
      <div  className=" font-satoshiBold text-[40px] text-black">
      {(() => {
        switch (deliveryStatus) {
          case "1":
            return "Status: In Transit"
          case "2":
            return "Status: Delivered"
          default:
            return null
        }
      })()}
      </div>
    </div>
  )
}

export default MarketplaceTrackingBody
