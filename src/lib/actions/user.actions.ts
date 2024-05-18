"use server";
import { auth, unstable_update } from "@/auth";

import { signIn } from "@/auth";
import { db } from "../db";
import fs from "fs/promises"
import { redirect } from "next/navigation";

export const signUp = async (state: any, formData: FormData) => {
  const { username, password, confirmPassword } = Object.fromEntries(
    formData
  ) as { username: string; password: string; confirmPassword: string };

  if (username === "" || password === "" || confirmPassword === "") return { error: "All fields required", success: false }
  if (password !== confirmPassword) return { error: "Passwords do not match", success: false }

  const user = await db.user.findUnique({ where: { username }})

  if (user) return { error: "Username taken", success: false }

  await db.user.create({
    data: { username, password }
  })

  return { success: true }
};

export const login = async (state: any, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData) as { username: string, password: string }

  if (!username || !password) return { error: "All fields required" }

  const user = await db.user.findUnique({ where: { username }})

  if (!user) return { error: "User not found" }

  if (user.password !== password) return { error: "Invalid credentials" }
  
  await signIn("credentials", { username, password, redirect: true, redirectTo: "/app/blogs" })
}

export const updateUser = async (state: any, formData: FormData) => {
  const { username, password, image } = Object.fromEntries(formData) as { username: string, password: string, image: File}

  const user = await getUser()

  let imagePath = user?.image || null
  if (image.size > 0) {
    if (user?.image !== null) {
      await fs.unlink(`pubic${user?.image}`)
    }
    await fs.mkdir("public/uploads", { recursive: true })
    imagePath = `/uploads/${crypto.randomUUID()}_${image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()))
  }

  const newUser = await db.user.update({ where: { username: user?.name as string }, data: { username, password, image: imagePath }})

  const session = await getSession()

  await unstable_update({
    ...session,
    user: {
      ...session?.user,
      name: newUser.username,
      image: newUser.image,
      id: newUser.id
    }
  })

  redirect("/app/blogs")
}

export const getSession = async () => {
  return await auth()
}

export const getUser = async () => {
  const session = await auth()
  return session?.user
}