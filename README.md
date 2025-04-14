# Real Estate & Land Registry Blockchain Project

A decentralized application (DApp) for managing real estate property ownership and fractional investments using Ethereum smart contracts.

## Features

- Property Ownership Management
- Fractional Real Estate Investment
- Secure and Immutable Land Registry
- Web3 Integration with MetaMask

## Prerequisites

- Node.js (v14 or higher)
- MetaMask browser extension
- Ethereum wallet with some test ETH (for Goerli testnet)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BlockChainProject
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
REACT_APP_CONTRACT_ADDRESS=<your-deployed-contract-address>
GOERLI_RPC_URL=<your-goerli-rpc-url>
PRIVATE_KEY=<your-wallet-private-key>
```

4. Compile and deploy the smart contract:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```

5. Start the development server:
```bash
npm start
```

## Smart Contract

The main smart contract (`PropertyRegistry.sol`) includes the following features:

- Property registration
- Property transfer
- Fractional ownership through shares
- Property details retrieval
- Share balance checking

## Frontend

The React frontend provides:

- Wallet connection
- Property registration form
- Property listing and details
- Share management interface

## Security Considerations

- Never commit your `.env` file
- Keep your private keys secure
- Use environment variables for sensitive data
- Test thoroughly on testnet before mainnet deployment

## Testing

Run the test suite:
```bash
npx hardhat test
```

## License

MIT 