import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import Version from "./components/Version";

export default function App() {
  return (
    <HashRouter>
      <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "system-ui" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}><Link to="/">Mini Blog</Link></h1>
          <div>
            <Link to="/new" style={{ marginRight: "1rem" }}>New Post</Link>
            <Link to="/version">Version</Link>
          </div>
        </header>
        <hr />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/new" element={<PostForm />} />
          <Route path="/version" element={<Version />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
