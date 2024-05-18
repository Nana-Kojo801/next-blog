"use client"

import { signUp } from '@/lib/actions/user.actions'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { FaLock, FaUser } from "react-icons/fa"
import { useRouter } from 'next/navigation'

const SignupButton = () => {
  const {pending} = useFormStatus()

  return (
    <button className='primary-btn' disabled={pending}>{pending ? "Loading..." : "Sign up"}</button>
  )
}

const Signup = () => {
  const router = useRouter()
  const [state, formAction] = useFormState(signUp, { error: "", success: false })

  useEffect(() => {
    if (state.success === true) router.push("/login")
  }, [state.success, router])

  return (
    <div className='auth_container'>
        <h1>Sign up</h1>
        {state?.error && <p className="error">{state?.error}</p>}
        <form action={formAction}>
          <div className="field">
            <input name="username" type="text" placeholder='Username' />
            <FaUser />
          </div>
          <div className="field">
            <input name="password" type="password" placeholder='Password' />
            <FaLock />
          </div>
          <div className="field">
            <input name="confirmPassword" type="password" placeholder='Confirm password' />
            <FaLock />
          </div>
          <SignupButton />
        </form>
        <p className="bottom-area">Already have an account? <Link href="/login">Login</Link></p>
    </div>
  )
}

export default Signup