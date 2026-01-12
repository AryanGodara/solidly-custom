import { serve } from "@hono/node-server";
import app from "./app.js";

const port = Number(process.env.PORT) || 8787;

console.log(`
Meridian DEX API
================
Server:  http://localhost:${port}
Health:  http://localhost:${port}/api/health
Docs:    http://localhost:${port}/api
`);

serve({
  fetch: app.fetch,
  port,
});

export type { AppType } from "./app.js";
