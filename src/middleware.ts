import { auth } from "@/auth"
import { NextResponse } from "next/server"
 
export default auth((req) => {
  const reqUrl = new URL(req.url)

  if (!req.auth && reqUrl?.pathname.includes("app")) {
    return NextResponse.redirect("login")
  }
})