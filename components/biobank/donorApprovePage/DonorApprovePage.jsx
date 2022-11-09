import {useEffect, useState} from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {Contract, ethers} from "ethers";

export const mumbaiChainId = 80001
export const polygonChainId = 137
export const currentChainId = mumbaiChainId
// const platformBackend = "http://localhost:3003/"
const platformBackend = "https://amino-chain-backend.herokuapp.com/"

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
            const [account] = accounts

            setConnectingWallet(false)

            const authenticator = new Contract(
            '0xfB45e078E326A9f838E27B750cA7e84b554F97b4',
            AuthenticatorAbi,
            new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
            )

            let hlaHash = ethers.utils.id(JSON.stringify(hla));
            const registrationParametersHash = await authenticator.getRegistrationHash(
                account,
                hlaHash
            )

            // console.log(accounts, chainId)
            connector.signMessage([
                account,
                registrationParametersHash,
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
                        donorAddress: account,
                        amounts: [20, 10],
                        signature,
                        genome: 'genome'
                    })
                })

                setRegistering(false)

                if(response.ok) {
                    setRegistrationTx(await response.text())
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
        <div className="w-full flex flex-col px-36 py-10">
            <div className="text-5xl text-black py-3 font-satoshi" style={{paddingTop: '100px'}}>
                { !connectingWallet && !waitingForApprove && !registering && !finished && <div>Sign message in Metamask on your mobile phone</div>}
                <div>{error}</div>
                { connectingWallet && <div>Connecting...</div>}
                { waitingForApprove && <div>Waiting for approve...</div>}
                { registering && <div>Registering...</div>}
                { finished && <div>Donation registered (<a target="_blank" href={`https://mumbai.polygonscan.com/tx/${registrationTx}`}>check transaction</a>)</div>}
            </div>
        </div>
    </div>
  )
}

export default DonorApprovePage

const AuthenticatorAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "marketplaceAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "usdcAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "biobank",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "UserRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "biodataHash",
                "type": "bytes32"
            }
        ],
        "name": "getRegistrationHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "str",
                "type": "string"
            }
        ],
        "name": "hash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "donor",
                "type": "address"
            }
        ],
        "name": "isRegistered",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "marketplace",
        "outputs": [
            {
                "internalType": "contract IAminoChainMarketplace",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nft",
        "outputs": [
            {
                "internalType": "contract IAminoChainDonation",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "onERC721Received",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "bytes32",
                                "name": "A",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "B",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "C",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "DPB",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "DRB",
                                "type": "bytes32"
                            }
                        ],
                        "internalType": "struct AminoChainLibrary.HlaHashed",
                        "name": "hlaHashed",
                        "type": "tuple"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "hlaHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "hlaEncoded",
                        "type": "bytes"
                    },
                    {
                        "internalType": "string",
                        "name": "genomeEncodedUrl",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "amounts",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "address",
                        "name": "donor",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    },
                    {
                        "internalType": "address",
                        "name": "biobank",
                        "type": "address"
                    }
                ],
                "internalType": "struct AminoChainLibrary.RegistrationData",
                "name": "data",
                "type": "tuple"
            }
        ],
        "name": "register",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "usdc",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]