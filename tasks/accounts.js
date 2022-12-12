const { task } = require("hardhat/config")

task("accounts", "Prints all available accounts").setAction(
    async (taskArgs, hre) => {
        const accounts = await hre.ethers.getSigners()

        for (const account in accounts) {
            console.log(account)
        }
    }
)

//hre daje istu funkcionalnost maltene kao i sintaksa require("hardhat")
