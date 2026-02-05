import { handle } from "hono/vercel";
import app from "../src/app.js";

// Export for Vercel serverless functions
export default handle(app);
