"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog { _id: string; title: string; author: string; status: string; createdAt: string; }

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs").then(r => r.json()).then(d => setBlogs(Array.isArray(d) ? d : []));
  }, []);

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
    setBlogs(blogs.filter(b => b._id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, color: "#1a1a2e" }}>Blog Posts</h1>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>Create and manage blog posts</p>
        </div>
        <Link href="/admin/blogs/new" style={{ padding: "10px 20px", background: "#6c5ce7", color: "#fff", borderRadius: 6, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          + New Post
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e8e8e8", overflow: "hidden" }}>
        {blogs.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
            <p>No blog posts yet. Click &quot;+ New Post&quot; to create one.</p>
          </div>
        ) : (
          blogs.map((blog, idx) => (
            <div key={blog._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: idx < blogs.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>{blog.title}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>By {blog.author} | {blog.status || "draft"}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Link href={`/admin/blogs/edit/${blog._id}`} style={{ padding: "6px 14px", background: "#6c5ce7", color: "#fff", borderRadius: 6, textDecoration: "none", fontSize: 12 }}>Edit</Link>
                <button onClick={() => deleteBlog(blog._id)} style={{ padding: "6px 14px", background: "#fde8e8", color: "#e74c3c", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
