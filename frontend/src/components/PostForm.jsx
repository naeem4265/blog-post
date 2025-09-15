import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";

export default function PostForm() {
  const [form, setForm] = useState({ title: "", body: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (!form.title || !form.body) {
      setErr("Title and body are required");
      return;
    }
    setBusy(true);
    try {
      const p = await createPost(form);
      nav(`/posts/${p.id}`);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "0.5rem" }}>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        rows={6}
        placeholder="Body"
        value={form.body}
        onChange={e => setForm({ ...form, body: e.target.value })}
      />
      <button disabled={busy} type="submit">{busy ? "Publishing…" : "Publish"}</button>
    </form>
  );
}
