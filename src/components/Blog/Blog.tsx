"use client"

import Image from 'next/image'
import "./Blog.css"
import { type Blog } from '@prisma/client'
import { useRouter } from 'next/navigation'

const Blog = ({ blog }: { blog: Blog }) => {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/app/blogs/${blog.id}`)} className='blog'>
        <div className="image-area">
            <Image src={blog.image} alt='text' fill />
        </div>
        <div className="content">
            <p className="header">{blog.title}</p>
            <p className="text">{blog.content}</p>
        </div>
        <p className="date">Nana Kojo {new Date().toLocaleDateString()}</p>
    </div>
  )
}

export default Blog