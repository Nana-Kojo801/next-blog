"use server";
import fs from "fs/promises";
import { db } from "../db";
import { getUser } from "./user.actions";
import { redirect } from "next/navigation";

export const createBlog = async (state: any, formData: FormData) => {
  console.log("creating blog");

  const { title, content, image } = Object.fromEntries(formData) as {
    title: string;
    content: string;
    image: File;
  };

  if (!title || !content) return;

  await fs.mkdir("public/uploads", { recursive: true });
  const imagePath = `/uploads/${crypto.randomUUID()}_${image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await image.arrayBuffer())
  );

  const currentUser = await getUser();
  
  await db.blog.create({
    data: {
      title,
      content,
      image: imagePath,
      user: { connect: { username: currentUser?.name as string } },
    },
  });

  return redirect("/app/blogs");
};

export const getBlog = async (id: string) => {
  const blog = await db.blog.findUnique({ where: { id }})
  return blog
}

export const updateBlog = async (id: string, state:any, formData: FormData) => {
  const { title, content, image } = Object.fromEntries(formData) as { title: string, content: string, image: File}

  const blog = await db.blog.findUnique({ where: { id }})

  let imagePath = blog?.image
  if (image.size > 0 ) {
    await fs.unlink(`public${blog?.image}`)
    imagePath = `/uploads/${crypto.randomUUID()}_${image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()))
  }

  await db.blog.update({ where: { id }, data: { title, content, image: imagePath }})
  
  redirect(`/app/blogs/${id}`)
}

export const deleteBlog = async (id: string) => {
  await db.blog.delete({ where: { id} })
  redirect("/app/blogs")
}