import Blog from "@/components/Blog/Blog";
import "./page.css";
import { db } from "@/lib/db";

export default async function Blogs() {
  const blogs = await db.blog.findMany();
  return (
    <div className="blogs-page">
      <div className="blog-list">
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
