# Solidly DEX - Web

Next.js 14 frontend for the Solidly DEX on Monad.

## Features

- Token swaps with best route finding
- Liquidity pool management
- veNFT locking and voting
- Rewards claiming

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- wagmi v3
- RainbowKit
- Zustand

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from https://cloud.walletconnect.com
