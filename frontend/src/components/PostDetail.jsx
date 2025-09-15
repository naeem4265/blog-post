import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../services/api";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    getPost(id).then(setPost).catch(e => setErr(e.message));
  }, [id]);

  if (err) return <p style={{ color: "crimson" }}>{err}</p>;
  if (!post) return <p>Loading…</p>;

  return (
    <article>
      <h2>{post.title}</h2>
      <small>{new Date(post.created_at).toLocaleString()}</small>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.body}</p>
      <p><Link to="/">← Back</Link></p>
    </article>
  );
}
