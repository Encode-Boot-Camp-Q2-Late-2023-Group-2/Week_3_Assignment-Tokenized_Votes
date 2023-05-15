import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { Signer } from "ethers";
import { sign } from "crypto";
dotenv.config();

async function main() {

    const contractAddress = "0x0dA7243F7cF4bD5EE6cAcbA7DE819413268A7B73";
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    console.log(`Connected to the address: ${wallet.address}`);
    const provider = ethers.getDefaultProvider('sepolia', {
        alchemy: process.env.ALCHEMY_API_KEY,
        etherscan: process.env.ETHERSCAN_API_KEY,
        infura: process.env.INFURA_API_KEY
    });
    const deployer = wallet.connect(provider);
    const voterWallet = new ethers.Wallet(process.env.VOTER_PRIVATE_KEY ?? "")
    const voter1 = voterWallet.connect(provider)
    const contract = await ethers.getContractAt("MyERC20Votes", contractAddress, deployer);
    //Give voter 1 voting powers
    const voter1tx = await contract.mint(voter1.address, ethers.utils.parseUnits("100"));
    await voter1tx.wait();
    const voter1delegatetx = await contract.connect(voter1).delegate(voter1.address);
    const voter1delegatercpt = await voter1delegatetx.wait();
    console.log(`voter 1 delegate block number= ${voter1delegatercpt.blockNumber}`)
    const voter1power = ethers.utils.formatUnits(await contract.getVotes(voter1.address))
    console.log(`Voter 1 has ${voter1power} voting power`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});