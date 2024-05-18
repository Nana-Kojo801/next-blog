"use client"
import "./page.css";
import { useFormState, useFormStatus } from "react-dom";
import { createBlog } from "@/lib/actions/blog.actions";

const PublishButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="primary-btn" disabled={pending}>
      {pending ? "Creating..." : "Publish"}
    </button>
  );
};

const CreateBlog = () => {
  const [state, formAction] = useFormState(createBlog, {})
  return (
    <div className="createblog-page">
      <form action={formAction}>
        <PublishButton />
        <input name="title" type="text" placeholder="Enter title" />
        <input type="file" name="image" />
        <textarea name="content" placeholder="Content..."></textarea>
      </form>
    </div>
  );
};

export default CreateBlog;
