import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { Signer } from "ethers";
import { sign } from "crypto";
dotenv.config();

async function main() {

    const contractAddress = "0xAC153C69A089F4986942A4C09bce96A96a6bb424";
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    const provider = ethers.getDefaultProvider('sepolia', {
        alchemy: process.env.ALCHEMY_API_KEY,
        etherscan: process.env.ETHERSCAN_API_KEY,
        infura: process.env.INFURA_API_KEY
    });
    const deployer = wallet.connect(provider);
    const voterWallet = new ethers.Wallet(process.env.VOTER_PRIVATE_KEY ?? "")
    const voter1 = voterWallet.connect(provider)
    const contract = await ethers.getContractAt("MyERC20Votes", contractAddress, deployer);
    const voter1powerBefore = ethers.utils.formatUnits(await contract.getVotes(voter1.address))
    console.log(`Before Delegating voter 1 has ${voter1powerBefore} voting Power`)

    const voter1delegatetx = await contract.connect(voter1).delegate(voter1.address);
    const voter1delegatercpt = await voter1delegatetx.wait();
    console.log(`Voter 1 delegated at transaction hash ${voter1delegatercpt.transactionHash} and at block Number ${voter1delegatercpt.blockNumber}`)

    const voter1power = ethers.utils.formatUnits(await contract.getVotes(voter1.address))
    console.log(`Before Delegating voter 1 has ${voter1power} voting Power`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});