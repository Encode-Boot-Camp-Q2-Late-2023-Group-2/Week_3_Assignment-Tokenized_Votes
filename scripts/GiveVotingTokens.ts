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
    //Give voter 1 voting powers
    const beforeVotes= ethers.utils.formatUnits(await contract.balanceOf(voter1.address))
    console.log(`Before Minting voter 1 has ${beforeVotes} voting tokens`)
    const voter1tx = await contract.mint(voter1.address, ethers.utils.parseUnits("100"));
    const voter1rcpt = await voter1tx.wait();
    console.log(`20 Tokens are minted for voter1 at transaction hash ${voter1rcpt.transactionHash} block number ${voter1rcpt.blockNumber}`)
    const aftereVotes= ethers.utils.formatUnits(await contract.balanceOf(voter1.address))
    console.log(`After Minting voter 1 has ${aftereVotes} voting tokens`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});