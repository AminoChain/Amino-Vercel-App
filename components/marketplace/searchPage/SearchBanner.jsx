import aminoLogo from '../../../assets/aminoLogo2.png'
import Image from 'next/image'

const SearchBanner = () => {
  return (
    <div className="w-full h-[30vh] flex items-end bg-gradient-to-br from-greenHLADRB to-yellowHLADPB">
      <div className="w-full flex justify-between items-center px-36 py-5">
        <Image src={aminoLogo} alt="amino logo image" />
      </div>
    </div>
  )
}

export default SearchBanner
