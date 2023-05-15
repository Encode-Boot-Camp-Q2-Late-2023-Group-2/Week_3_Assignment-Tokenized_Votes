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
    const voterWallet = new ethers.Wallet(process.env.VOTER_PRIVATE_KEY ?? "")
    const voter1 = voterWallet.connect(provider)
    const contract = await ethers.getContractAt("TokenizedBallot", contractAddress, deployer);
    const proposal1 = await contract.proposals(1);
    console.log(ethers.utils.formatUnits(proposal1.voteCount))
    const votetx = await contract.connect(voter1).vote(1, ethers.utils.parseUnits("20"))
    await votetx.wait();
    const proposal = await contract.proposals(1);
    console.log(ethers.utils.formatUnits(proposal.voteCount))
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});