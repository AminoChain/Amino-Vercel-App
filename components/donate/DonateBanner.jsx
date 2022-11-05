import aminoLogo from '../../assets/aminoLogo2.png'
import Image from 'next/image'
import arrow from '../../assets/arrowRight.png'
import metamask from '../../assets/metamaskLogo.png'
import coinbase from '../../assets/coinbaseLogo.png'
import walletConnect from '../../assets/walletConnectLogo.png'
import { useState } from 'react'

const DonateBanner = () => {
  const [openStatus, setOpen] = useState(false)

  const WalletMenu = () => {
    return (
      <div
        className="fixed w-[100vw] h-[100vh] bg-slate-900 bg-opacity-50 z-10"
        onClick={() => setOpen(!openStatus)}
      >
        <div className="absolute w-[100vw] content-center align-middle flex flex-row bg-white px-[10%] py-[3rem] z-20 justify-between">
          <div className="flex flex-row align-middle">
            <p className="font-satoshiMedium text-main text-2xl self-center">
              Connect Wallet
            </p>
            <div className="self-center pl-[3rem] pr-[4rem] object-contain">
              <Image src={arrow} alt=">" height={24} width={24} />
            </div>
          </div>
          <div>
            <div className="flex flex-row w-[62vw] justify-between">
              <button className="align-middle flex flex-row max-w-[365px] w-full justify-center bg-marketplaceButton drop-shadow-marketplaceButtonShadow1 rounded-full py-[1rem]">
                <div className="object-contain self-center pr-[1rem]">
                  <Image src={metamask} alt="" height={40} width={40} />
                </div>
                <p className="self-center font-satoshiBold text-2xl text-black">
                  Metamask
                </p>
              </button>
              <button className="align-middle flex flex-row max-w-[365px] w-full justify-center bg-marketplaceButton drop-shadow-marketplaceButtonShadow1 rounded-full py-[1rem]">
                <div className="self-center pr-[1rem]">
                  <Image src={coinbase} alt="" height={40} width={40} />
                </div>
                <p className="self-center font-satoshiBold text-2xl text-black">
                  Coinbase
                </p>
              </button>
              <button className="align-middle flex flex-row max-w-[365px] w-full justify-center bg-marketplaceButton drop-shadow-marketplaceButtonShadow1 rounded-full py-[1rem]">
                <div className="self-center pr-[1rem] ">
                  <Image src={walletConnect} alt="" height={40} width={40} />
                </div>
                <p className="self-center font-satoshiBold text-2xl text-black">
                  Wallet Connect
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {openStatus ? WalletMenu() : <></>}
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
