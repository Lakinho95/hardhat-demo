const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    console.log(deployer)
    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    const fundMe = await deploy("FundMe", {
        from: deployer,
        log: true,
        args: [ethUsdPriceFeedAddress],
        waitConfirmation: network.config.blockConfirmation || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (!developmentChains.includes(network.name)) {
        verify(fundMe.address, [ethUsdPriceFeedAddress])
        console.log(fundMe.address)
    }
}

module.exports.tags = ["all", "fundme"]
