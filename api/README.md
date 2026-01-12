# Solidly DEX - API

Hono API server for the Solidly DEX on Monad.

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api` | API documentation |
| `GET /api/health` | Health check |
| `GET /api/tokens` | List all tokens |
| `GET /api/tokens/:address` | Get token details |
| `GET /api/pairs` | List all pairs |
| `GET /api/pairs/:address` | Get pair details |
| `GET /api/analytics` | Protocol stats |
| `GET /api/analytics/tvl` | TVL data |
| `GET /api/analytics/volume` | Volume data |
| `GET /api/analytics/top-pools` | Top pools |

## Tech Stack

- **Framework**: Hono
- **Blockchain**: Viem
- **Language**: TypeScript
- **Deployment**: Vercel (serverless)

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type check
pnpm typecheck
```

## Vercel Deployment

This API is designed to deploy on Vercel as a serverless function.

### Configuration

| Setting | Value |
|---------|-------|
| **Framework Preset** | Hono |
| **Root Directory** | `api` |
| **Build Command** | (leave blank) |
| **Install Command** | `pnpm install` |

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CORS_ORIGINS` | Allowed origins (comma-separated) | `https://yoursite.com,http://localhost:3000` |
| `RPC_URL` | Monad RPC endpoint | `https://rpc.monad.xyz` |
| `PAIR_FACTORY_ADDRESS` | Factory contract address | `0x...` |
| `ROUTER_ADDRESS` | Router contract address | `0x...` |

## Project Structure

```
api/
├── api/
│   └── index.ts          # Vercel serverless entry point
├── src/
│   ├── app.ts            # Hono app configuration
│   ├── index.ts          # Local dev server
│   ├── routes/
│   │   ├── tokens.ts
│   │   ├── pairs.ts
│   │   └── analytics.ts
│   ├── lib/
│   │   ├── cache.ts
│   │   ├── constants.ts
│   │   └── viem.ts
│   └── types/
│       └── index.ts
├── vercel.json
├── package.json
└── tsconfig.json
```
