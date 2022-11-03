import aminoLogo from '../../assets/aminoLogo2.png'
import Image from 'next/image'

const Banner = () => {
  return (
    <div className="w-full h-[30vh] flex items-end bg-gradient-to-br from-greenHLADRB to-yellowHLADPB">
      <div className="w-full flex justify-between items-center px-20 py-5">
        <div className="text-6xl flex ">
          <div className=" text-black">gm, </div>
          <div className="text-main">insert wallet address</div>
        </div>
        <Image src={aminoLogo} />
      </div>
    </div>
  )
}

export default Banner
