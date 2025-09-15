import { Router } from "express";

export default function postsRouterFactory(pool) {
  const router = Router();

  // GET /api/posts - List all posts
  router.get("/", async (_req, res) => {
    const { rows } = await pool.query(
      "SELECT id, title, body, created_at FROM posts ORDER BY created_at DESC"
    );
    res.json(rows);
  });

  // GET /api/posts/:id - Get single post
  router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "invalid id" });

    const { rows } = await pool.query(
      "SELECT id, title, body, created_at FROM posts WHERE id = $1",
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "not found" });
    res.json(rows[0]);
  });

  // POST /api/posts - Create new post
  router.post("/", async (req, res) => {
    const { title, body } = req.body || {};
    if (!title || !body) return res.status(400).json({ error: "title and body are required" });

    const { rows } = await pool.query(
      "INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING id, title, body, created_at",
      [title, body]
    );
    res.status(201).json(rows[0]);
  });

  return router;
}
