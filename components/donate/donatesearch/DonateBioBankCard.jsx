import Image from 'next/image'
import { useRouter } from 'next/router'
import bioBankSymbol from '../../../assets/bioBankSymbol.png'

const DonateBioBankCard = ({ bioBank, setProgress }) => {
  const router = useRouter()

  const loadBioBankInfo = async (e) => {
    const url = `/donate/biobank?bioBankId=${bioBank.id}`
    router.push(url)
  }

  return (
    <div
      onClick={loadBioBankInfo}
      className=" w-[275px] p-8 flex flex-col items-center shadow-bioBankCard rounded-[20px] "
    >
      <Image src={bioBankSymbol} alt="biobank symbol" />
      <div className="flex flex-col">
        <div className="pt-8 font-satoshiMedium text-black text-2xl ">
          {bioBank.name}
        </div>
        <div className="font-satoshiRegular text-black break-normal py-4">
          {bioBank.location}
        </div>
      </div>
    </div>
  )
}

export default DonateBioBankCard
