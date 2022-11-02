import Image from 'next/image'
import aminoLogo from '../../assets/aminoLogo.png'

const Nav = () => {
  return (
    <div className="w-full flex flex-row justify-between px-20">
      <div>
        <Image
          src={aminoLogo}
          alt="Image of AminoChain Logo"
          height={50}
          width={50}
        />
        <Image
          src={aminoLogo}
          alt="Image of AminoChain Logo"
          height={50}
          width={50}
        />
      </div>
      <div className='w-1/5 flex flex-row justify-evenly text-main'>
        <div>
          About
        </div>
        <div>
          Docs
        </div>
      </div>
    </div>
  )
}

export default Nav
