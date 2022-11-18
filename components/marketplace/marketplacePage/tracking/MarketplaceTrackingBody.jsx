import locate from '../../../../assets/locate.png'
import Image from 'next/image'
import { useState } from 'react'

const MarketplaceTrackingBody = () => {
  const [orderId, setOrderId] = useState('')
  const findOrder = async (e) => {
    e.preventDefault()

    const checkConnection = async () => {
      let provider, signer
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = await provider.getSigner(0)
      } catch (e) {
        console.log(e)
      }

      if (signer === undefined) {
        return false
      } else {
        try {
          let address = await signer.getAddress()
          return address
        } catch (e) {
          console.log(e)
        }
      }
    }
    const address = await checkConnection()
    if (address) {
      const trackingId = e.target[0].value
     
      try {
        const res = await fetch('/api/single-buyer', { // this is for getting the tracking number for the tx details list
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (res.ok) {
          setShippingAddress(true)
        }
      } catch (error) {
        console.error(error)
      }
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
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
          />
        </div>
      </form>
    </div>
  )
}

export default MarketplaceTrackingBody
