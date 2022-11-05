import Image from 'next/image'
import chainlink from '../../assets/chainlinkLogo.png'
import antler from '../../assets/antlerLogo.png'
import polygon from '../../assets/polygonLogo.png'
import eth from '../../assets/ethLogo.png'
import ipfs from '../../assets/ipfsLogo.png'
import placeholder from '../../assets/placeholderLogo.png'

const PoweredBody = () => {
  return (
    <div className="w-full mt-40 px-[10%]">
      <p className="text-main font-satoshiMedium text-2xl">Powered By</p>
      <div className="flex flex-row content-center mt-[2rem] justify-between">
        <div className="flex py-auto content-center h-fit self-center">
          <Image src={chainlink} alt="chainlink" />
        </div>
        <div className="flex py-auto content-center h-fit self-center">
          <Image src={antler} alt="antler" />
        </div>
        <div className="flex py-auto content-center h-fit self-center">
          <Image src={polygon} alt="polygon" />
        </div>
        <div className="flex py-auto content-center h-fit self-center">
          <Image src={eth} alt="ethereum" />
        </div>
        <div className="flex py-auto content-center h-fit self-center">
          <Image src={ipfs} alt="ipfs" />
        </div>
        <div className="flex py-auto content-center h-fit self-center">
          <Image src={placeholder} alt="placeholder" />
        </div>
      </div>
    </div>
  )
}

export default PoweredBody
