
# Usage Guide — 42 - Cosmic Genesis

## 1. Introduction

This guide explains how to view the NFT and interact with the `Chama42NFT` smart contract on Ethereum Sepolia.

The project demonstrates NFT creation, metadata storage on IPFS, smart contract deployment, minting, and ownership verification.

## 2. NFT Details

- **Name:** 42 - Cosmic Genesis
- **Symbol:** M42
- **Creator / Artist:** clyamani
- **Token ID:** 1
- **Standard:** ERC-721
- **Network:** Ethereum Sepolia
- **Contract Address:** `0x9f307105f8937B50daBDc2C273689997Ae197f65`

## 3. View the NFT Artwork

The artwork is stored on IPFS.

- **Artwork:** [Open the artwork](https://gateway.pinata.cloud/ipfs/bafybeiebaip2dn4ayludjcbasogm5fokabbn2zfyho2eefl5qamwqzmf6i)
- **Metadata JSON:** [Open the metadata](https://gateway.pinata.cloud/ipfs/bafkreifxc6aceqt2f5vks5h74mqgw33zjb3rdsgqt3fko2ggkywxggylme)

The metadata contains the NFT name, description, image URI, creator information, and attributes.

## 4. View the Contract

Open the contract on Blockscout:

[Chama42NFT — Ethereum Sepolia](https://eth-sepolia.blockscout.com/address/0x9f307105f8937B50daBDc2C273689997Ae197f65?tab=contract)

The contract source code is verified with an exact match.

## 5. Verify NFT Ownership

The following functions can be called from the **Read Contract** section of Blockscout or through Remix.

### `totalSupply()`

This function returns the total number of minted tokens.

Expected result:

`1`

### `ownerOf(uint256 tokenId)`

Enter:

`1`

The returned address is the current owner of token ID 1.

### `tokenURI(uint256 tokenId)`

Enter:

`1`

Expected result:

`ipfs://bafkreifxc6aceqt2f5vks5h74mqgw33zjb3rdsgqt3fko2ggkywxggylme`

These are read-only operations and do not require a transaction.

## 6. Interact Through Remix

1. Open Remix IDE.
2. Select the `Chama42NFT` contract instance deployed on Sepolia.
3. Connect MetaMask to Sepolia.
4. Use the read functions to inspect the token and its owner.
5. To mint additional tokens, the contract owner must call `safeMint` with a recipient address and a metadata URI.

Minting requires a transaction and test ETH to pay the network fee. The contract restricts minting to its owner.

## 7. Use the Website

The `website/` folder provides a graphical interface for connecting MetaMask and interacting with the deployed contract.

From the repository root, run:

```bash
python3 -m http.server 8001
```

Open:

```text
http://localhost:8001/website/
```

Make sure MetaMask is connected to Ethereum Sepolia.

The website can read the contract information and provides a minting interface.

## 8. Transaction Reference

The transaction hash recorded for the mint is:

`0xa4bf94b652553451c940946e476c566e832086b64bbd06588f550af9da7e0581`

[View the transaction on Blockscout](https://eth-sepolia.blockscout.com/tx/0xa4bf94b652553451c940946e476c566e832086b64bbd06588f550af9da7e0581)

## 9. Network and Fees

This project uses Ethereum Sepolia, a test network. Sepolia ETH is used to pay test transaction fees and has no real monetary value.

## 10. Project Limitations

The artwork and metadata are stored on IPFS, while the smart contract stores the metadata URI. The complete image is not stored directly on-chain.

The website is a local demonstration interface, and the contract is deployed on a test network rather than Ethereum mainnet.
