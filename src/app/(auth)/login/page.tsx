/* eslint-disable react/no-unescaped-entities */
"use client";
import { login } from "@/lib/actions/user.actions";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaLock, FaUser } from "react-icons/fa";

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="primary-btn" disabled={pending}>
      {pending ? "Loading..." : "Login"}
    </button>
  );
};

const Login = () => {
  const [state, formAction] = useFormState(login, { error: "" });

  return (
    <div className="auth_container">
      <h1>Login</h1>
      {state?.error && <p className="error">{state?.error}</p>}
      <form action={formAction}>
        <div className="field">
          <input name="username" type="text" placeholder="Username" />
          <FaUser />
        </div>
        <div className="field">
          <input name="password" type="password" placeholder="Password" />
          <FaLock />
        </div>
        <LoginButton />
      </form>
      <p className="bottom-area">
        Dont't have an account? <Link href="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
