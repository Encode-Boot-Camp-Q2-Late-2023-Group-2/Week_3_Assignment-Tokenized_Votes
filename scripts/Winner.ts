import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {

    const contractAddress = "0x8F9d7b1e03d24d76A9193D9d2297703aeF0Aec79";
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    console.log(`Connected to the address: ${wallet.address}`);
    const provider = ethers.getDefaultProvider('sepolia', {
        alchemy: process.env.ALCHEMY_API_KEY,
        etherscan: process.env.ETHERSCAN_API_KEY,
        infura: process.env.INFURA_API_KEY
    });
    const deployer = wallet.connect(provider);
    const contract = await ethers.getContractAt("TokenizedBallot", contractAddress, deployer);
    console.log(ethers.utils.parseBytes32String(await contract.winnerName()))
    console.log(await contract.winningProposal())
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});