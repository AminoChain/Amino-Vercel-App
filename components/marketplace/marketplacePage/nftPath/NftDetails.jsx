import Image from 'next/image'
import usdcLogo from '../../../../assets/usdcLogo.png'

const NftDetailsAndBuy = ({ nftData }) => {
  const biobank = nftData.bioBank.slice(0, 6) + '...'
  const donor = nftData.donor.slice(0, 6) + '...'

  return (
    <div className="w-2/3 flex flex-col px-5">
      <div className="border-l-2 p-4 mb-2 rounded-xl w-full ">
        <div className=" flex flex-col">
          <div className="py-2 font-satoshiMedium text-main">
            Sequence Details
          </div>
          <div className="border-b-[1px] "></div>
        </div>
        <div className=" flex flex-col">
          <div className="pt-4 pb-2 font-satoshiLight text-main">
            HLA Haplotypes
          </div>
        </div>
        <div className="flex justify-between w-fit ">
          <div className="px-4 font-satoshiRegular">{nftData.halotypes_A}</div>
          <div className="px-4 font-satoshiRegular">{nftData.halotypes_B}</div>
          <div className="px-4 font-satoshiRegular">{nftData.halotypes_C}</div>
        </div>
        <div className="flex justify-between w-fit">
          <div className="px-4 font-satoshiRegular">
            {nftData.halotypes_DPB}
          </div>
          <div className="px-4 font-satoshiRegular">
            {nftData.halotypes_DRB}
          </div>
        </div>
      </div>
      <div className="border-l-2 p-4 rounded-xl w-full my-2">
        <div className="flex flex-col">
          <div className="py-2 font-satoshiMedium text-main">
            Donation Details
          </div>
          <div className="border-b-[1px] "></div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-full">
            <div className=" flex flex-col">
              <div className="py-4 font-satoshiLight text-main">Donor</div>
              <div className="font-satoshiRegular">{donor}</div>
            </div>
            <div className=" flex flex-col">
              <div className="py-4 font-satoshiLight text-main">TokenId</div>
              <div className="font-satoshiRegular">{nftData.tokenId}</div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className=" flex flex-col">
              <div className="py-4 font-satoshiLight text-main">Donated On</div>
              <div className="font-satoshiRegular">July 19, 2022</div>
            </div>
            <div className=" flex flex-col">
              <div className="py-4 font-satoshiLight text-main">
                Contract Address
              </div>
              <div className="font-satoshiRegular">{donor}</div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className=" flex flex-col">
              <div className="py-4 font-satoshiLight text-main">BioBank</div>
              <div className="font-satoshiRegular">{biobank}</div>
            </div>
            <div className=" flex flex-col">
              <div className="py-4 font-satoshiLight text-main">Amount</div>
              <div className="font-satoshiRegular">30cc</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-2/3 px-4 pt-2 items-center justify-around">
        <div className="flex flex-col">
          <div className=" font-satoshiLight text-main">Price</div>
          <div className="flex items-center">
            <div className="p-2 flex items-center">
              <Image src={usdcLogo} alt="usdcLogo" />
            </div>
            <div className="p-2 font-satoshiRegular text-xl">
              ${nftData.price} USDC
            </div>
          </div>
        </div>
        <div className=" py-5 px-14 rounded-full text-xl font-satoshiBold text-black bg-gradient-to-r from-gradientDonateStart to-gradientDonateEnd">
          Buy Now
        </div>
      </div>
    </div>
  )
}

export default NftDetailsAndBuy
