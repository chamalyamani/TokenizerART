const CONTRACT_ADDRESS = "0x9f307105f8937B50daBDc2C273689997Ae197f65";
const SEPOLIA_CHAIN_ID = "0xaa36a7";

const METADATA_URI =
    "ipfs://bafkreifxc6aceqt2f5vks5h74mqgw33zjb3rdsgqt3fko2ggkywxggylme";

const CONTRACT_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function owner() view returns (address)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function balanceOf(address account) view returns (uint256)",
    "function safeMint(address recipient, string uri) returns (uint256)",
    "event NFTMinted(address indexed recipient, uint256 indexed tokenId, string tokenURI)"
];

const connectButton = document.getElementById("connect-wallet");
const mintButton = document.getElementById("mint-button");
const statusMessage = document.getElementById("status-message");
const mintResult = document.getElementById("mint-result");
const mintTokenId = document.getElementById("mint-token-id");
const mintOwner = document.getElementById("mint-owner");
const mintUri = document.getElementById("mint-uri");
const mintTransactionLink = document.getElementById("mint-transaction-link");

let provider = null;
let signer = null;
let contract = null;
let userAddress = null;

function setStatus(message) {
    statusMessage.textContent = message;
}

function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function updateWalletUI() {
    connectButton.textContent = userAddress
        ? shortenAddress(userAddress)
        : "Connect Wallet";

    mintButton.disabled = !userAddress;
    mintButton.textContent = userAddress
        ? "Mint your NFT"
        : "Connect wallet to mint";
}

async function connectWallet() {
    if (!window.ethereum) {
        setStatus("MetaMask was not detected. Please enable it.");
        return;
    }

    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        if (!accounts.length) {
            setStatus("No wallet account was selected.");
            return;
        }

        const chainId = await window.ethereum.request({
            method: "eth_chainId"
        });

        if (chainId !== SEPOLIA_CHAIN_ID) {
            userAddress = null;
            provider = null;
            signer = null;
            contract = null;
            updateWalletUI();
            setStatus("Please switch MetaMask to Ethereum Sepolia.");
            return;
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        userAddress = await signer.getAddress();

        contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );

        updateWalletUI();

        const [name, symbol, supply, owner] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.totalSupply(),
            contract.owner()
        ]);

        setStatus(
            `${name} (${symbol}) connected. ` +
            `Minted: ${supply.toString()}. ` +
            `Contract owner: ${shortenAddress(owner)}.`
        );
    } catch (error) {
        console.error("Connection failed:", error);
        setStatus("Could not connect to the contract. Check the console.");
    }
}

async function mintNFT() {
    if (!contract || !userAddress) {
        setStatus("Connect your wallet first.");
        return;
    }

    mintButton.disabled = true;
    mintButton.textContent = "Checking...";

    try {
        const chainId = await window.ethereum.request({
            method: "eth_chainId"
        });

        if (chainId !== SEPOLIA_CHAIN_ID) {
            setStatus("Switch MetaMask back to Sepolia.");
            return;
        }

        const owner = await contract.owner();

        if (owner.toLowerCase() !== userAddress.toLowerCase()) {
            setStatus("Only the contract owner can mint this NFT.");
            return;
        }

        const balance = await provider.getBalance(userAddress);
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.maxFeePerGas ?? feeData.gasPrice;

        const gasEstimate = await contract.safeMint.estimateGas(
            userAddress,
            METADATA_URI
        );

        if (gasPrice && balance < gasEstimate * gasPrice) {
            setStatus(
                "Not enough SepoliaETH for gas. Your NFT is not minted. " +
                "Get test ETH and try again."
            );
            return;
        }

        setStatus("Please confirm the mint transaction in MetaMask.");

        const transaction = await contract.safeMint(
            userAddress,
            METADATA_URI
        );

        setStatus(`Transaction submitted: ${transaction.hash}`);

        const receipt = await transaction.wait();

        if (receipt.status !== 1) {
            setStatus("The mint transaction failed.");
            return;
        }

        // Read the confirmed NFTMinted event from this transaction.
        const mintInterface = new ethers.Interface(CONTRACT_ABI);
        let mintedTokenId = null;

        for (const log of receipt.logs) {
            try {
                const parsedLog = mintInterface.parseLog(log);

                if (parsedLog && parsedLog.name === "NFTMinted") {
                    mintedTokenId = parsedLog.args.tokenId;
                    break;
                }
            } catch {
                // Ignore logs that do not belong to our contract ABI.
            }
        }

        if (mintedTokenId === null) {
            setStatus(
                "Transaction confirmed, but the NFTMinted event was not found. " +
                "Check the transaction on Blockscout."
            );
            return;
        }

        const [actualOwner, actualUri, supply] = await Promise.all([
            contract.ownerOf(mintedTokenId),
            contract.tokenURI(mintedTokenId),
            contract.totalSupply()
        ]);

        mintResult.hidden = false;
        mintTokenId.textContent = `Token ID: ${mintedTokenId.toString()}`;
        mintOwner.textContent = `Owner: ${actualOwner}`;
        mintUri.textContent = `Metadata URI: ${actualUri}`;
        mintTransactionLink.href =
            `https://eth-sepolia.blockscout.com/tx/${transaction.hash}`;

        setStatus(`Mint confirmed! Total minted: ${supply.toString()}.`);

    } catch (error) {
        console.error("Mint failed:", error);

        if (error.code === "ACTION_REJECTED") {
            setStatus("You cancelled the transaction in MetaMask.");
        } else if (error.code === "INSUFFICIENT_FUNDS") {
            setStatus("Not enough SepoliaETH to pay transaction fees.");
        } else {
            setStatus(
                "Mint failed or was rejected. Check MetaMask and the console."
            );
        }
    } finally {
        updateWalletUI();
    }
}

connectButton.addEventListener("click", connectWallet);
mintButton.addEventListener("click", mintNFT);

if (window.ethereum) {
    window.ethereum.on("accountsChanged", () => {
        userAddress = null;
        provider = null;
        signer = null;
        contract = null;
        updateWalletUI();
        setStatus("Wallet changed. Please reconnect.");
    });

    window.ethereum.on("chainChanged", () => {
        userAddress = null;
        provider = null;
        signer = null;
        contract = null;
        updateWalletUI();
        setStatus("Network changed. Please reconnect on Sepolia.");
    });
}

updateWalletUI();
