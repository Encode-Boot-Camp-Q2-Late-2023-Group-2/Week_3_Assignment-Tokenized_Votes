import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const MINT_VALUE = ethers.utils.parseUnits("20");

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const provider = ethers.getDefaultProvider('sepolia', {
    alchemy: process.env.ALCHEMY_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
    infura: process.env.INFURA_API_KEY
  });
  const deployer = wallet.connect(provider);
  const balance = await deployer.getBalance();
  // Contract deployment
  const contractFactory = new MyERC20Votes__factory(deployer);
  const contract = await contractFactory.deploy();
  const deployTxReceipt = await contract.deployTransaction.wait();
  console.log(
    `The contract was deployed at address ${contract.address} at the block ${deployTxReceipt.blockNumber} and transaction hash ${deployTxReceipt.transactionHash}`
  );


}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
