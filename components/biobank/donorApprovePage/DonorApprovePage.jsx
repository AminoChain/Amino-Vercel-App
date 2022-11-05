import {useEffect, useState} from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const mumbaiChainId = 80001
export const polygonChainId = 137
export const currentChainId = mumbaiChainId
const platformBackend = "http://localhost:3003/"
// const platformBackend = "https://amino-chain-backend.herokuapp.com/"

const DonorApprovePage = ({ hla, biobankAddress }) => {
    const [error, setError] = useState('')
    const [connectingWallet, setConnectingWallet] = useState(false)
    const [waitingForApprove, setWaitingForApprove] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        setConnectingWallet(true)
        const connector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal
        })

        connector.on("session_update", (error, payload) => {
            if (error) {
                setError(error.toString())
            }

            // Get updated accounts and chainId
            const { accounts, chainId } = payload.params[0];
        })

        connector.on("disconnect", (error, payload) => {
            if (error) {
                setError(error.toString())
            }
        })

        connector.connect().then( async ({ accounts, chainId }) => {
            setConnectingWallet(false)

            const [account] = accounts
            // console.log(accounts, chainId)
            connector.signPersonalMessage([
                'Message',
                account,
            ]).then( async (signature) => {
                console.log(signature)
                setWaitingForApprove(false)
                setRegistering(true)

                const response = await fetch(platformBackend + `register-donation`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        hla,
                        biobankAddress,
                        amounts: [20, 10],
                        signature,
                        genome: 'genome'
                    })
                })

                setRegistering(false)

                if(response.ok) {
                    setFinished(true)
                } else {
                    setError("Registration error")
                }
            }).catch(error => {
                setError(error.toString())
                setConnectingWallet(false)
            })
            // if (chainId === currentChainId) {
            // }
        })
    }, [])

  return (
    <div className="w-full">
        <div>{error}</div>
        { connectingWallet && <div>Connecting...</div>}
        { waitingForApprove && <div>Waiting for approve...</div>}
        { registering && <div>Registering...</div>}
        { finished && <div>Donation registered</div>}
    </div>
  )
}

export default DonorApprovePage
