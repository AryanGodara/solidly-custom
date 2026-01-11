# Solidly DEX - API

Hono API server for the Solidly DEX on Monad.

## Endpoints

- `GET /api/tokens` - List all tokens
- `GET /api/tokens/:address` - Get token details
- `GET /api/pairs` - List all pairs
- `GET /api/pairs/:address` - Get pair details
- `GET /api/analytics` - Protocol stats

## Tech Stack

- Hono
- Viem
- TypeScript

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```
