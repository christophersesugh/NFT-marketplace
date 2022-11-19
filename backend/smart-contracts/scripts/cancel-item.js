const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");
const TOKEN_ID = 2;

async function cancelItem() {
    const nftMarketplace = await ethers.getContract("NftMarketplace");
    const basicNf = await ethers.getContract("BasicNft");
    const tx = await nftMarketplace.cancelListing(basicNf.address, TOKEN_ID);
    await tx.wait(1);
    console.log("NFT cancelled");
    if (network.config.chainId == "31337") {
        await moveBlocks(1, (sleepAmount = 1000));
    }
}

cancelItem()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
