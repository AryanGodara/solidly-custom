# Solidly DEX on Monad

A production-ready Solidly-style ve(3,3) DEX on the Monad blockchain.

## Project Structure

```
solidly-custom/
├── contracts/          # Smart contracts (Foundry + Hardhat)
├── web/               # Next.js frontend
└── api/               # Hono API server
```

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Foundry (install via `curl -L https://foundry.paradigm.xyz | bash && foundryup`)

## Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values (WalletConnect Project ID required)
```

## Development

```bash
# Run web + api concurrently
pnpm dev

# Run individual packages
pnpm dev:web     # http://localhost:3000
pnpm dev:api     # http://localhost:8787

# Build all packages
pnpm build

# Test contracts
pnpm test:contracts
```

## Monad Network

**Mainnet (Chain ID: 143)**
- RPC: https://rpc.monad.xyz
- Explorer: https://monadvision.com
- WMON: 0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A

**Testnet (Chain ID: 10143)**
- RPC: https://testnet-rpc.monad.xyz
- Explorer: https://testnet.monadexplorer.com
- Faucet: https://testnet.monad.xyz

## Deployment

```bash
# Deploy to Monad testnet
cd contracts
pnpm deploy:sepolia  # Update script for Monad

# After deployment, update addresses in:
# - web/src/lib/contracts.ts
# - api/src/lib/constants.ts
```

## Features

- **Swap**: Trade tokens with minimal slippage
- **Liquidity**: Provide liquidity and earn fees
- **Vote**: Vote for pools and direct emissions
- **Lock**: Lock tokens to receive veNFTs
- **Rewards**: Claim emissions, fees, and bribes

## Tech Stack

- **Contracts**: Solidity 0.8.9, Foundry, Hardhat
- **Frontend**: Next.js 14, Tailwind CSS, wagmi v3, RainbowKit
- **API**: Hono, Viem
- **State**: Zustand, TanStack Query

## License

MIT
