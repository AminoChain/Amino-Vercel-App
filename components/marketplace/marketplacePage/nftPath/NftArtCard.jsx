import Image from 'next/image'
import nftCellsArt from '../../../../assets/nftCellsArt.png'
import aminoLogo2 from '../../../../assets/aminoLogo2.png'

const NftArtCard = ({ nftData }) => {
  const percentage = 75
  const biobank = nftData.bioBank
  const donor =
    nftData.donor.slice(0, 4) +
    '...' +
    nftData.donor.slice(nftData.donor.length - 4, nftData.donor.length)

  const BioBankNames = {
    '0x53c847035e9c2ea3aead920d395bccd7768ee63f': 'Coriell',
    '': 'Greenville',
    '': 'National',
  }

  return (
    <div className="w-1/4">
      <div className="w-full p-10 nftCells rounded-3xl">
        <div className="flex h-min justify-center">
          <Image src={nftCellsArt} alt="nftcells image" />
        </div>
        <div className="py-5">
          <div className="py-2 font-satoshiLight text-main">Something</div>
          <div className=" font-satoshiBold text-2xl text-black">
            Casper might add here
          </div>
        </div>
        <div className="w-2/3 border-b-[1px] border-slate-200 "></div>
        <div>
          <div className="py-2 font-satoshiLight text-main">Donor</div>
          <div className=" font-satoshiRegular text-black">{donor}</div>
        </div>
        <div className="w-2/3 h-[1px] border-b-[1px] border-slate-200 "></div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <div className="py-2 font-satoshiLight text-main">BioBank</div>
            <div className=" font-satoshiRegular text-black">
              {BioBankNames[biobank]}
            </div>
          </div>
          <div className="flex h-min justify-center">
            <Image
              src={aminoLogo2}
              alt="aminochain logo image"
              height={42}
              width={75}
            />
          </div>
        </div>
      </div>
      <div className="flex w-4/5 p-4 justify-between items-center">
        <div className="w-1/3 font-satoshiLight text-sm text-main">
          Match Rate
        </div>
        <div className="flex w-2/3 items-center">
          <div className="px-2 font-satoshiLight text-black">75%</div>
          <div className=" w-full h-2 bg-slate-200 rounded-full">
            <div
              style={{ width: `${percentage}%` }}
              className="h-2 bg-primary rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftArtCard
