"use client"
import { FormEvent, FormEventHandler, useEffect, useState } from "react"
import "./page.css"
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { Blog } from "@prisma/client"
import { getBlog, updateBlog } from "@/lib/actions/blog.actions"
import { useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

const EditButton = () => {
  const {pending} = useFormStatus()

  return <button className="primary-btn" disabled={pending}>{pending ? "Editing..." : "Edit"}</button>
}

const EditBlog = ({ params }: { params: Params }) => {
  const [state, formAction] = useFormState(updateBlog.bind(null, params.id), {})

  const [blog, setBlog] = useState<Blog | null>(null)

  useEffect(() => {
    getBlog(params.id).then(data => setBlog(data))
  }, [params.id])

  return (
    <div className='editblog-page'>
        <form action={formAction}>
            <EditButton />
            <input defaultValue={blog?.title} name="title" type="text" placeholder='Enter title' />
            <input type="file" name="image" />
            <textarea defaultValue={blog?.content} name="content" placeholder='Content...'></textarea>
        </form>
    </div>
  )
}

export default EditBlog