import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";

export default function App() {
  return (
    <HashRouter>
      <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "system-ui" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}><Link to="/">Mini Blog</Link></h1>
          <Link to="/new">New Post</Link>
        </header>
        <hr />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/new" element={<PostForm />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
