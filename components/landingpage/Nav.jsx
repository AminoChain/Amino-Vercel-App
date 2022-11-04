import Image from 'next/image'
import aminoLogo from '../../assets/aminoLogo2.png'

const Nav = () => {
  return (
    <div className="w-full flex flex-row justify-between px-20">
      <div>
        <Image
          src={aminoLogo}
          alt="Image of AminoChain Logo"
          height={40}
          width={71}
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
