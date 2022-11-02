import Image from 'next/image'
import cellImage from '../../assets/cell.png'
import donateImage from '../../assets/donateSymbol.png'
import marketplaceImage from '../../assets/marketplaceSymbol.png'

const Intro = () => {
  return (
    <div className="w-full flex flex-row p-20">
      <article className="w-1/2 flex flex-col">
        <div className="text-8xl my-10">
          <span className=" text-black">Amino</span>
          <span className=" text-primary">Chain</span>
        </div>
        <div className="text-main text-6xl font-light">
          Tokenizing stem cells and incentivising donors
        </div>
        <div className="flex flex-col">
          <div className="h-14 w-1/2 m-5 flex justify-between items-center rounded-full px-10 py-5 drop-shadow-donatebuttonIntroShadow bg-gradient-to-r from-gradientDonateStart to-gradientDonateEnd">
            <div>Donate</div>
            <Image src={donateImage} alt="donate button image" height={32} />
          </div>
          <div className="h-14 w-1/2 m-5 flex justify-between items-center rounded-full px-10 py-5 drop-shadow-marketplaceButtonShadow bg-marketplaceButton">
            <div>Markeplace</div>
            <Image src={marketplaceImage} alt="donate button image" height={27} />
          </div>
        </div>
      </article>
      <Image src={cellImage} width={690} height={690} alt="Image of a Cell" />
    </div>
  )
}

export default Intro
