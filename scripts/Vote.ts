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
    const voterWallet = new ethers.Wallet(process.env.VOTER_PRIVATE_KEY ?? "")
    const voter1 = voterWallet.connect(provider)
    const contract = await ethers.getContractAt("TokenizedBallot", contractAddress, deployer);
    const proposal2 = await contract.proposals(1);
    console.log(`Before Voting Proposal2 has vote count: ${ethers.utils.formatUnits(proposal2.voteCount)}`)
    const votetx = await contract.connect(voter1).vote(1, ethers.utils.parseUnits("20"))
    const votercpt= await votetx.wait();
    console.log(`${voter1.address} voted 20 tokens for Proposal2 at transaction hash ${votercpt.transactionHash}`)
    const proposal = await contract.proposals(1);
    console.log(`After Voting Proposal2 has vote count: ${ethers.utils.formatUnits(proposal.voteCount)}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});