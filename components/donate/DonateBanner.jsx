import aminoLogo from '../../assets/aminoLogo2.png'
import Image from 'next/image'
import { useState } from 'react'
import WalletMenu from './WalletMenu'

const DonateBanner = () => {
  const [openStatus, setOpen] = useState(false)

  return (
    <div className="w-full">
      {openStatus ? <WalletMenu openStatus={openStatus} setOpen={setOpen}/> : <></>}
      <div className="w-full h-[30vh] flex items-end bg-gradient-to-br from-greenHLADRB to-yellowHLADPB">
        <div className="w-full flex justify-between items-center px-20 py-5">
          <div
            className="text-6xl flex cursor-pointer"
            onClick={() => setOpen(!openStatus)}
          >
            <div className=" text-black font-satoshiBold">gm,&nbsp;</div>
            <div className="text-main font-satoshiBold">
              insert wallet address
            </div>
          </div>
          <a href="./">
            <Image src={aminoLogo} alt="amino logo image" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default DonateBanner
