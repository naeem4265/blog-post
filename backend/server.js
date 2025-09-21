import express from "express";
import { Pool } from "pg";
import postsRouterFactory from "./routes/posts.js";
import pkg from "./package.json" assert { type: "json" };
import cors from "cors";

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const {
  PORT = 5000,
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_NAME = "blog",
  DB_USER = "bloguser",
  DB_PASSWORD = "supersecret"
} = process.env;

const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
}

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "up", ts: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || "db error" });
  }
});

// Version endpoint
app.get("/api/version", (_req, res) => {
  const version = process.env.RELEASE_VERSION || `v${pkg.version}` || "unknown";
  res.json({ version });
});

// API routes
app.use("/api/posts", postsRouterFactory(pool));

// Export the app for testing
export { app };

// Only start the server if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    await init();
    console.log(`Backend listening on ${PORT}`);
  });
}