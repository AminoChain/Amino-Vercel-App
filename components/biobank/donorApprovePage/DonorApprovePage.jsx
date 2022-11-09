import { useEffect, useState } from 'react'
import Link from 'next/link'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { Contract, ethers } from 'ethers'
import DonorApproveBanner from './DonorApproveBanner'
import { abis } from '../../../constants/index'

export const mumbaiChainId = 80001
export const polygonChainId = 137
export const currentChainId = mumbaiChainId
// const platformBackend = "http://localhost:3003/"
const platformBackend = 'https://amino-chain-backend.herokuapp.com/'

const DonorApprovePage = ({ hla, biobankAddress }) => {
  const [error, setError] = useState('')
  const [connectingWallet, setConnectingWallet] = useState(false)
  const [waitingForApprove, setWaitingForApprove] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [finished, setFinished] = useState(false)
  const [registrationTx, setRegistrationTx] = useState(false)

  useEffect(() => {
    setConnectingWallet(true)
    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    })

    connector.on('session_update', (error, payload) => {
      if (error) {
        setError(error.toString())
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0]
    })

    connector.on('disconnect', (error, payload) => {
      if (error) {
        setError(error.toString())
      }
    })

    connector.connect().then(async ({ accounts, chainId }) => {
      const [account] = accounts

      setConnectingWallet(false)

      const authenticator = new Contract(
        '0xfB45e078E326A9f838E27B750cA7e84b554F97b4',
        abis.authenticator,
        new ethers.providers.JsonRpcProvider(
          'https://rpc-mumbai.maticvigil.com'
        )
      )

      let hlaHash = ethers.utils.id(JSON.stringify(hla))
      const registrationParametersHash =
        await authenticator.getRegistrationHash(account, hlaHash)

      // console.log(accounts, chainId)
      connector
        .signMessage([account, registrationParametersHash])
        .then(async (signature) => {
          console.log(signature)

          setWaitingForApprove(false)
          setRegistering(true)

          const response = await fetch(platformBackend + `register-donation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              hla,
              biobankAddress,
              donorAddress: account,
              amounts: [20, 10],
              signature,
              genome: 'genome',
            }),
          })

          setRegistering(false)

          if (response.ok) {
            setRegistrationTx(await response.text())
            setFinished(true)
          } else {
            setError('Registration error')
          }
        })
        .catch((error) => {
          setError(error.toString())
          setConnectingWallet(false)
        })
      // if (chainId === currentChainId) {
      // }
    })
  }, [])

  return (
    <div className="w-full">
      <DonorApproveBanner />
      <div className="w-full flex flex-col px-36 py-10">
        <div
          className="text-5xl text-black py-3 font-satoshi"
          style={{ paddingTop: '100px' }}
        >
          {!connectingWallet &&
            !waitingForApprove &&
            !registering &&
            !finished && (
              <div>Sign message in Metamask on your mobile phone</div>
            )}
          <div>{error}</div>
          {connectingWallet && <div>Connecting...</div>}
          {waitingForApprove && <div>Waiting for approve...</div>}
          {registering && <div>Registering...</div>}
          {finished && (
            <div>
              Donation registered (
              <Link
                target="_blank"
                rel="norefferrer"
                href={`https://mumbai.polygonscan.com/tx/${registrationTx}`}
              >
                check transaction
              </Link>
              )
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DonorApprovePage
