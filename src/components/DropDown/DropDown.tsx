"use client"

import React, { useEffect, useRef } from 'react'
import Link from "next/link"
import { FaPlusCircle, FaUser } from "react-icons/fa"
import "./DropDown.css"

const DropDown = ({ handleClose }: { handleClose: () => void }) => {
  const dropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle: EventListener = (e: Event) => {
      if (!dropDownRef.current?.contains((e.target as (Node | null)))) handleClose()
    }

    document.addEventListener("mousedown", handle)

    return () => {
      document.removeEventListener("mousedown", handle)
    }
  }, [])

  return (
    <div ref={dropDownRef} className='drop-down'>
        <Link onClick={handleClose} href="/app/createBlog"><FaPlusCircle /> Create blog</Link>
        <Link onClick={handleClose} href="/app/profile"><FaUser /> Profile</Link>
        <Link onClick={handleClose} href="/logout">Logout</Link>
    </div>
  )
}

export default DropDown