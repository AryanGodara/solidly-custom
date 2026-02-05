import { Hono } from "hono";
import { Address } from "viem";
import { publicClient } from "../lib/viem.js";
import { PAIR_FACTORY, PAIR_FACTORY_ABI, PAIR_ABI, CACHE_TTL } from "../lib/constants.js";
import * as cache from "../lib/cache.js";
import type { Pair } from "../types/index.js";

const app = new Hono();

// GET /api/pairs - List all pairs
app.get("/", async (c) => {
  const cacheKey = "pairs:all";
  const cached = cache.get<Pair[]>(cacheKey);
  if (cached) {
    return c.json({ success: true, data: cached, cached: true, count: cached.length });
  }

  try {
    // Check if factory is deployed
    if (PAIR_FACTORY === "0x0000000000000000000000000000000000000000") {
      return c.json({
        success: true,
        data: [],
        count: 0,
        message: "Factory not deployed yet",
      });
    }

    const allPairsLength = await publicClient.readContract({
      address: PAIR_FACTORY,
      abi: PAIR_FACTORY_ABI,
      functionName: "allPairsLength",
    });

    // Batch fetch pair addresses
    const pairAddresses: Address[] = [];
    for (let i = 0; i < Number(allPairsLength); i++) {
      const pairAddress = await publicClient.readContract({
        address: PAIR_FACTORY,
        abi: PAIR_FACTORY_ABI,
        functionName: "allPairs",
        args: [BigInt(i)],
      });
      pairAddresses.push(pairAddress);
    }

    // Fetch pair details (simplified - in production use multicall)
    const pairs: Pair[] = await Promise.all(
      pairAddresses.map(async (address) => {
        const [token0, token1, stable, reserves, totalSupply] = await Promise.all([
          publicClient.readContract({ address, abi: PAIR_ABI, functionName: "token0" }),
          publicClient.readContract({ address, abi: PAIR_ABI, functionName: "token1" }),
          publicClient.readContract({ address, abi: PAIR_ABI, functionName: "stable" }),
          publicClient.readContract({ address, abi: PAIR_ABI, functionName: "getReserves" }),
          publicClient.readContract({ address, abi: PAIR_ABI, functionName: "totalSupply" }),
        ]);

        return {
          address,
          token0,
          token1,
          stable,
          reserve0: reserves[0].toString(),
          reserve1: reserves[1].toString(),
          totalSupply: totalSupply.toString(),
        };
      })
    );

    cache.set(cacheKey, pairs, CACHE_TTL.PAIRS);
    return c.json({ success: true, data: pairs, count: pairs.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ success: false, error: message }, 500);
  }
});

// GET /api/pairs/:address - Get specific pair
app.get("/:address", async (c) => {
  const address = c.req.param("address") as Address;
  const cacheKey = `pairs:${address}`;
  const cached = cache.get<Pair>(cacheKey);
  if (cached) {
    return c.json({ success: true, data: cached, cached: true });
  }

  try {
    const [token0, token1, stable, reserves, totalSupply] = await Promise.all([
      publicClient.readContract({ address, abi: PAIR_ABI, functionName: "token0" }),
      publicClient.readContract({ address, abi: PAIR_ABI, functionName: "token1" }),
      publicClient.readContract({ address, abi: PAIR_ABI, functionName: "stable" }),
      publicClient.readContract({ address, abi: PAIR_ABI, functionName: "getReserves" }),
      publicClient.readContract({ address, abi: PAIR_ABI, functionName: "totalSupply" }),
    ]);

    const pair: Pair = {
      address,
      token0,
      token1,
      stable,
      reserve0: reserves[0].toString(),
      reserve1: reserves[1].toString(),
      totalSupply: totalSupply.toString(),
    };

    cache.set(cacheKey, pair, CACHE_TTL.PAIRS);
    return c.json({ success: true, data: pair });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ success: false, error: message }, 500);
  }
});

export { app as pairsRoutes };
