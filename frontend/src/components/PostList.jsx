import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";

export default function PostList() {
  const [posts, setPosts] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    getPosts().then(setPosts).catch(e => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "crimson" }}>{err}</p>;
  if (!posts) return <p>Loading…</p>;
  if (posts.length === 0) return <p>No posts yet. Create one!</p>;

  return (
    <div>
      {posts.map(p => (
        <article key={p.id} style={{ padding: "1rem 0", borderBottom: "1px solid #eee" }}>
          <h3 style={{ margin: 0 }}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </h3>
          <small>{new Date(p.created_at).toLocaleString()}</small>
          <p>{p.body.length > 180 ? p.body.slice(0, 180) + "…" : p.body}</p>
        </article>
      ))}
    </div>
  );
}
