/* eslint-disable react/jsx-no-undef */
"use client";

import { type User, type Blog } from "@prisma/client";
import React from "react";
import { FaTrash, FaBook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteBlog } from "@/lib/actions/blog.actions";

const Blog = ({ blog }: { blog: any }) => {
  const router = useRouter();
  return (
    <div className="blog">
      <div className="header">
        <p className="title">{blog?.title}</p>
        <p className="author">by {blog?.user.username}</p>
      </div>
      <div className="btn-area">
        <button
          onClick={() => router.push(`/app/blogs/${blog.id}/edit`)}
          className="primary-btn edit"
        >
          <FaBook />
          Edit
        </button>
        <button onClick={ async () => {
            await deleteBlog(blog.id)
        }} className="primary-btn delete">
          <FaTrash />
          Delete
        </button>
      </div>
      <div className="image-area">
        <Image alt="blog image" src={blog.image} fill />
      </div>
      <div className="content">
        <p>{blog?.content}</p>
      </div>
    </div>
  );
};

export default Blog;
