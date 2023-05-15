# Week 3 Assignment - Tokenized Votes

## Setup
Run `yarn` to install all dependancies.\
Testnet used: Sepolia.\
Default network: Sepolia.\
## Scripts & Contract Interaction (Assignment Report)

### Deploying ERC20Votes
```
yarn hardhat run scripts/DeployERC20Votes.ts
```
Deployed at: [0xAC153C69A089F4986942A4C09bce96A96a6bb424](https://sepolia.etherscan.io/address/0xAC153C69A089F4986942A4C09bce96A96a6bb424 )\
Transaction hash: [0x262c8fa51fd8973fed33dab5dd8b0c43da5ced8bdadb77fda17094305f779509](https://sepolia.etherscan.io/tx/0x262c8fa51fd8973fed33dab5dd8b0c43da5ced8bdadb77fda17094305f779509)\

Console output
```
The contract was deployed at address 0xAC153C69A089F4986942A4C09bce96A96a6bb424 at the block 3488853 and transaction hash 0x262c8fa51fd8973fed33dab5dd8b0c43da5ced8bdadb77fda17094305f779509
```

### Giving Voting Tokens

```
yarn hardhat run scripts/GiveVotingTokens.ts
```
Transaction Hash: [0xb54dedc78886e71245412332afa393f4ec6e9d29273f56f4e01b6198c990f949 ](https://sepolia.etherscan.io/tx/0xb54dedc78886e71245412332afa393f4ec6e9d29273f56f4e01b6198c990f949 )\

Console output
```
Before Minting voter 1 has 0.0 voting tokens
100 Tokens are minted for voter1 at transaction hash 0xb54dedc78886e71245412332afa393f4ec6e9d29273f56f4e01b6198c990f949 block number 3488869
After Minting voter 1 has 100.0 voting tokens
```
### Giving voting Rights

```
yarn hardhat run scripts/GiveVotingRights.ts
```
Transaction Hash: [0x4b6109a70f3ebdf703f2c89cbb595adb29033556320271785a45ac24cfd01de1 ](https://sepolia.etherscan.io/tx/0x4b6109a70f3ebdf703f2c89cbb595adb29033556320271785a45ac24cfd01de1 )\

Console Output
```
Before Delegating voter 1 has 0.0 voting Power
Voter 1 delegated at transaction hash 0x4b6109a70f3ebdf703f2c89cbb595adb29033556320271785a45ac24cfd01de1 and at block Number 3488902
Before Delegating voter 1 has 100.0 voting Power
```
### Deploying TokenizedBallot
```
yarn hardhat run scripts/DeployBallot.ts
```
Deployed at: [0xB1da050A25127b63275E46fe7e3356259DaF5B93](https://sepolia.etherscan.io/address/0xB1da050A25127b63275E46fe7e3356259DaF5B93 )\
Transaction hash: [0x43e0a7441ecc4a2004ba6f95b3e7aca4eea5ad88f4d63e767281df9459b4161b](https://sepolia.etherscan.io/tx/0x43e0a7441ecc4a2004ba6f95b3e7aca4eea5ad88f4d63e767281df9459b4161b)\

Console output
```
The contract was deployed at address 0xB1da050A25127b63275E46fe7e3356259DaF5B93 at the block 3488956 and transaction hash 0x43e0a7441ecc4a2004ba6f95b3e7aca4eea5ad88f4d63e767281df9459b4161b
```
### Voting
```
yarn hardhat run scripts/Vote.ts
```

Transaction hash: [0x43f7465d308fa2aa059d2049ce02e985ef681c7391ebb5b19469cbe862613b45](https://sepolia.etherscan.io/tx/0x43f7465d308fa2aa059d2049ce02e985ef681c7391ebb5b19469cbe862613b45)\
Console output:
```
Before Voting Proposal2 has vote count: 0.0
0xE3407c2af85F9DB592CbF6dA5b4B6b26cAcf4A96 voted for Proposal2 at transaction hash 0x43f7465d308fa2aa059d2049ce02e985ef681c7391ebb5b19469cbe862613b45
After Voting Proposal2 has vote count: 20.0
```

### Winning Proposal
```
yarn hardhat run scripts/Winner.ts
```
Console output:
```
Proposal 2 is the winner with 20.0 votes
```