import { Hono } from "hono";
import type { ProtocolStats } from "../types/index.js";

const app = new Hono();

// GET /api/analytics - Protocol stats
app.get("/", (c) => {
  // In production, these would be calculated from indexed data
  const stats: ProtocolStats = {
    tvl: "0",
    volume24h: "0",
    fees24h: "0",
    totalVeNFTs: 0,
  };

  return c.json({ success: true, data: stats });
});

// GET /api/analytics/tvl
app.get("/tvl", (c) => {
  return c.json({
    success: true,
    data: {
      tvl: "0",
      change24h: "0",
    },
  });
});

// GET /api/analytics/volume
app.get("/volume", (c) => {
  return c.json({
    success: true,
    data: {
      volume24h: "0",
      change24h: "0",
    },
  });
});

// GET /api/analytics/top-pools
app.get("/top-pools", (c) => {
  return c.json({
    success: true,
    data: [],
  });
});

export { app as analyticsRoutes };
