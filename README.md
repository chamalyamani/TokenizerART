
# TokenizeArt — 42 - Cosmic Genesis

## Project Overview

TokenizeArt is an NFT project created as part of the 42 curriculum. It demonstrates how to create digital artwork, store NFT metadata on IPFS, deploy an ERC-721 smart contract, and mint an NFT on the Ethereum Sepolia testnet.

The NFT is named **42 - Cosmic Genesis** and represents the number 42 through a futuristic, cosmic-inspired digital artwork.

## NFT Information

- **NFT Name:** 42 - Cosmic Genesis
- **Collection Contract:** Chama42NFT
- **Symbol:** M42
- **Artist / Creator:** clyamani
- **Standard:** ERC-721
- **Blockchain:** Ethereum
- **Network:** Sepolia Testnet
- **Chain ID:** 11155111
- **Token ID:** 1
- **Solidity Version:** 0.8.25
- **EVM Version:** Cancun

## Smart Contract

The smart contract was deployed to Ethereum Sepolia.

- **Contract Address:** `0x9f307105f8937B50daBDc2C273689997Ae197f65`
- **Verified Source Code:** [Blockscout](https://eth-sepolia.blockscout.com/address/0x9f307105f8937B50daBDc2C273689997Ae197f65?tab=contract)
- **Sourcify Verification:** [View Contract](https://repo.sourcify.dev/11155111/0x9f307105f8937B50daBDc2C273689997Ae197f65/)
- **Transaction Hash:** `0xa4bf94b652553451c940946e476c566e832086b64bbd06588f550af9da7e0581`
- **Transaction Explorer:** [View Transaction on Blockscout](https://eth-sepolia.blockscout.com/tx/0xa4bf94b652553451c940946e476c566e832086b64bbd06588f550af9da7e0581)

The source code is verified on Blockscout with an exact match. The contract was also submitted to Sourcify for verification.

## Artwork and Metadata

The artwork and its metadata are stored on IPFS.

- **Artwork CID:** `bafybeiebaip2dn4ayludjcbasogm5fokabbn2zfyho2eefl5qamwqzmf6i`
- **Artwork:** [View on IPFS](https://gateway.pinata.cloud/ipfs/bafybeiebaip2dn4ayludjcbasogm5fokabbn2zfyho2eefl5qamwqzmf6i)
- **Metadata CID:** `bafkreifxc6aceqt2f5vks5h74mqgw33zjb3rdsgqt3fko2ggkywxggylme`
- **Metadata:** [View JSON on IPFS](https://gateway.pinata.cloud/ipfs/bafkreifxc6aceqt2f5vks5h74mqgw33zjb3rdsgqt3fko2ggkywxggylme)
- **Token URI:** `ipfs://bafkreifxc6aceqt2f5vks5h74mqgw33zjb3rdsgqt3fko2ggkywxggylme`

IPFS provides content-addressed storage for the artwork and metadata, independently of the smart contract.

## Project Structure

```text
TOKENIZERART/
├── code/
│   └── Chama42NFT.sol
├── deployment/
│   └── deploy_remix.md
├── documentation/
│   └── usage_guide.md
├── mint/
│   ├── Image.png
│   └── metadata/
│       └── metadata.json
├── website/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .gitignore
└── README.md
```

## Technologies Used

- Solidity
- ERC-721
- OpenZeppelin Contracts
- Remix IDE
- Ethereum Sepolia Testnet
- MetaMask
- IPFS
- Pinata
- HTML, CSS and JavaScript
- ethers.js

## Design Choices

The cosmic visual theme was chosen to represent the number 42 through a futuristic digital artwork.

The ERC-721 standard was selected because each NFT represents a unique token with its own identifier and metadata.

IPFS was used to store the artwork and metadata without placing the complete image directly on the blockchain. The smart contract stores the metadata URI associated with the token.

The contract uses OpenZeppelin's ERC721URIStorage implementation and Ownable access control. Minting is restricted to the contract owner.

Sepolia was selected to test the deployment and minting process without spending real ETH.

## Verification

The following contract reads were tested successfully:

- `totalSupply()` returns `1`.
- `ownerOf(1)` returns the wallet that owns token ID 1.
- `tokenURI(1)` returns the expected IPFS metadata URI.

The NFT is visible in MetaMask on Sepolia.

## Website

The `website/` directory contains a graphical interface for connecting a wallet, viewing the NFT information, and initiating a mint transaction.

To run the website locally from the repository root:

```bash
python3 -m http.server 8001
```

Then open:

```text
http://localhost:8001/website/
```

Connect MetaMask to Ethereum Sepolia before interacting with the contract.

## Documentation

- `deployment/deploy_remix.md`: deployment and verification details.
- `documentation/usage_guide.md`: NFT information and instructions for interacting with the contract.

## Important Note

Sepolia ETH is test ETH and has no real monetary value. This project is intended for educational purposes.
