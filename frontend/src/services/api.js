const BASE = "/api";

export async function getPosts() {
  const res = await fetch(`${BASE}/posts`);
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`${BASE}/posts/${id}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

export async function createPost(payload) {
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function getVersion() {
  const res = await fetch(`/version`);
  if (!res.ok) throw new Error("Failed to load version");
  return res.json();
}
