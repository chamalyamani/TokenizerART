
# Deployment Guide — Chama42NFT

## 1. Overview

This document describes the deployment and verification of the `Chama42NFT` smart contract using Remix IDE.

## 2. Network Configuration

- **Blockchain:** Ethereum
- **Network:** Sepolia Testnet
- **Chain ID:** 11155111
- **Wallet:** MetaMask
- **Development Environment:** Remix IDE

Use Sepolia test ETH to deploy and interact with the contract. No real ETH is required.

## 3. Contract Information

- **Contract Name:** Chama42NFT
- **NFT Name:** 42 - Cosmic Genesis
- **Symbol:** M42
- **Token Standard:** ERC-721
- **Solidity Compiler:** 0.8.25
- **EVM Version:** Cancun
- **Optimization:** Disabled

## 4. Smart Contract Address

The deployed contract is available at:

`0x9f307105f8937B50daBDc2C273689997Ae197f65`

- [Contract on Blockscout](https://eth-sepolia.blockscout.com/address/0x9f307105f8937B50daBDc2C273689997Ae197f65?tab=contract)
- [Contract on Etherscan](https://sepolia.etherscan.io/address/0x9f307105f8937B50daBDc2C273689997Ae197f65)

The source code is verified on Blockscout with an exact match. Sourcify verification is also available.

## 5. Deployment Procedure

1. Open Remix IDE.
2. Open `code/Chama42NFT.sol`.
3. Select Solidity compiler version `0.8.25`.
4. Set the EVM version to `Cancun`.
5. Compile the contract.
6. Open **Deploy & Run Transactions**.
7. Select **Browser Extension** as the environment.
8. Connect MetaMask to Ethereum Sepolia.
9. Select `Chama42NFT`.
10. Enter the constructor parameters:
    - Name: `42 - Cosmic Genesis`
    - Symbol: `M42`
11. Click **Deploy** and confirm the transaction in MetaMask.
12. Copy the deployed contract address.

The contract has already been deployed for this project. Do not redeploy it merely to interact with the existing NFT.

## 6. Minting the NFT

The contract owner can mint a token using `safeMint(address recipient, string uri)`.

- **Recipient:** the receiving MetaMask wallet address.
- **Metadata URI:**

`ipfs://bafkreifxc6aceqt2f5vks5h74mqgw33zjb3rdsgqt3fko2ggkywxggylme`

The metadata URI must point to the JSON metadata file, not directly to the artwork image.

The first token ID is `1`.

The mint transaction hash recorded for the project is:

`0xa4bf94b652553451c940946e476c566e832086b64bbd06588f550af9da7e0581`

[Open the transaction on Blockscout](https://eth-sepolia.blockscout.com/tx/0xa4bf94b652553451c940946e476c566e832086b64bbd06588f550af9da7e0581)

## 7. Verification

The contract was verified using Remix's Contract Verification plugin.

- **Blockscout:** verified, exact source-code match.
- **Sourcify:** verification successful.
- **Routescan:** the plugin reported a timeout for one verification attempt; a successful message was also displayed in the Remix console.

The verified contract page lists Solidity `0.8.25` and EVM version `Cancun`.

## 8. Post-Deployment Checks

The following read functions were tested successfully:

### `totalSupply()`

Expected result: `1`

### `ownerOf(1)`

Returns the address of the wallet that owns the NFT.

### `tokenURI(1)`

Expected result:

`ipfs://bafkreifxc6aceqt2f5vks5h74mqgw33zjb3rdsgqt3fko2ggkywxggylme`

These checks confirm that token ID 1 exists, has an owner, and references the expected metadata URI.
