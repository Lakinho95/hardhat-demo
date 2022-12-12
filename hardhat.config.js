require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("./tasks/accounts")
require("dotenv").config()

const GOERLY_RPC_URL = process.env.GOERLY_RPC_URL || "" // uveze api_key koji nije type(string) ==> proveriti??
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/0SdmMrS51OWRor8geUr8WW3PpZ7smqnF",
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmation: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
        },
    },
    solidity: {
        compilers: [{ version: "0.8.17" }, { version: "0.6.6" }],
    },
    namedAccounts: {
        deployer: {
            default: 0,
            goerli: 0,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    mocha: {
        timeout: 900000,
    },
}
