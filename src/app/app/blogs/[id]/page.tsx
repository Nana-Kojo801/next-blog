import "./page.css";
import Image from "next/image";
import { FaTrash, FaBook } from "react-icons/fa";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { db } from "@/lib/db";
import Blog from "./_components/Blog";

const Page = async ({ params }: { params: Params }) => {
  
  const blog = await db.blog.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  return (
    <div className="blog-page">
      <Blog blog={blog} />
    </div>
  );
};

export default Page;
