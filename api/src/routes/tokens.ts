import { Hono } from "hono";
import { WMON, USDC, USDT, WETH, WBTC, CACHE_TTL } from "../lib/constants.js";
import * as cache from "../lib/cache.js";
import type { Token } from "../types/index.js";

const app = new Hono();

// Default token list
const DEFAULT_TOKENS: Token[] = [
  { address: WMON, symbol: "WMON", name: "Wrapped MON", decimals: 18 },
  { address: USDC, symbol: "USDC", name: "USD Coin", decimals: 6 },
  { address: USDT, symbol: "USDT", name: "Tether USD", decimals: 6 },
  { address: WETH, symbol: "WETH", name: "Wrapped Ether", decimals: 18 },
  { address: WBTC, symbol: "WBTC", name: "Wrapped Bitcoin", decimals: 8 },
];

// GET /api/tokens - List all tokens
app.get("/", (c) => {
  const cacheKey = "tokens:all";
  const cached = cache.get<Token[]>(cacheKey);
  if (cached) {
    return c.json({ success: true, data: cached, cached: true });
  }

  // In production, fetch from database or indexer
  cache.set(cacheKey, DEFAULT_TOKENS, CACHE_TTL.TOKENS);
  return c.json({ success: true, data: DEFAULT_TOKENS });
});

// GET /api/tokens/:address - Get specific token
app.get("/:address", (c) => {
  const address = c.req.param("address").toLowerCase();
  const token = DEFAULT_TOKENS.find((t) => t.address.toLowerCase() === address);

  if (!token) {
    return c.json({ success: false, error: "Token not found" }, 404);
  }

  return c.json({ success: true, data: token });
});

export { app as tokensRoutes };
