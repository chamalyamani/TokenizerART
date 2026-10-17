// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Chama42NFT
 * @author clyamani
 * @notice ERC-721 NFT collection for the TokenizeArt project.
 */
contract Chama42NFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    /// @notice Emitted whenever a new NFT is minted
    event NFTMinted(address indexed recipient, uint256 indexed tokenId, string tokenURI);

    /**
     * @dev Sets token collection name and symbol, initializes ownership to deployer.
     */
    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
        Ownable(msg.sender)
    {
        _nextTokenId = 1;
    }

    /**
     * @notice Mints a new token to the specified recipient with an IPFS metadata URI
     * @dev Restricted to the contract owner via onlyOwner modifier
     * @param recipient Address receiving the minted NFT
     * @param uri IPFS URI of the NFT metadata JSON file.
     * @return tokenId The ID of the newly minted NFT
     */
    function safeMint(address recipient, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(recipient, tokenId, uri);
        return tokenId;
    }

    /**
     * @notice Returns total number of minted NFTs
     */
    function totalSupply() public view returns (uint256) {
        return _nextTokenId - 1;
    }
}