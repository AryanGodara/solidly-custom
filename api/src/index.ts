import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { tokensRoutes } from "./routes/tokens.js";
import { pairsRoutes } from "./routes/pairs.js";
import { analyticsRoutes } from "./routes/analytics.js";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://yourdex.com"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Health check
app.get("/health", (c) => c.json({ status: "ok", timestamp: Date.now() }));

// Routes
app.route("/api/tokens", tokensRoutes);
app.route("/api/pairs", pairsRoutes);
app.route("/api/analytics", analyticsRoutes);

// 404 handler
app.notFound((c) => c.json({ success: false, error: "Not found" }, 404));

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ success: false, error: err.message }, 500);
});

// Start server
const port = Number(process.env.PORT) || 8787;
console.log(`🚀 Server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof app;
