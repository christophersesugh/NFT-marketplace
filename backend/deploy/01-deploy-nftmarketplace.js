const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

const etherscanApi = process.env.ETHERSCAN_API_KEY;

module.exports = async function({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("#####-------------------#####");
    const args = [];
    const nftMarketplace = await deploy("NftMarketplace", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockCOnfirmations || 1
    });

    if (!developmentChains.includes(network.name) && etherscanApi) {
        log("Verifying...");
        await verify(nftMarketplace.address, args);
    }
    log("#####-------------------#####");
};
