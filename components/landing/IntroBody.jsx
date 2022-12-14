import Image from 'next/image'
import Link from 'next/link'
import cellImage from '../../assets/cell.png'
import donateImage from '../../assets/donateSymbol.png'
import marketplaceImage from '../../assets/marketplaceSymbol.png'

const IntroBody = () => {
  return (
    <div className="w-full flex flex-row justify-between px-[10%] py-[6rem]">
      <article className="w-[36%] flex flex-col z-[2]">
        <div className="text-8xl my-10">
          <span className=" text-black font-satoshiBold">Amino</span>
          <span className=" text-primary font-satoshiBold">Chain</span>
        </div>
        <div className="text-main text-5xl font-satoshiRegular mb-16 min-w-[500px]">
          Tokenizing stem cells and incentivising donors
        </div>
        <div className="flex flex-col ">
          <Link href="/donate">
            <div className="h-14 min-w-[340px] w-full flex justify-between items-center rounded-full px-10 py-8 drop-shadow-donatebuttonIntroShadow cursor-pointer bg-gradient-to-r from-gradientDonateStart to-gradientDonateEnd">
              <div className="font-satoshiBold text-black text-2xl">
                Donate Stem Cells
              </div>
              <Image
                src={donateImage}
                alt="donate button image"
                height={32}
                draggable="false"
              />
            </div>
          </Link>
          <Link href="/marketplace">
            <div className="h-14 min-w-[340px] w-full mt-10 flex justify-between items-center rounded-full px-10 py-8 drop-shadow-marketplaceButtonShadow1 cursor-pointer bg-marketplaceButton">
              <div className="font-satoshiBold text-black text-2xl">
                Visit Marketplace
              </div>
              <Image
                src={marketplaceImage}
                alt="donate button image"
                height={27}
                draggable="false"
              />
            </div>
          </Link>
        </div>
      </article>
      <div className="flex">
        <Image
          src={cellImage}
          width={690}
          height={690}
          alt="Image of a Cell"
          draggable="false"
        />
      </div>
    </div>
  )
}

export default IntroBody
