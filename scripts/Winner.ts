import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {

    const contractAddress = "0xB1da050A25127b63275E46fe7e3356259DaF5B93";
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    const provider = ethers.getDefaultProvider('sepolia', {
        alchemy: process.env.ALCHEMY_API_KEY,
        etherscan: process.env.ETHERSCAN_API_KEY,
        infura: process.env.INFURA_API_KEY
    });
    const deployer = wallet.connect(provider);
    const contract = await ethers.getContractAt("TokenizedBallot", contractAddress, deployer);
    const proposal = await contract.proposals(1);
    console.log(`${ethers.utils.parseBytes32String(await contract.winnerName())} is the winner with ${ethers.utils.formatUnits(proposal.voteCount)} votes`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});