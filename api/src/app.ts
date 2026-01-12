import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { tokensRoutes } from "./routes/tokens.js";
import { pairsRoutes } from "./routes/pairs.js";
import { analyticsRoutes } from "./routes/analytics.js";

// Create Hono app
const app = new Hono().basePath("/api");

// Middleware
app.use("*", logger());
app.use("*", prettyJSON());

// CORS configuration with environment-based origins
app.use(
  "*",
  cors({
    origin: (origin) => {
      // Default allowed origins
      const defaultOrigins = ["http://localhost:3000", "http://localhost:3001"];
      
      // Parse environment variable for additional origins
      const envOrigins = process.env.CORS_ORIGINS?.split(",").map((o) => o.trim()) || [];
      const allowedOrigins = [...defaultOrigins, ...envOrigins];
      
      // If origin is in allowed list, return it; otherwise return first allowed
      if (!origin || allowedOrigins.includes(origin)) {
        return origin || allowedOrigins[0];
      }
      
      // For Vercel preview deployments (*.vercel.app)
      if (origin.endsWith(".vercel.app")) {
        return origin;
      }
      
      return allowedOrigins[0];
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

// Health check (at /api/health)
app.get("/health", (c) =>
  c.json({
    status: "ok",
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || "development",
  })
);

// Routes
app.route("/tokens", tokensRoutes);
app.route("/pairs", pairsRoutes);
app.route("/analytics", analyticsRoutes);

// Root endpoint (at /api)
app.get("/", (c) =>
  c.json({
    name: "Solidly DEX API",
    version: "1.0.0",
    endpoints: [
      "GET /api/health",
      "GET /api/tokens",
      "GET /api/tokens/:address",
      "GET /api/pairs",
      "GET /api/pairs/:address",
      "GET /api/analytics",
      "GET /api/analytics/tvl",
      "GET /api/analytics/volume",
      "GET /api/analytics/top-pools",
    ],
  })
);

// 404 handler
app.notFound((c) =>
  c.json(
    {
      success: false,
      error: "Not found",
      path: c.req.path,
    },
    404
  )
);

// Error handler
app.onError((err, c) => {
  console.error(`[Error] ${c.req.method} ${c.req.path}:`, err.message);
  return c.json(
    {
      success: false,
      error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
    },
    500
  );
});

export default app;
export type AppType = typeof app;
