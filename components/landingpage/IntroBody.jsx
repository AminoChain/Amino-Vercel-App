import Image from 'next/image'
import Link from 'next/link'
import cellImage from '../../assets/cell.png'
import donateImage from '../../assets/donateSymbol.png'
import marketplaceImage from '../../assets/marketplaceSymbol.png'

const IntroBody = () => {
  return (
    <div className="w-screen flex flex-row justify-between px-[10%] py-[6rem]">
      <article className="w-[36%] flex flex-col">
        <div className="text-8xl my-10">
          <span className=" text-black font-bold">Amino</span>
          <span className=" text-primary font-bold">Chain</span>
        </div>
        <div className="text-main text-5xl font-normal mb-16">
          Tokenizing stem cells and incentivising donors
        </div>
        <div className="flex flex-col">
          <Link href="/donate">
            <div className="h-14 w-full flex justify-between items-center rounded-full px-10 py-8 drop-shadow-donatebuttonIntroShadow cursor-pointer bg-gradient-to-r from-gradientDonateStart to-gradientDonateEnd">
              <div className="font-bold text-black text-2xl">Donate</div>
              <Image src={donateImage} alt="donate button image" height={32} />
            </div>
          </Link>
          <Link href="/marketplace">
            <div className="h-14 w-full mt-10 flex justify-between items-center rounded-full px-10 py-8 drop-shadow-marketplaceButtonShadow cursor-pointer bg-marketplaceButton">
              <div className="font-bold text-black text-2xl">Marketplace</div>
              <Image
                src={marketplaceImage}
                alt="donate button image"
                height={27}
              />
            </div>
          </Link>
        </div>
      </article>
      <Image
        src={cellImage}
        className="opacity-80"
        width={690}
        height={690}
        alt="Image of a Cell"
      />
    </div>
  )
}

export default IntroBody
